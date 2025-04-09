import Validator, { JSONSchemaType } from "ajv"

export const CONFIG_FILE_NAME = "ecosystem.config.js"

export interface UnitConfig {
    name: string;
    script: string;
    env: {
        PORT: number
    }
}


const schema: JSONSchemaType<UnitConfig> = {
    type: "object",
    properties: {
        name: { type: "string" },
        script: { type: "string" },
        env: {
            type: "object",
            properties: {
                PORT: { type: "number" },
            },
            required: ["PORT"],
            additionalProperties: false
        }
    },
    required: ["name", "script", "env"],
    additionalProperties: false
}
const validator = new Validator()
export const validateConfig = validator.compile(schema)

export interface UnitConfigWithCWD extends UnitConfig {
    cwd: string
}

export const getExecutableConfig = (validUnitConfigs: UnitConfigWithCWD[]) => {
    return `module.exports = { apps : ${JSON.stringify(validUnitConfigs)} };`
}
