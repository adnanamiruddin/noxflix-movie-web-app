import { Box, Button, Paper, Stack } from "@mui/material";
import Container from "../Utils/Container";
import Logo from "../Global/Logo";
import menuConfigs from "../../../configs/menu.configs"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((menu, i) => (
              <Button key={i} sx={{color: "inherit"}} LinkComponent={Link} to={menu.path}>
                {menu.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
