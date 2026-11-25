import { useLayoutEffect, useRef, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import uiConfigs from "../../../configs/ui.configs";

const ExpandableText = ({ text, lines }) => {
  const textRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (element && !expanded)
      setClamped(element.scrollHeight > element.clientHeight + 1);
  }, [text, expanded]);

  return (
    <Stack spacing={1}>
      <Typography
        ref={textRef}
        variant="body1"
        sx={expanded ? { textAlign: "justify" } : uiConfigs.style.typoLines(lines)}
      >
        {text}
      </Typography>
      {clamped || expanded ? (
        <Button
          size="small"
          color="inherit"
          sx={{ alignSelf: "flex-start", fontWeight: "600" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Read more"}
        </Button>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default ExpandableText;
