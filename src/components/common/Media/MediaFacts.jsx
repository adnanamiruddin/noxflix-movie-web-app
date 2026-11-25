import dayjs from "dayjs";
import { Stack, Typography } from "@mui/material";

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

const formatRuntime = (minutes) => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return [hours ? `${hours}h` : "", rest ? `${rest}m` : ""]
    .filter(Boolean)
    .join(" ");
};

const formatLanguage = (code) => {
  if (!code) return "";
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) || code;
  } catch {
    return code;
  }
};

const joinNames = (people = []) => people.map((person) => person.name).join(", ");

const getFacts = (media, mediaType) => {
  const isMovie = mediaType === "movie";
  const date = isMovie ? media.release_date : media.first_air_date;
  const crew = media.credits?.crew || [];

  return [
    isMovie
      ? ["Director", joinNames(crew.filter((member) => member.job === "Director"))]
      : ["Created by", joinNames(media.created_by)],
    [
      isMovie ? "Release date" : "First aired",
      date ? dayjs(date).format("D MMMM YYYY") : "",
    ],
    isMovie
      ? ["Runtime", formatRuntime(media.runtime)]
      : ["Episode length", formatRuntime(media.episode_run_time?.[0])],
    [
      "Seasons",
      !isMovie && media.number_of_seasons
        ? `${plural(media.number_of_seasons, "season")}, ${plural(
            media.number_of_episodes,
            "episode"
          )}`
        : "",
    ],
    ["Status", media.status],
    ["Language", formatLanguage(media.original_language)],
  ].filter(([, value]) => value);
};

const MediaFacts = ({ media, mediaType }) => {
  const facts = getFacts(media, mediaType);

  if (facts.length === 0) return null;

  return (
    <Stack spacing={1}>
      {facts.map(([label, value]) => (
        <Stack key={label} direction="row" spacing={2}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ width: { xs: "7rem", sm: "9rem" }, flexShrink: 0 }}
          >
            {label}
          </Typography>
          <Typography variant="body2">{value}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default MediaFacts;
