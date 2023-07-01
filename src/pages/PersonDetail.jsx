import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import personApi from "../api/modules/person.api";
import { toast } from "react-toastify";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import Container from "../components/common/Container";
import PersonMediaGrid from "../components/common/PersonMediaGrid";
import PostersSlide from "../components/common/PostersSlide";

const PersonDetail = () => {
  const { personId } = useParams();
  const dispatch = useDispatch();

  const [person, setPerson] = useState();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await personApi.getDetail({ personId });
      dispatch(setGlobalLoading(false));

      if (response) setPerson(response);
      if (error) toast.error(error.message);
    };

    getPerson();
  }, [personId, dispatch]);

  return (
    <div>
      <Toolbar />
      {person ? (
        <div>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ width: { xs: "50%", md: "20%" } }}>
                {/* Person's Profile Photo START */}
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      person.profile_path
                    )})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                  }}
                />
              </Box>
              {/* Person's Profile Photo END */}
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={4}>
                  {/* Person's Name and Birthday Year START */}
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} `}
                    {person.birthday
                      ? `(${person.birthday.split("-")[0]} - `
                      : ""}
                    {person.deathday ? `${person.birthday.split("-")[0]}` : ""}
                    {person.birthday && person.deathday ? ")" : ""}
                    {/* {`${person.name} (${person.birthday.split("-")[0]}`}
                    {person.deathday
                      ? ` - ${person.deathday.split("-")[0]}`
                      : ""}
                    {")"} */}
                  </Typography>
                  {/* Person's Name and Birthday Year END */}

                  {/* Person's Biography START */}
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                  {/* Person's Biography END */}
                </Stack>
              </Box>
            </Box>

            {/* Person's Photos START */}
            <Container header={`${person.name}'s Photos`}>
              <PostersSlide posters={person.images.profiles} />
            </Container>
            {/* Person's Photos END */}

            {/* Person's Medias START */}
            <Container header={`${person.name}'s Medias`}>
              <PersonMediaGrid personId={personId} />
            </Container>
            {/* Person's Medias END */}
          </Box>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PersonDetail;
