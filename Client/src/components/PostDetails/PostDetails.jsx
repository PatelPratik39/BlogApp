import React from "react";
import { useState, useEffect, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

// components
// import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "75px 10px",
  [theme.breakpoints.down("md")]: {
    margin: 0
  }
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "contain"
  // objectFit: "cover"
});


const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block"
  }
}));

const Description = styled(Typography)`
  word-break: break-word;
`;

const PostDetails = () => {
  const [post, setPost] = useState({});
  const { accounts } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const url = post.picture ? post.picture : "../../assets/no-pictures.png";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

// Debugging urpose, i was not getting accounts details

  // useEffect(() => {
  //   console.log("Accounts:", accounts);
  //   console.log("Post:", post);
  //   if (accounts && post) {
  //     console.log("Accounts Username:", accounts.username);
  //     console.log("Post Username:", post.username);
  //     console.log("Comparison Result:", accounts?.username === post?.username);
  //   }
  // }, [accounts, post]);

  const deleteBlog = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={post.picture || url} alt="post" />
  
      <Box style={{ float: "right" }}>
        {accounts.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon color="error" onClick={() => deleteBlog()} />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          Author :{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {post.username}
          </Box>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description>{post.description}</Description>
    </Container>
  );
};

export default PostDetails;

{
  /* {accounts.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={() => deleteBlog()} color="error" />
          </>
        )} */
}
