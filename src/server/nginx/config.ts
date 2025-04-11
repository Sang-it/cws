import Validator, { JSONSchemaType } from "ajv"

export const UNIT_CONFIG_FILE_NAME = "ecosystem.config.js"
export const ROOT_CONFIG_FILE_PATH = "/etc/nginx/nginx.conf"

export interface UnitConfig {
    name: string;
    env: {
        PORT: number
    }
}

const schema: JSONSchemaType<UnitConfig> = {
    type: "object",
    properties: {
        name: { type: "string" },
        env: {
            type: "object",
            properties: {
                PORT: { type: "number" },
            },
            required: ["PORT"],
            additionalProperties: true
        }
    },
    required: ["name", "env"],
    additionalProperties: true
}
const validator = new Validator()
export const validateConfig = validator.compile(schema)

const createConfigLine = (config: UnitConfig) => {
    return `
        location /${config.name}/ {
            proxy_pass http://localhost:${config.env.PORT}/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location = /${config.name} {
            return 301 /${config.name}/;
        }
    `
}

export const createNginxConfig = (validUnitConfigs: UnitConfig[], nginxRootLocationPort: string) => {
    return `
        user nginx;
        worker_processes auto;
        error_log /var/log/nginx/error.log;
        pid /run/nginx.pid;

        include /usr/share/nginx/modules/*.conf;

        events {
            worker_connections 1024;
        }

        http {
            log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                              '$status $body_bytes_sent "$http_referer" '
                              '"$http_user_agent" "$http_x_forwarded_for"';

            access_log  /var/log/nginx/access.log  main;

            sendfile            on;
            tcp_nopush          on;
            tcp_nodelay         on;
            keepalive_timeout   65;
            types_hash_max_size 2048;

            include             /etc/nginx/mime.types;
            default_type        application/octet-stream;

            include /etc/nginx/conf.d/*.conf;

            server {
                listen       80 default_server;
                listen       [::]:80 default_server;
                server_name  www.cstem.us;
                root         /usr/share/nginx/html;

                include /etc/nginx/default.d/*.conf;

                location / {
                    proxy_pass http://localhost:${nginxRootLocationPort}/;
                    proxy_set_header Host $host;
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                }

                ${validUnitConfigs.map(config => createConfigLine(config)).join("")}

                error_page 404 /404.html;
                    location = /40x.html {
                }

                error_page 500 502 503 504 /50x.html;
                    location = /50x.html {
                }
            }
        }
`
}
