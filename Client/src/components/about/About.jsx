import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";

const Banner = styled(Box)`
  background-image: url(https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg?auto=compress&cs=tinysrgb&w=800);
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const About = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">Blogzzz App by Pratik</Typography>
        <Text variant="h5">
          I'm a Software Engineer. Experienced and enthusiastic software
          engineer with over 3 years of hands-on experience, possessing a proven
          track record of delivering high-quality solutions. Passionate about
          leveraging technology to solve complex problems and drive innovation,
          I am skilled in ReactJs, Express, NodeJs, Java, Springboot, MongoDB,
          and AWS. Currently seeking new opportunities to contribute my
          expertise and creativity to exciting projects.
          <br />
          <br />
          <Text variant="h5">Here is my Project works : &nbsp;</Text>
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link
              href="https://github.com/PatelPratik39"
              color="inherit"
              target="_blank"
            >
              <GitHub />
            </Link>
          </Box>
        </Text>
        {/* <Text variant="h5">
          send me an Email
          <Link
            href="mailto:ptl.pratik717@gmail.com?Subject=This is a subject"
            target="_blank"
            color="inherit"
          >
            <Email />
          </Link>
        </Text> */}
      </Wrapper>
    </Box>
  );
};

export default About;
