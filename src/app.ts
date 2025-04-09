import path from "node:path";
import { log } from "./log";
import { validateArgs } from "./args";
import { getValidUnitConfigs, writeFile } from "./fs";
import { validateConfig, getExecutableConfig, CONFIG_FILE_NAME } from "./config";
import { DEFAULT_USAGE } from "./usage.js";
import prettier from "@prettier/sync";

const { unitsRoot } = validateArgs({ log, argv: process.argv, DEFAULT_USAGE });
const validUnitsConfigs = getValidUnitConfigs({ log, unitsRoot, validateConfig, CONFIG_FILE_NAME })
const configContent = prettier.format(getExecutableConfig(validUnitsConfigs), { parser: "babel" })

writeFile({
    content: configContent,
    path: path.join(unitsRoot, CONFIG_FILE_NAME)
})

log.log(`Server config written to - ${path.join(unitsRoot, CONFIG_FILE_NAME)}`)

