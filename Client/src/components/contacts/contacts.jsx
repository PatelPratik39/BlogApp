import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";

const Banner = styled(Box)`
  background-image: url(https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800);
  width: 100%;
  height: 50vh;
  background-position: left 0px top -100px;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const Contact = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">Email Communication is the best way to communicate !!</Typography>

        <Text variant="h5">
          Send me an Email : &nbsp;
          <Link
            href="mailto:ptl.pratik717@gmail.com?Subject=This is a subject"
            target="_blank"
            color="inherit"
          >
            <Email />
          </Link>
        </Text>
      </Wrapper>
    </Box>
  );
};

export default Contact;
