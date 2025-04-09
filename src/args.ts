import path from "node:path"
import { Command, Option } from "@commander-js/extra-typings"
import { Log } from "@/log"

const daemonOptions = ["pm2", "test"] as const
const serverOptions = ["nginx"] as const

export const getOptions = (log: Log) => {
    const program = new Command()
        .name('node dist/app.js')
        .description('CWS : Caldwell Web Services\nCLI to automate server setup.')
        .version('0.0.1')
        .addOption(
            new Option(
                '-R,--root-path <PATH>',
                'path to the directory containing projects.'
            )
                .argParser((rootDir) => path.resolve(rootDir))
                .makeOptionMandatory()
        )
        .addOption(
            new Option(
                '-D,--daemon-manager [DAEMON_TYPE]',
                'daemon to create the configs for.'
            )
                .default('pm2')
                .choices(daemonOptions)
        )
        .addOption(
            new Option(
                '-S,--server-type [SERVER_TYPE]',
                'server to create the configs for.'
            )
                .default('nginx')
                .choices(serverOptions)
        )
        .configureOutput({
            writeErr: (message) => log.error(message),
        })

    program.parse()

    return program.opts()
}
