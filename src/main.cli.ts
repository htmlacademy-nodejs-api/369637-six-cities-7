#!/Users/sveta/.nvm/versions/node/v20.12.0/bin/node
import {
  CLIApp,
  VersionCommand,
  HelpCommand,
  ImportCommand,
  GenerateCommand,
} from './cli/index.js';

import 'reflect-metadata';

function bootstrap() {
  const cliApp = new CLIApp();

  cliApp.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();
