import path from "node:path";
import prettier from "@prettier/sync";
import { log } from "@/log";
import { getValidUnitConfigs, writeFile } from "./core";
import { validateConfig, createPM2Config, UNIT_CONFIG_FILE_NAME, ROOT_CONFIG_FILE_NAME } from "./config";
import { execSync } from "node:child_process";

const PM2Port = {
    _reset_pm2: (filePath: string) => {
        execSync(`pm2 del all`)
        execSync(`pm2 start ${filePath}`)
    },
    run: (rootPath: string) => {
        const validUnitsConfigs = getValidUnitConfigs({ log, rootPath, validateConfig, CONFIG_FILE_NAME: UNIT_CONFIG_FILE_NAME })
        const configContent = prettier.format(createPM2Config(validUnitsConfigs), { parser: "babel" })
        const ROOT_FILE_PATH = path.join(rootPath, ROOT_CONFIG_FILE_NAME)

        writeFile({
            log,
            content: configContent,
            path: ROOT_FILE_PATH
        })

        log.log(`PM2 server config written to - ${ROOT_FILE_PATH}`)

        PM2Port._reset_pm2(ROOT_FILE_PATH)
    }
}

export { PM2Port }

