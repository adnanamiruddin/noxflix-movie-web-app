const mediaType = {
  movie: "movie",
  tv: "tv",
};

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated",
  now_playing: "now_playing",
  on_the_air: "on_the_air"
};

const backdropPath = (imgEndPoint) => `https://image.tmdb.org/t/p/original${imgEndPoint}`;

const posterPath = (imgEndPoint) => `https://image.tmdb.org/t/p/w500${imgEndPoint}`;

const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbConfigs;
