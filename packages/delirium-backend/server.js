import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { getDb } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
if (!ADMIN_API_KEY) throw new Error("Missing required environment variable: ADMIN_API_KEY");

function requireAdminKey(req, res, next) {
  if (req.headers["x-admin-key"] !== ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// ─── Public: Menu ─────────────────────────────────────────────────────────────

app.get("/api/menu", (req, res) => {
  const db = getDb();
  const items = db
    .prepare("SELECT * FROM menu_items WHERE is_active = 1 ORDER BY display_order ASC")
    .all();
  res.json(items);
});

// ─── Public: Content ──────────────────────────────────────────────────────────

app.get("/api/content/:section", (req, res) => {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM content WHERE section = ?")
    .get(req.params.section);

  if (!row) return res.status(404).json({ error: "Not found" });

  res.json({ en: JSON.parse(row.data_en), sr: JSON.parse(row.data_sr) });
});

// ─── Admin: Menu ──────────────────────────────────────────────────────────────

app.get("/api/admin/menu", requireAdminKey, (req, res) => {
  const db = getDb();
  const items = db
    .prepare("SELECT * FROM menu_items ORDER BY display_order ASC")
    .all();
  res.json(items);
});

app.post("/api/admin/menu", requireAdminKey, (req, res) => {
  const { title, title_sr, courses, courses_sr, description, description_sr, price, tag, tag_sr, display_order, is_active } = req.body;

  if (!title || !title_sr || !courses || !courses_sr || !description || !description_sr || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = getDb();
  const result = db
    .prepare(`INSERT INTO menu_items (title, title_sr, courses, courses_sr, description, description_sr, price, tag, tag_sr, display_order, is_active)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(title, title_sr, courses, courses_sr, description, description_sr, price, tag || null, tag_sr || null, display_order ?? 0, is_active ? 1 : 0);

  const item = db.prepare("SELECT * FROM menu_items WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(item);
});

app.put("/api/admin/menu/:id", requireAdminKey, (req, res) => {
  const { title, title_sr, courses, courses_sr, description, description_sr, price, tag, tag_sr, display_order, is_active } = req.body;

  if (!title || !title_sr || !courses || !courses_sr || !description || !description_sr || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = getDb();
  db.prepare(`UPDATE menu_items SET title=?, title_sr=?, courses=?, courses_sr=?, description=?, description_sr=?, price=?, tag=?, tag_sr=?, display_order=?, is_active=? WHERE id=?`)
    .run(title, title_sr, courses, courses_sr, description, description_sr, price, tag || null, tag_sr || null, display_order ?? 0, is_active ? 1 : 0, req.params.id);

  const item = db.prepare("SELECT * FROM menu_items WHERE id = ?").get(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

app.delete("/api/admin/menu/:id", requireAdminKey, (req, res) => {
  getDb().prepare("DELETE FROM menu_items WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

// ─── Admin: Content ───────────────────────────────────────────────────────────

app.get("/api/admin/content/:section", requireAdminKey, (req, res) => {
  const db = getDb();
  const row = db.prepare("SELECT * FROM content WHERE section = ?").get(req.params.section);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json({ section: row.section, data_en: JSON.parse(row.data_en), data_sr: JSON.parse(row.data_sr), updated_at: row.updated_at });
});

app.put("/api/admin/content/:section", requireAdminKey, (req, res) => {
  const { data_en, data_sr } = req.body;
  if (!data_en || !data_sr) return res.status(400).json({ error: "Missing data_en or data_sr" });

  getDb()
    .prepare(`INSERT INTO content (section, data_en, data_sr, updated_at) VALUES (?, ?, ?, datetime('now'))
              ON CONFLICT(section) DO UPDATE SET data_en=excluded.data_en, data_sr=excluded.data_sr, updated_at=excluded.updated_at`)
    .run(req.params.section, JSON.stringify(data_en), JSON.stringify(data_sr));

  res.json({ ok: true });
});

// ─── Start ────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Delirium Silence backend running on http://localhost:${PORT}`);
});
