import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import { AddCircle as Add } from "@mui/icons-material";

// const Container = styled(Box)`
//   margin: 50px 100px;
// `;
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
});
const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 18px;
  margin-top: 50px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
// this is my initial Post how post look like and submit as form
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date()
};

const UpdatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { accounts } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const url = post.picture
    ? post.picture
    : "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=800";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        // console.log(data);

        // API Call
        const response = await API.uploadFile(data);
        post.picture = response.data;
        console.log(post.picture);
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";

    // console.log(post.categories);
    post.username = accounts.username;
  }, [file]);

  // Publish button create post api cal and store the post to db
  //   const savePost = async () => {
  //     let response = await API.createPost(post);
  //     if (response.isSuccess) {
  //       navigate("/");
  //     }
  //   };

  const updatePost = async () => {
    let response = await API.updatePost(post);
    if (response.isSuccess) {
      navigate(`/details/${id}`);
    }
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container>
        <Image src={url} alt="banner" />
        {/* <Image src={post.picture || url} alt="post" /> */}
        <StyledFormControl>
          <label htmlFor="fileInput">
            <Add fontSize="large" color="action" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <InputTextField
            placeholder="Title"
            value={post.title}
            onChange={(e) => handleChange(e)}
            name="title"
          />
          <Button
            variant="contained"
            color="warning"
            onClick={() => updatePost()}
          >
            Update
          </Button>
        </StyledFormControl>
        <Textarea
          minRows={5}
          placeholder="Tell Your Stories .... "
          onChange={(e) => handleChange(e)}
          name="description"
          value={post.description}
        />
      </Container>
    </>
  );
};
export default UpdatePost;
