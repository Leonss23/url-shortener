import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const urls = sqliteTable('urls', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  url: text('url', { length: 4096, mode: 'text' }).notNull()
})
