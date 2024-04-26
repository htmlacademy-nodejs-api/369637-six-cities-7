#!/Users/sveta/.nvm/versions/node/v20.12.0/bin/node
import {
  CLIApp,
  VersionCommand,
  HelpCommand,
  ImportCommand,
} from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApp();

  cliApp.registerCommands([
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand(),
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();
