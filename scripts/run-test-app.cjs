const fs = require('node:fs');
const path = require('node:path');
const { Console } = require('node:console');

const [appDirectory, runtimeDirectory] = process.argv.slice(2);
const errorLog = path.join(runtimeDirectory, 'app.err.log');
global.console = new Console({
  stdout: fs.createWriteStream(path.join(runtimeDirectory, 'app.out.log')),
  stderr: fs.createWriteStream(errorLog),
});
process.on('uncaughtExceptionMonitor', (error) => {
  fs.appendFileSync(errorLog, `${error.stack}\n`);
});
process.chdir(appDirectory);
require(path.join(appDirectory, 'src/server.js'));
