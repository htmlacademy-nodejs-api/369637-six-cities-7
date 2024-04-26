import { CommandInterface } from './commands/command.interface.js';
import { CommandParser } from './command-parser.js';

type CommandCollection = Record<string, CommandInterface>;

export class CLIApp {
  private commands: CommandCollection = {};

  constructor(private readonly defaultCommand: string = '--help') {}

  public registerCommands(commands: CommandInterface[]) {
    commands.forEach((c) => {
      if (Object.hasOwn(this.commands, c.getName())) {
        throw new Error(`Command ${c} is already registered`);
      }
      this.commands[c.getName()] = c;
    });
  }

  public getDefaultCommand(): CommandInterface {
    if (!this.commands[this.defaultCommand]) {
      throw new Error('Default command is not implemented');
    }
    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string): CommandInterface {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public processCommand(argv: string[]) {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommand[commandName] ?? [];
    command.execute(...commandArgs);
  }
}
