import path from "node:path";
import prettier from "@prettier/sync";
import { log } from "@/log";
import { getValidUnitConfigs, writeFile } from "./core";
import { validateConfig, createPM2Config, UNIT_CONFIG_FILE_NAME, ROOT_CONFIG_FILE_NAME } from "./config";
import { execSync } from "node:child_process";

const PM2Port = {
    _reset_pm2: () => {
        execSync(`pm2 jlist | jq -r '.[] | select(.name != "ROOT") | .pm_id' | xargs -n1 pm2 delete`)
    },
    _start_pm2: (filePath: string) => {
        execSync(`
             for app in $(pm2 jlist | jq -r '.[] | select(.pm2_env.status == "stopped") | .name'); do
                pm2 start ${filePath} --only "$app"
             done
        `
        )
    },
    run: (rootPath: string) => {
        const validUnitsConfigs = getValidUnitConfigs({ log, rootPath, validateConfig, CONFIG_FILE_NAME: UNIT_CONFIG_FILE_NAME })
        const configContent = prettier.format(createPM2Config(validUnitsConfigs), { parser: "babel" })

        writeFile({
            log,
            content: configContent,
            path: path.join(rootPath, ROOT_CONFIG_FILE_NAME)
        })

        log.log(`PM2 server config written to - ${path.join(rootPath, ROOT_CONFIG_FILE_NAME)}`)

        PM2Port._reset_pm2()
        PM2Port._start_pm2(path.join(rootPath, ROOT_CONFIG_FILE_NAME))
    }
}

export { PM2Port }

