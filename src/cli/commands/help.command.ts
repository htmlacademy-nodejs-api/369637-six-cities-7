import chalk from 'chalk';

import { CommandInterface } from './command.interface.js';

export class HelpCommand implements CommandInterface {
  public getName(): string {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(
      chalk.magenta(`
    Программа для подготовки данных для REST API сервера.

    Пример: cli.js --<command> [--arguments]
`) +
        chalk.cyan(`Команды:

--version:                   # выводит номер версии
--help:                      # печатает этот текст
--import <path>:             # импортирует данные из TSV
--generate <n> <path> <url>  # генерирует произвольное количество тестовых данных`)
    );
  }
}
