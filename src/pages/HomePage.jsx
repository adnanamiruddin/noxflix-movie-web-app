import HeroSlide from "../components/common/Media/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { routesGen } from "../routes/routes";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Utils/Container";
import MediaSlide from "../components/common/Media/MediaSlide";

const { mediaType, mediaCategory } = tmdbConfigs;

const sections = [
  { header: "Popular Movies", type: mediaType.movie, category: mediaCategory.popular },
  { header: "Top Movies", type: mediaType.movie, category: mediaCategory.top_rated },
  { header: "Now Playing Movies", type: mediaType.movie, category: mediaCategory.now_playing },
  { header: "Popular Series", type: mediaType.tv, category: mediaCategory.popular },
  { header: "Top Series", type: mediaType.tv, category: mediaCategory.top_rated },
  { header: "On The Air Series", type: mediaType.tv, category: mediaCategory.on_the_air },
];

const HomePage = () => {
  return (
    <div>
      <HeroSlide
        mediaType={mediaType.movie}
        mediaCategory={mediaCategory.popular}
      />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        {sections.map(({ header, type, category }) => (
          <Container
            key={header}
            header={header}
            action={{
              label: "See all",
              to: `${routesGen.mediaList(type)}?category=${category}`,
            }}
          >
            <MediaSlide mediaType={type} mediaCategory={category} />
          </Container>
        ))}
      </Box>
    </div>
  );
};

export default HomePage;
