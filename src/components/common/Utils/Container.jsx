import { Box, Stack, Typography } from "@mui/material";

const Container = ({ header, children }) => {
  return (
    <Box
      sx={{
        marginTop: "5rem",
        marginX: "auto",
        color: "text.primary",
      }}
    >
      <Stack spacing={4}>
        {/* Header Component Section START */}
        {header ? (
          <Box
            sx={{
              width: "100%",
              position: "relative",
              paddingX: { xs: "20px", md: 0 },
              maxWidth: "1366px",
              marginX: "auto",
              "&::before": {
                width: "110px",
                height: "5px",
                content: '""',
                position: "absolute",
                top: "100%",
                left: { xs: "20px", md: "0" },
                backgroundColor: "primary.main",
                marginTop: "5px"
              },
            }}
          >
            <Typography variant="h5" fontWeight="700" textTransform="uppercase">
              {header}
            </Typography>
          </Box>
        ) : (
          ""
        )}
        {/* Header Component Section END */}

        {/* Main/Children Component Section START */}
        {children}
        {/* Main/Children Component Section END */}
      </Stack>
    </Box>
  );
};

export default Container;
