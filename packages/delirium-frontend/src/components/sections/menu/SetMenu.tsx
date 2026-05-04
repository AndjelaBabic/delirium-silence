import { Box, Container, Divider, Typography } from "@mui/material";
import { useLanguage } from "../../../context/LanguageContext";

export const SetMenus = () => {
  const { t } = useLanguage();
  const m = t.menu;

  return (
    <Box component="section" aria-label="Set Menus" id="menu" sx={{ py: { xs: 10, md: 18 }, backgroundColor: "var(--ds-dark)", color: "#e8e8e8" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 8, md: 12 }, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.4em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 3 }}>
            {m.label}
          </Typography>
          <Typography component="h2" sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, fontWeight: 300, lineHeight: 1.2, letterSpacing: "0.01em" }}>
            {m.headline}
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 0, md: "0 64px" } }}>
          {m.items.map((menu: { title: string; courses: string; description: string; price: string; tag: string | null }, index: number) => (
            <Box key={index}>
              <Box
                sx={{
                  py: { xs: 4, md: 5 },
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 3,
                  alignItems: "start",
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 0.75 },
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                    <Typography component="h3" sx={{ fontSize: { xs: "1rem", md: "1.05rem" }, fontWeight: 400, letterSpacing: "0.03em", color: "#e8e8e8" }}>
                      {menu.title}
                    </Typography>
                    {menu.tag && (
                      <Typography sx={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ds-accent)", border: "1px solid rgba(var(--ds-accent-rgb),0.4)", px: 1, py: 0.3, lineHeight: 1.5, whiteSpace: "nowrap" }}>
                        {menu.tag}
                      </Typography>
                    )}
                  </Box>
                  <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--ds-accent)", textTransform: "uppercase", mb: 1.5 }}>
                    {menu.courses}
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.8, color: "#787878" }}>
                    {menu.description}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--ds-accent)", letterSpacing: "0.05em", whiteSpace: "nowrap", textAlign: "right" }}>
                  {menu.price}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.07)" }} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
