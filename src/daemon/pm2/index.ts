import path from "node:path";
import prettier from "@prettier/sync";
import { log } from "@/log";
import { getValidUnitConfigs, writeFile } from "./core";
import { validateConfig, createPM2Config, UNIT_CONFIG_FILE_NAME, ROOT_CONFIG_FILE_NAME } from "./config";

const PM2Port = {
    run: (rootPath: string) => {
        const validUnitsConfigs = getValidUnitConfigs({ log, rootPath, validateConfig, CONFIG_FILE_NAME: UNIT_CONFIG_FILE_NAME })
        const configContent = prettier.format(createPM2Config(validUnitsConfigs), { parser: "babel" })

        writeFile({
            content: configContent,
            path: path.join(rootPath, UNIT_CONFIG_FILE_NAME)
        })

        log.log(`PM2 server config written to - ${path.join(rootPath, ROOT_CONFIG_FILE_NAME)}`)
    }
}

export { PM2Port }

