"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface MenuItem {
  id: number;
  title: string;
  title_sr: string;
  courses: string;
  courses_sr: string;
  description: string;
  description_sr: string;
  price: string;
  tag: string | null;
  tag_sr: string | null;
  display_order: number;
  is_active: number;
}

const EMPTY_MENU_FORM = {
  title: "",
  title_sr: "",
  courses: "",
  courses_sr: "",
  description: "",
  description_sr: "",
  price: "",
  tag: "",
  tag_sr: "",
  display_order: 0,
  is_active: 1,
};

type FieldDef = {
  key: string;
  label: string;
  multiline?: boolean;
  rows?: number;
};
type ArrayItemDef = FieldDef[];
interface SectionConfig {
  label: string;
  fields: FieldDef[];
  arrayKey?: string;
  arrayLabel?: string;
  arrayItemFields?: ArrayItemDef;
  arrayItemIsString?: boolean;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  cover: {
    label: "Cover",
    fields: [
      { key: "location", label: "Location" },
      { key: "title1", label: "Title Line 1" },
      { key: "title2", label: "Title Line 2" },
      { key: "subtitle", label: "Subtitle" },
      { key: "cta", label: "CTA Button" },
    ],
  },
  nav: {
    label: "Navigation",
    fields: [
      { key: "philosophy", label: "Philosophy" },
      { key: "chef", label: "Chef" },
      { key: "story", label: "Story" },
      { key: "experiences", label: "Experiences" },
      { key: "wine", label: "Wine" },
      { key: "cuisine", label: "Cuisine" },
      { key: "press", label: "Press" },
      { key: "reserve", label: "Reserve CTA" },
    ],
  },
  philosophy: {
    label: "Philosophy",
    fields: [
      { key: "label", label: "Section Label" },
      { key: "headline1", label: "Headline 1" },
      { key: "headline2", label: "Headline 2" },
      { key: "headline3", label: "Headline 3" },
      { key: "body", label: "Body Text", multiline: true, rows: 4 },
    ],
    arrayKey: "pillars",
    arrayLabel: "Pillars",
    arrayItemFields: [
      { key: "label", label: "Label" },
      { key: "text", label: "Text", multiline: true, rows: 2 },
    ],
  },
  chef: {
    label: "Chef",
    fields: [
      { key: "label", label: "Section Label" },
      { key: "headline1", label: "Headline 1" },
      { key: "headline2", label: "Headline 2" },
      { key: "nomination", label: "Nomination Title" },
      { key: "p1", label: "Paragraph 1", multiline: true, rows: 2 },
      { key: "p2", label: "Paragraph 2", multiline: true, rows: 3 },
      { key: "p3", label: "Paragraph 3", multiline: true, rows: 2 },
      { key: "quote", label: "Quote", multiline: true, rows: 2 },
      { key: "nameTag", label: "Name Tag" },
    ],
    arrayKey: "credentials",
    arrayLabel: "Credentials",
    arrayItemFields: [
      { key: "value", label: "Value (e.g. 2026)" },
      { key: "label", label: "Label" },
    ],
  },
  story: {
    label: "Story",
    fields: [
      { key: "label", label: "Section Label" },
      { key: "headline1", label: "Headline 1" },
      { key: "headline2", label: "Headline 2" },
      { key: "p1", label: "Paragraph 1", multiline: true, rows: 3 },
      { key: "p2", label: "Paragraph 2", multiline: true, rows: 3 },
    ],
    arrayKey: "milestones",
    arrayLabel: "Milestones",
    arrayItemFields: [
      { key: "year", label: "Year" },
      { key: "label", label: "Label" },
    ],
  },
  space: {
    label: "Space",
    fields: [
      { key: "label", label: "Section Label" },
      { key: "headline", label: "Headline 1" },
      { key: "headline2", label: "Headline 2" },
      { key: "desc1", label: "Description 1", multiline: true, rows: 3 },
      { key: "desc2", label: "Description 2", multiline: true, rows: 3 },
    ],
    arrayKey: "details",
    arrayLabel: "Details",
    arrayItemFields: [
      { key: "label", label: "Label" },
      { key: "value", label: "Value" },
    ],
  },
  wine: {
    label: "Wine",
    fields: [
      { key: "label", label: "Section Label" },
      { key: "headline", label: "Headline 1" },
      { key: "headline2", label: "Headline 2" },
      { key: "desc", label: "Description", multiline: true, rows: 3 },
      { key: "pairingNote", label: "Pairing Note", multiline: true, rows: 2 },
    ],
    arrayKey: "pillars",
    arrayLabel: "Pillars",
    arrayItemFields: [
      { key: "label", label: "Label" },
      { key: "text", label: "Text", multiline: true, rows: 2 },
    ],
  },
  gallery: {
    label: "Gallery",
    fields: [
      { key: "label", label: "Section Label" },
      { key: "headline", label: "Headline" },
    ],
    arrayKey: "imageAlts",
    arrayLabel: "Image Alt Texts",
    arrayItemIsString: true,
  },
  press: {
    label: "Press",
    fields: [
      { key: "label", label: "Section Label" },
      { key: "headline", label: "Headline 1" },
      { key: "headline2", label: "Headline 2" },
      { key: "vinoLabel", label: "Vino Label" },
      { key: "vinoYear", label: "Vino Year" },
      { key: "vinoMagazine", label: "Vino Magazine" },
      { key: "vinoDesc", label: "Vino Description", multiline: true, rows: 4 },
      { key: "vinoLink", label: "Vino Link Text" },
      { key: "jreLabel", label: "JRE Label" },
      { key: "jreYear", label: "JRE Year" },
      { key: "jreDesc", label: "JRE Description", multiline: true, rows: 3 },
      { key: "jreLink", label: "JRE Link Text" },
    ],
    arrayKey: "quotes",
    arrayLabel: "Press Quotes",
    arrayItemFields: [
      { key: "text", label: "Quote Text", multiline: true, rows: 3 },
      { key: "source", label: "Source" },
    ],
  },
  footer: {
    label: "Footer",
    fields: [
      { key: "tagline", label: "Tagline", multiline: true, rows: 2 },
      { key: "instagram", label: "Instagram Handle" },
      { key: "nav", label: "Nav Column Title" },
      { key: "hours", label: "Hours Column Title" },
      { key: "contact", label: "Contact Column Title" },
      { key: "phone", label: "Phone Label" },
      { key: "email", label: "Email Label" },
      { key: "address", label: "Address Label" },
      { key: "addressLine1", label: "Address Line 1" },
      { key: "addressLine2", label: "Address Line 2" },
      { key: "rights", label: "Rights Text" },
      { key: "recommended", label: "Recommended Note" },
    ],
    arrayKey: "days",
    arrayLabel: "Opening Days",
    arrayItemFields: [
      { key: "day", label: "Day" },
      { key: "time", label: "Time" },
    ],
  },
  book: {
    label: "Reservations",
    fields: [
      { key: "label", label: "Section Label" },
      { key: "headline", label: "Headline" },
      { key: "dividerLabel", label: "Divider Label" },
      { key: "infoAvailable", label: "Info: Available" },
      { key: "infoAvailableValue", label: "Info: Available Value" },
      { key: "infoService", label: "Info: Service" },
      { key: "infoServiceValue", label: "Info: Service Value" },
      { key: "infoContact", label: "Info: Contact" },
      { key: "infoDesc1", label: "Info Description 1" },
      { key: "infoDesc2", label: "Info Description 2" },
      { key: "step1Label", label: "Step 1 Label" },
      { key: "step2Label", label: "Step 2 Label" },
      { key: "fieldDate", label: "Field: Date" },
      { key: "fieldDateHelper", label: "Field: Date Helper" },
      { key: "fieldGuests", label: "Field: Guests" },
      { key: "fieldTime", label: "Field: Time" },
      { key: "fieldFirstName", label: "Field: First Name" },
      { key: "fieldLastName", label: "Field: Last Name" },
      { key: "fieldPhone", label: "Field: Phone" },
      { key: "fieldPhonePlaceholder", label: "Field: Phone Placeholder" },
      { key: "fieldPhoneHelper", label: "Field: Phone Helper" },
      { key: "fieldEmail", label: "Field: Email" },
      { key: "continue", label: "Continue Button" },
      { key: "confirm", label: "Confirm Button" },
      { key: "edit", label: "Edit Button" },
      { key: "successLabel", label: "Success Label" },
      { key: "successMessage", label: "Success Message" },
      { key: "successText", label: "Success Text", multiline: true, rows: 2 },
      { key: "groupNote", label: "Group Note" },
    ],
  },
};

const SIDEBAR_SECTIONS = [
  { id: "menu", label: "Menu Items" },
  ...Object.entries(SECTION_CONFIGS).map(([id, cfg]) => ({
    id,
    label: cfg.label,
  })),
];

// ─── Shared styles ─────────────────────────────────────────────────────────

const darkInputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#e8e8e8",
    "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
    "&.Mui-focused fieldset": { borderColor: "var(--ds-accent)" },
  },
  "& .MuiInputLabel-root": { color: "#666" },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--ds-accent)" },
  "& .MuiFormHelperText-root": { color: "#cf6679" },
};

const accentBtnSx = {
  color: "var(--ds-accent)",
  borderColor: "rgba(var(--ds-accent-rgb),0.4)",
  fontSize: "0.7rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  "&:hover": {
    borderColor: "var(--ds-accent)",
    backgroundColor: "rgba(var(--ds-accent-rgb),0.05)",
  },
};

// ─── Section Editor ────────────────────────────────────────────────────────

function SectionEditor({ sectionId }: { sectionId: string }) {
  const cfg = SECTION_CONFIGS[sectionId];
  const [enData, setEnData] = useState<Record<string, unknown>>({});
  const [srData, setSrData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/content/${sectionId}`);
    if (r.ok) {
      const d = await r.json();
      setEnData(d.data_en as Record<string, unknown>);
      setSrData(d.data_sr as Record<string, unknown>);
    }
    setLoading(false);
  }, [sectionId]);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/content/${sectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data_en: enData, data_sr: srData }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function setEn(key: string, val: unknown) {
    setEnData((prev) => ({ ...prev, [key]: val }));
  }
  function setSr(key: string, val: unknown) {
    setSrData((prev) => ({ ...prev, [key]: val }));
  }

  // Array helpers
  const enArr = (
    cfg.arrayKey ? (enData[cfg.arrayKey] as unknown[]) ?? [] : []
  ) as Record<string, string>[];
  const srArr = (
    cfg.arrayKey ? (srData[cfg.arrayKey] as unknown[]) ?? [] : []
  ) as Record<string, string>[];

  function addArrayItem() {
    const emptyItem = cfg.arrayItemIsString
      ? ""
      : Object.fromEntries((cfg.arrayItemFields ?? []).map((f) => [f.key, ""]));
    setEnData((prev) => ({ ...prev, [cfg.arrayKey!]: [...enArr, emptyItem] }));
    setSrData((prev) => ({ ...prev, [cfg.arrayKey!]: [...srArr, emptyItem] }));
  }

  function removeArrayItem(i: number) {
    setEnData((prev) => ({
      ...prev,
      [cfg.arrayKey!]: enArr.filter((_, idx) => idx !== i),
    }));
    setSrData((prev) => ({
      ...prev,
      [cfg.arrayKey!]: srArr.filter((_, idx) => idx !== i),
    }));
  }

  function setEnArrItem(i: number, field: string | null, val: string) {
    const next = [...enArr];
    if (field === null) (next as unknown[])[i] = val;
    else next[i] = { ...next[i], [field]: val };
    setEnData((prev) => ({ ...prev, [cfg.arrayKey!]: next }));
  }

  function setSrArrItem(i: number, field: string | null, val: string) {
    const next = [...srArr];
    if (field === null) (next as unknown[])[i] = val;
    else next[i] = { ...next[i], [field]: val };
    setSrData((prev) => ({ ...prev, [cfg.arrayKey!]: next }));
  }

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
        <CircularProgress sx={{ color: "var(--ds-accent)" }} />
      </Box>
    );

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.6rem",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            {cfg.label}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "var(--ds-accent)",
              textTransform: "uppercase",
              mt: 0.5,
            }}
          >
            EN + SR
          </Typography>
        </Box>
        <Button
          onClick={save}
          disabled={saving}
          variant="outlined"
          startIcon={
            saving ? (
              <CircularProgress size={14} sx={{ color: "var(--ds-accent)" }} />
            ) : (
              <SaveIcon sx={{ fontSize: "0.9rem" }} />
            )
          }
          sx={{
            ...accentBtnSx,
            color: saved ? "#6abf69" : "var(--ds-accent)",
            borderColor: saved ? "#6abf69" : "rgba(var(--ds-accent-rgb),0.4)",
          }}
        >
          {saved ? "Saved" : "Save"}
        </Button>
      </Box>

      {/* String fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: cfg.arrayKey ? 6 : 0,
        }}
      >
        {cfg.fields.map((f) => (
          <Box
            key={f.key}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            <TextField
              label={`${f.label} (EN)`}
              value={(enData[f.key] as string) ?? ""}
              onChange={(e) => setEn(f.key, e.target.value)}
              fullWidth
              multiline={f.multiline}
              rows={f.rows}
              sx={darkInputSx}
            />
            <TextField
              label={`${f.label} (SR)`}
              value={(srData[f.key] as string) ?? ""}
              onChange={(e) => setSr(f.key, e.target.value)}
              fullWidth
              multiline={f.multiline}
              rows={f.rows}
              sx={darkInputSx}
            />
          </Box>
        ))}
      </Box>

      {/* Array field */}
      {cfg.arrayKey && (
        <Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                color: "var(--ds-accent)",
                textTransform: "uppercase",
              }}
            >
              {cfg.arrayLabel}
            </Typography>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={addArrayItem}
              sx={accentBtnSx}
              variant="outlined"
            >
              Add
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {enArr.map((_, i) => (
              <Box
                key={i}
                sx={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  p: 3,
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "#555",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  Item {i + 1}
                </Typography>
                <IconButton
                  onClick={() => removeArrayItem(i)}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#555",
                    "&:hover": { color: "#cf6679" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

                {cfg.arrayItemIsString ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Alt Text (EN)"
                      value={(enArr[i] as unknown as string) ?? ""}
                      onChange={(e) => setEnArrItem(i, null, e.target.value)}
                      fullWidth
                      sx={darkInputSx}
                    />
                    <TextField
                      label="Alt Text (SR)"
                      value={(srArr[i] as unknown as string) ?? ""}
                      onChange={(e) => setSrArrItem(i, null, e.target.value)}
                      fullWidth
                      sx={darkInputSx}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {(cfg.arrayItemFields ?? []).map((f) => (
                      <Box
                        key={f.key}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 2,
                        }}
                      >
                        <TextField
                          label={`${f.label} (EN)`}
                          value={enArr[i]?.[f.key] ?? ""}
                          onChange={(e) =>
                            setEnArrItem(i, f.key, e.target.value)
                          }
                          fullWidth
                          multiline={f.multiline}
                          rows={f.rows}
                          sx={darkInputSx}
                        />
                        <TextField
                          label={`${f.label} (SR)`}
                          value={srArr[i]?.[f.key] ?? ""}
                          onChange={(e) =>
                            setSrArrItem(i, f.key, e.target.value)
                          }
                          fullWidth
                          multiline={f.multiline}
                          rows={f.rows}
                          sx={darkInputSx}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

// ─── Menu Editor ───────────────────────────────────────────────────────────

function MenuEditor() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, "id">>(EMPTY_MENU_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/menu");
      if (r.ok) setItems(await r.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  function openCreate() {
    setEditItem(null);
    setForm(EMPTY_MENU_FORM);
    setDialogOpen(true);
  }
  function openEdit(item: MenuItem) {
    setEditItem(item);
    setForm({ ...item, tag: item.tag ?? "", tag_sr: item.tag_sr ?? "" });
    setDialogOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      tag: form.tag || null,
      tag_sr: form.tag_sr || null,
    };
    const url = editItem ? `/api/admin/menu/${editItem.id}` : "/api/admin/menu";
    await fetch(url, {
      method: editItem ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setDialogOpen(false);
    loadItems();
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    loadItems();
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.6rem",
              fontWeight: 300,
            }}
          >
            Menu Items
          </Typography>
          <Typography
            sx={{
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "var(--ds-accent)",
              textTransform: "uppercase",
              mt: 0.5,
            }}
          >
            EN + SR · Price · Visibility
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={openCreate}
          sx={accentBtnSx}
        >
          Add Item
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <CircularProgress sx={{ color: "var(--ds-accent)" }} />
        </Box>
      ) : (
        <Box>
          {items.map((item, idx) => (
            <Box key={item.id}>
              <Box
                sx={{
                  py: 4,
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 3,
                  alignItems: "start",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                      mb: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        color: item.is_active ? "#e8e8e8" : "#555",
                      }}
                    >
                      {item.title}
                    </Typography>
                    {item.tag && (
                      <Chip
                        label={item.tag}
                        size="small"
                        sx={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          height: 20,
                          color: "var(--ds-accent)",
                          borderColor: "rgba(var(--ds-accent-rgb),0.4)",
                          background: "transparent",
                        }}
                        variant="outlined"
                      />
                    )}
                    {!item.is_active && (
                      <Chip
                        label="Hidden"
                        size="small"
                        sx={{
                          fontSize: "0.6rem",
                          height: 20,
                          color: "#555",
                          borderColor: "#333",
                          background: "transparent",
                        }}
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      color: "var(--ds-accent)",
                      textTransform: "uppercase",
                      mb: 0.75,
                    }}
                  >
                    {item.courses} · {item.price}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.7 }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#444",
                      mt: 0.5,
                      fontStyle: "italic",
                    }}
                  >
                    SR: {item.title_sr}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    onClick={() => openEdit(item)}
                    size="small"
                    sx={{
                      color: "#555",
                      "&:hover": { color: "var(--ds-accent)" },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => setDeleteConfirm(item.id)}
                    size="small"
                    sx={{ color: "#555", "&:hover": { color: "#cf6679" } }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {idx < items.length - 1 && (
                <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
              )}
            </Box>
          ))}
          {items.length === 0 && (
            <Typography
              sx={{
                textAlign: "center",
                py: 10,
                color: "#555",
                fontSize: "0.9rem",
              }}
            >
              No menu items yet.
            </Typography>
          )}
        </Box>
      )}

      {/* Edit/Create Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            color: "#e8e8e8",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 300,
            fontSize: "1.3rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            pb: 2,
          }}
        >
          {editItem ? "Edit Menu Item" : "New Menu Item"}
        </DialogTitle>
        <DialogContent
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Title (EN)"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              fullWidth
              sx={darkInputSx}
            />
            <TextField
              label="Title (SR)"
              value={form.title_sr}
              onChange={(e) => setForm({ ...form, title_sr: e.target.value })}
              fullWidth
              sx={darkInputSx}
            />
            <TextField
              label="Courses (EN)"
              value={form.courses}
              onChange={(e) => setForm({ ...form, courses: e.target.value })}
              fullWidth
              sx={darkInputSx}
              placeholder="e.g. Six courses"
            />
            <TextField
              label="Courses (SR)"
              value={form.courses_sr}
              onChange={(e) => setForm({ ...form, courses_sr: e.target.value })}
              fullWidth
              sx={darkInputSx}
              placeholder="e.g. Šest kurseva"
            />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Description (EN)"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
              sx={darkInputSx}
            />
            <TextField
              label="Description (SR)"
              value={form.description_sr}
              onChange={(e) =>
                setForm({ ...form, description_sr: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
              sx={darkInputSx}
            />
          </Box>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}
          >
            <TextField
              label="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              fullWidth
              sx={darkInputSx}
              placeholder="e.g. 12,000 RSD"
            />
            <TextField
              label="Tag (EN)"
              value={form.tag ?? ""}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              fullWidth
              sx={darkInputSx}
              placeholder="e.g. Vegetarian"
            />
            <TextField
              label="Tag (SR)"
              value={form.tag_sr ?? ""}
              onChange={(e) => setForm({ ...form, tag_sr: e.target.value })}
              fullWidth
              sx={darkInputSx}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
            <TextField
              label="Display order"
              type="number"
              value={form.display_order}
              onChange={(e) =>
                setForm({ ...form, display_order: Number(e.target.value) })
              }
              sx={{ ...darkInputSx, width: 160 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.is_active === 1}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.checked ? 1 : 0 })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "var(--ds-accent)",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "var(--ds-accent)",
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.85rem", color: "#aaa" }}>
                  Visible on site
                </Typography>
              }
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            px: 3,
            py: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ color: "#555", "&:hover": { color: "#e8e8e8" } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="outlined"
            sx={accentBtnSx}
          >
            {saving ? (
              <CircularProgress size={18} sx={{ color: "var(--ds-accent)" }} />
            ) : editItem ? (
              "Save Changes"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            color: "#e8e8e8",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 300, fontSize: "1.1rem" }}>
          Delete menu item?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#888", fontSize: "0.85rem" }}>
            This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteConfirm(null)}
            sx={{ color: "#555", "&:hover": { color: "#e8e8e8" } }}
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              deleteConfirm !== null && handleDelete(deleteConfirm)
            }
            variant="outlined"
            sx={{
              color: "#cf6679",
              borderColor: "#cf6679",
              "&:hover": {
                borderColor: "#cf6679",
                backgroundColor: "rgba(207,102,121,0.08)",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSection, setActiveSection] = useState("menu");

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setAuthenticated(d.authenticated));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const r = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (r.ok) setAuthenticated(true);
    else setLoginError("Incorrect password");
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
  }

  if (authenticated === null) {
    return (
      <Box sx={fullCenterSx}>
        <CircularProgress sx={{ color: "var(--ds-accent)" }} />
      </Box>
    );
  }

  if (!authenticated) {
    return (
      <Box sx={fullCenterSx}>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.08)",
            p: 5,
            width: 360,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.6rem",
              fontWeight: 300,
              color: "#e8e8e8",
              letterSpacing: "0.04em",
            }}
          >
            Admin Panel
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "var(--ds-accent)",
              textTransform: "uppercase",
            }}
          >
            Delirium Silence
          </Typography>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!loginError}
            helperText={loginError}
            fullWidth
            sx={darkInputSx}
          />
          <Button type="submit" variant="outlined" sx={accentBtnSx}>
            Enter
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--ds-dark)",
        color: "#e8e8e8",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Typography
            sx={{
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              color: "var(--ds-accent)",
              textTransform: "uppercase",
            }}
          >
            Delirium Silence
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "#555", mt: 0.5 }}>
            Admin
          </Typography>
        </Box>

        <Box sx={{ flex: 1, py: 2 }}>
          {SIDEBAR_SECTIONS.map(({ id, label }) => (
            <Box
              key={id}
              onClick={() => setActiveSection(id)}
              sx={{
                px: 3,
                py: 1.5,
                cursor: "pointer",
                fontSize: "0.78rem",
                letterSpacing: "0.05em",
                color: activeSection === id ? "#e8e8e8" : "#555",
                backgroundColor:
                  activeSection === id
                    ? "rgba(255,255,255,0.04)"
                    : "transparent",
                borderLeft:
                  activeSection === id
                    ? "2px solid var(--ds-accent)"
                    : "2px solid transparent",
                transition: "all 0.15s",
                "&:hover": {
                  color: "#e8e8e8",
                  backgroundColor: "rgba(255,255,255,0.03)",
                },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        <Box sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Button
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={handleLogout}
            fullWidth
            sx={{
              color: "#555",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              justifyContent: "flex-start",
              "&:hover": { color: "#e8e8e8" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 3, md: 6 },
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        {activeSection === "menu" ? (
          <MenuEditor />
        ) : (
          <SectionEditor key={activeSection} sectionId={activeSection} />
        )}
      </Box>
    </Box>
  );
}

const fullCenterSx = {
  minHeight: "100vh",
  backgroundColor: "var(--ds-dark)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
