import path from "node:path";
import { log } from "@/log";
import { getValidUnitConfigs, writeFile } from "./core";
import { validateConfig, createNginxConfig, UNIT_CONFIG_FILE_NAME, ROOT_CONFIG_FILE_PATH } from "./config";
// @ts-expect-error
import Formatter from "nginxbeautify";
import { execSync } from "node:child_process";

const NginxPort = {
    _restart_nginx: () => {
        execSync("systemctl reload nginx.service")
    },
    run: (rootPath: string, nginxRootLocationPort: string) => {
        const formatter = new Formatter()
        const validUnitsConfigs = getValidUnitConfigs({ log, rootPath, validateConfig, CONFIG_FILE_NAME: UNIT_CONFIG_FILE_NAME })
        const configContent = formatter.parse(createNginxConfig(validUnitsConfigs, nginxRootLocationPort))

        writeFile({
            log,
            content: configContent,
            path: path.join(ROOT_CONFIG_FILE_PATH)
        })

        log.log(`Nginx server config written to - ${ROOT_CONFIG_FILE_PATH}`)
        NginxPort._restart_nginx()
    }
}

export { NginxPort }

