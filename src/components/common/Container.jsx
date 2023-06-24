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
        {header && (
          <Box
            sx={{
              position: "relative",
              paddingX: { xs: "20px", md: 0 },
              maxWidth: "1366px",
              marginX: "auto",
              width: "100%",
              "&::before": {
                content: '""',
                height: "5px",
                width: "100px",
                position: "absolute",
                top: "10-0%",
                left: { xs: "20px", md: "0" },
                backgroundColor: "primary.main",
              },
            }}
          >
            <Typography variant="h5" fontWeight="700">
              {header}
            </Typography>
          </Box>
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
