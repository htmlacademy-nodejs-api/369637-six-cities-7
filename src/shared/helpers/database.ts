export function getMongoURI(
  userName: string,
  password: string,
  host: string,
  port: number,
  databaseName: string
): string {
  return `mongodb://${userName}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
