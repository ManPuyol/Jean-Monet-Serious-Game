import { pgTable, serial, boolean, timestamp, varchar } from "drizzle-orm/pg-core";

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  description: varchar('description', { length: 256 }),
  active: boolean('active').default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export type SelectSubject = typeof subjects.$inferSelect;
export type InsertSubject = typeof subjects.$inferInsert;