import { styleText } from 'node:util';

export interface Log {
    error: (_: any) => void,
    error_and_exit: (_: any) => void,
    warn: (_: any) => void,
    log: (_: any) => void
}

const APP_NAME = styleText("blue", "CWS")
const ERROR_TEXT = styleText("red", "ERROR")
const WARN_TEXT = styleText("yellow", "WARN")

export const log = {
    error: (message: any) => {
        console.error(`[${APP_NAME}/${ERROR_TEXT}]: ${message}`)
    },
    error_and_exit: (message: any) => {
        console.error(`[${APP_NAME}/${ERROR_TEXT}]: ${message}`)
        process.exit(1)
    },
    warn: (message: any) => {
        console.warn(`[${APP_NAME}/${WARN_TEXT}]: ${message}`)
    },
    log: (message: any) => {
        console.log(`[${APP_NAME}]: ${message}`)
    },
}
