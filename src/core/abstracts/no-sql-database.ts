export interface NoSQLDatabase {
  save(path: string, value: unknown): Promise<void>;
}
