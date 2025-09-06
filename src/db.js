import pg from "pg";
import { config } from "./config.js";

/**
 * @typedef {import('pg').Pool} Pool
 */

/** @type {Pool} */
export const db = new pg.Pool({
  connectionString: config.databaseUrl,
});

(async () => {
  try {
    const res = await db.query("SELECT NOW()");
    console.log("✅ DB connectée :", res.rows[0]);
  } catch (err) {
    console.error("❌ Erreur de connexion DB :", err);
  }
})();
