import fs from "node:fs";

export interface IDB {
  users: { email: string; password: string }[];
  token: string;
  pages: { id?: number | string; title: string; content: string }[];
}
const db: () => IDB = () => JSON.parse(fs.readFileSync("uploads/mockup.json", "utf-8"));

export { db };
