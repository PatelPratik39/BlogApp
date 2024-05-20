import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 500px;
     & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'containe',
    borderRadius: '10px 10px 0 0',
    height: 350
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;
const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "../../../../src/assets/noImageFound.png";
  return (
    <>
      <Container>
        <Image src={url} alt="blog" />
        <Text>{post.categories}</Text>
        <Heading>{addElipsis(post.title, 25)}</Heading>
        <Text>Author : {post.username}</Text>
        <Details>{addElipsis(post.description, 100)}</Details>
      </Container>
    </>
  );
};
export default Post;
