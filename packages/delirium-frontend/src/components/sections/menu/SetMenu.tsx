import { Box, Container, Divider, Typography } from "@mui/material";

const menus = [
  {
    title: "Delirium Madness Experience",
    description: "Nine course tasting menu",
    price: "14,000 RSD",
  },
  {
    title: "Delirium Experience",
    description: "Six course tasting menu",
    price: "12,000 RSD",
  },
  {
    title: "Delirium Vegetarian Experience",
    description: "Six course vegetarian tasting menu",
    price: "9,000 RSD",
  },
  {
    title: "Delirium Pescatarian Experience",
    description: "Six course vegetarian menu plus fish",
    price: "11,000 RSD",
  },
  {
    title: "Delirium Snack",
    description: "Snack three course meat menu",
    price: "6,000 RSD",
  },
  {
    title: "Delirium Vegetarian Snack",
    description: "Vegetarian snack three course menu",
    price: "5,000 RSD",
  },
];
export const SetMenus = () => {
  return (
    <Box sx={{ py: 16, backgroundColor: "#fafafa" }}>
      {" "}
      <Container maxWidth="md">
        {" "}
        <Typography
          variant="overline"
          sx={{ letterSpacing: "3px", color: "#999" }}
        >
          {" "}
          Set Menus{" "}
        </Typography>{" "}
        <Typography variant="h3" sx={{ my: 6, fontWeight: 300 }}>
          {" "}
          Our Experiences{" "}
        </Typography>{" "}
        {menus.map((menu, index) => (
          <Box key={index} sx={{ mb: 6 }}>
            {" "}
            <Typography variant="h6">{menu.title}</Typography>{" "}
            <Typography sx={{ color: "#777", my: 1 }}>
              {" "}
              {menu.description}{" "}
            </Typography>{" "}
            <Typography sx={{ fontWeight: 500 }}>{menu.price}</Typography>{" "}
            <Divider sx={{ mt: 4 }} />{" "}
          </Box>
        ))}{" "}
      </Container>{" "}
    </Box>
  );
};
