import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem" fontStyle="italic">
      Noxlack{" "}
      <span
        style={{
          color: theme.palette.primary.main,
          fontWeight: "900",
          fontSize: "103%",
        }}
      >
        Movie
      </span>
    </Typography>
  );
};

export default Logo;
