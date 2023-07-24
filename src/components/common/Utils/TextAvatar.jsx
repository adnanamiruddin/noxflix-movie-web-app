import { Avatar } from "@mui/material";
import { blue, pink, purple, orange, green } from "@mui/material/colors";

const TextAvatar = ({ text }) => {
  const stringToColor = (str) => {
    let hash = 0;
    let i;

    for (i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [blue[500], pink[500], purple[500], orange[500], green[500]];
    const index = Math.abs(hash % colors.length);

    return colors[index];
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    const initials =
      words.length > 1
        ? `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`
        : words[0].charAt(0);
    return initials.toUpperCase();
  };

  return (
    <Avatar
      sx={{
        width: 40,
        height: 40,
        backgroundColor: stringToColor(text),
      }}
    >
      {getInitials(text)}
    </Avatar>
  );
};

export default TextAvatar;
