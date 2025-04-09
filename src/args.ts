import { Log } from "./log"
import path from "node:path"

interface ExecutableConfig {
    unitsRoot: string
}

const extractArgs = (argv: Array<string>): ExecutableConfig => {
    return {
        unitsRoot:
            path.resolve(
                argv[2]
            )
    }
}

interface ValidateArgsParameters {
    log: Log
    argv: Array<string>,
    DEFAULT_USAGE: string,
}

export const validateArgs = (params: ValidateArgsParameters): ExecutableConfig => {
    const { argv, log, DEFAULT_USAGE } = params

    if (argv.length < 3 || argv[2] == "--help") {
        log.log(DEFAULT_USAGE)
        process.exit()
    }

    return extractArgs(argv)
}

