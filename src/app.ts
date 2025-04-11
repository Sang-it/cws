import 'module-alias/register';

import { log } from "./log"
import { getOptions } from "./args";
import { PM2Port } from './daemon/pm2';
import { NginxPort } from './server/nginx';

const { rootPath, daemonManager, serverType, nginxRootLocationPort } = getOptions(log)

switch (daemonManager) {
    case "pm2": {
        PM2Port.run(rootPath)
        break;
    }
}

switch (serverType) {
    case "nginx": {
        NginxPort.run(rootPath, nginxRootLocationPort)
        break;
    }
}
