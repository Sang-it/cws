import path from "node:path";
import { log } from "@/log";
import { getValidUnitConfigs, writeFile } from "./core";
import { validateConfig, createNginxConfig, UNIT_CONFIG_FILE_NAME, ROOT_CONFIG_FILE_NAME } from "./config";
// @ts-expect-error
import Formatter from "nginxbeautify";

const NginxPort = {
    run: (rootPath: string) => {
        const formatter = new Formatter()
        const validUnitsConfigs = getValidUnitConfigs({ log, rootPath, validateConfig, CONFIG_FILE_NAME: UNIT_CONFIG_FILE_NAME })
        const configContent = formatter.parse(createNginxConfig(validUnitsConfigs))

        writeFile({
            content: configContent,
            path: path.join(rootPath, ROOT_CONFIG_FILE_NAME)
        })

        log.log(`Nginx server config written to - ${path.join(rootPath, ROOT_CONFIG_FILE_NAME)}`)
    }
}

export { NginxPort }

