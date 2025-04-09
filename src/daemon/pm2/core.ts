import fs from "node:fs"
import path from "node:path"
import { Log } from "@/log"
import { ValidateFunction } from "ajv"
import { UnitConfig, UnitConfigWithCWD } from "./config"

const getFolderContents = (folder: string) => {
    return fs.readdirSync(folder)
}

interface IsValidUnitParams {
    log: Log,
    unitPath: string,
    validateConfig: ValidateFunction<UnitConfig>,
    CONFIG_FILE_NAME: string,
}

const isValidUnit = (params: IsValidUnitParams) => {
    const { unitPath, log, validateConfig, CONFIG_FILE_NAME } = params

    if (fs.statSync(unitPath).isDirectory()) {
        const configPath = path.join(unitPath, CONFIG_FILE_NAME)
        if (fs.existsSync(configPath)) {
            try {
                const content = require(configPath)
                if (validateConfig(content)) {
                    return content
                }
                log.error(`${configPath} doesn't align with the required schema.`)
                log.error(validateConfig.errors)
                return
            } catch (error) {
                log.error(`${configPath} isn't valid js config file.`)
                log.error(error)
                return
            }
        }
        log.warn(`${CONFIG_FILE_NAME} doesn't exist for unit - ${unitPath}.`)
    }

    return
}

interface GetValidUnitsListParams {
    rootPath: string,
    log: Log,
    validateConfig: ValidateFunction<UnitConfig>
    CONFIG_FILE_NAME: string,
}

export const getValidUnitConfigs = (params: GetValidUnitsListParams) => {
    const validUnitConfigs: UnitConfigWithCWD[] = []
    const { rootPath, log, validateConfig, CONFIG_FILE_NAME } = params

    if (!fs.existsSync(rootPath)) {
        log.error_and_exit(`${rootPath} doesn't exist`)
    }

    for (const _path of getFolderContents(rootPath)) {
        const unitPath = path.join(rootPath, _path)
        const unitConfig = isValidUnit({ unitPath, validateConfig, log, CONFIG_FILE_NAME })
        if (unitConfig) {
            validUnitConfigs.push({
                ...unitConfig,
                cwd: unitPath,
            })
        }
    }

    return validUnitConfigs
}

interface WriteFileParams {
    content: string,
    path: string
    log: Log
}

export const writeFile = (params: WriteFileParams) => {
    const { content, path, log } = params

    try {
        if (fs.existsSync(path)) {
            fs.rmSync(path)
        }

        fs.writeFileSync(path, content)
    } catch (e) {
        log.error_and_exit(e)
    }
}
