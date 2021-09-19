import log from 'electron-log';
import chalk from 'chalk';

const moduleColours = {
  settings: chalk.bgMagenta,
  window: chalk.bgCyan,
};

const formatLog = (level, module, ...args) => [
  level,
  (moduleColours[module] || chalk.bgWhite).black(`[${module}]`),
  ...args,
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
