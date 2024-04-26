export interface CommandInterface {
  getName(): string;
  execute(...params: string[]): void;
}
