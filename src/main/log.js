import log from 'electron-log';
import chalk from 'chalk';
import isDev from 'electron-is-dev';
import { inspect } from 'util';

const scopes = {
  main: log.scope('main'),
  renderer: log.scope('render'),
};

// TODO: Drop this down a level and add a silly flag
const logLevel = isDev ? log.levels.silly : log.levels.debug;
log.transports.file.level = logLevel;
log.transports.console.level = logLevel;
log.transports.file.maxSize = 2097152;

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

const formatLog = (level, module, ...args) => [
  level,
  (moduleColours[module] || chalk.bgWhite).black(`[${module}]`),
  ...inspectArgs(...args),
];

const mainThreadLog = {
  error(module, ...args) {
    scopes.main.error(
      ...formatLog(chalk.bgRed.black('[error]'), module, ...args)
    );
  },
  warn(module, ...args) {
    scopes.main.warn(
      ...formatLog(chalk.bgYellow.black('[warn]'), module, ...args)
    );
  },
  info(module, ...args) {
    scopes.main.info(
      ...formatLog(chalk.bgWhite.black('[info]'), module, ...args)
    );
  },
  verbose(module, ...args) {
    scopes.main.verbose(
      ...formatLog(chalk.bgBlue.black('[error]'), module, ...args)
    );
  },
  debug(module, ...args) {
    scopes.main.debug(
      ...formatLog(chalk.bgGreen.black('[debug]'), module, ...args)
    );
  },
  silly(module, ...args) {
    scopes.main.silly(
      ...formatLog(chalk.bgCyan.black('[silly]'), module, ...args)
    );
  },
};

const renderThreadLog = {
  error(module, ...args) {
    scopes.renderer.error(
      ...formatLog(chalk.bgRed.black('[error]'), module, ...args)
    );
  },
  warn(module, ...args) {
    scopes.renderer.warn(
      ...formatLog(chalk.bgYellow.black('[warn]'), module, ...args)
    );
  },
  info(module, ...args) {
    scopes.renderer.info(
      ...formatLog(chalk.bgWhite.black('[info]'), module, ...args)
    );
  },
  verbose(module, ...args) {
    scopes.renderer.verbose(
      ...formatLog(chalk.bgBlue.black('[error]'), module, ...args)
    );
  },
  debug(module, ...args) {
    scopes.renderer.debug(
      ...formatLog(chalk.bgGreen.black('[debug]'), module, ...args)
    );
  },
  silly(module, ...args) {
    scopes.renderer.silly(
      ...formatLog(chalk.bgCyan.black('[silly]'), module, ...args)
    );
  },
};

export default mainThreadLog;
export { renderThreadLog };
