import fs from "node:fs"
import path from "node:path"
import { Log } from "./log"
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
        const config_path = path.join(unitPath, CONFIG_FILE_NAME)
        if (fs.existsSync(config_path)) {
            try {
                const content = require(config_path)
                if (validateConfig(content)) {
                    return content
                }
                log.error(`${config_path} doesn't align with the required schema.`)
                log.error(validateConfig.errors)
            } catch (error) {
                log.error(`${config_path} isn't valid js config file.`)
                log.error(error)
                return
            }
        }
        log.warn(`${CONFIG_FILE_NAME} doesn't exist for unit - ${unitPath}.`)
    }

    return
}

interface GetValidUnitsListParams {
    unitsRoot: string,
    log: Log,
    validateConfig: ValidateFunction<UnitConfig>
    CONFIG_FILE_NAME: string,
}

export const getValidUnitConfigs = (params: GetValidUnitsListParams) => {
    const validUnitConfigs: UnitConfigWithCWD[] = []
    const { unitsRoot, log, validateConfig, CONFIG_FILE_NAME } = params

    for (const _path of getFolderContents(unitsRoot)) {
        const unitPath = path.join(unitsRoot, _path)
        const unitConfig = isValidUnit({ unitPath, validateConfig, log, CONFIG_FILE_NAME })
        if (unitConfig) {
            validUnitConfigs.push({
                cwd: _path,
                ...unitConfig
            })
        }
    }

    return validUnitConfigs
}

interface WriteFileParams {
    content: string,
    path: string
}

export const writeFile = (params: WriteFileParams) => {
    const { content, path } = params

    if (fs.existsSync(path)) {
        fs.rmSync(path)
    }

    fs.writeFileSync(path, content)
}
