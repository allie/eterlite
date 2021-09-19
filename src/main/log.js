import log from 'electron-log';
import chalk from 'chalk';
import { inspect } from 'util';

const moduleColours = {
  main: chalk.bgWhite,
  settings: chalk.bgCyan,
  window: chalk.bgYellow,
  menu: chalk.bgMagenta,
};

const inspectArgs = (...args) =>
  args.map((arg) =>
    typeof arg === 'object' || Array.isArray(arg)
      ? inspect(arg, { depth: Infinity })
      : arg
  );

const formatLog = (level, module, ...rest) => [
  level,
  (moduleColours[module] || chalk.bgWhite).black(`[${module}]`),
  ...inspectArgs(...rest),
];

const moduleLog = {
  error(module, ...args) {
    log.error(...formatLog(chalk.bgRed.black('[error]'), module, ...args));
  },
  warn(module, ...args) {
    log.warn(...formatLog(chalk.bgYellow.black('[warn]'), module, ...args));
  },
  info(module, ...args) {
    log.info(...formatLog(chalk.bgWhite.black('[info]'), module, ...args));
  },
  verbose(module, ...args) {
    log.verbose(...formatLog(chalk.bgBlue.black('[error]'), module, ...args));
  },
  debug(module, ...args) {
    log.debug(...formatLog(chalk.bgGreen.black('[debug]'), module, ...args));
  },
  silly(module, ...args) {
    log.silly(...formatLog(chalk.bgCyan.black('[silly]'), module, ...args));
  },
};

export default moduleLog;
