import React, { useEffect, useState } from "react";
import { API } from "../../../service/api.js";
import { Box, Grid } from "@mui/material";
import Post from "./Post.jsx";
import { Link, useSearchParams } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  // if i want to filter the post based on categories.i need to filter the categories using searchParams
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await API.getAllPosts({ category: category || "" });
      // console.log(response);
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchPostData();
  }, [category]);

  return (
    <>
      {posts?.length ? (
        posts.map((post, index) => (
          <Grid key={index} item lg={3} sm={4} xs={12}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`details/${post._id}`}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          No data is available for selected Category!! 🤷🏻‍♂️
        </Box>
      )}
    </>
  );
};

export default Posts;

// import { useEffect, useState } from "react";

// import { Grid, Box } from "@mui/material";
// import { Link } from "react-router-dom";

// import { getAllPosts } from '../../../service/api';
// // import { API } from "../../../service/api";

// //components
// import Post from "./Post";

// const Posts = () => {
//   const [posts, getPosts] = useState([]);

// //   const [searchParams] = useSearchParams();
// //   const category = searchParams.get("category");

//   useEffect(() => {
//     const fetchData = async () => {
//       let response = await API.getAllPosts({ category: category || "" });
//       if (response.isSuccess) {
//         getPosts(response.data);
//       }
//     };
//     fetchData();
//   }, [category]);

//   return (
//     <>
//       {posts?.length ? (
//         posts.map((post, index) => (
//           <Grid key={index} item lg={3} sm={4} xs={12}>
//             <Link
//               style={{ textDecoration: "none", color: "inherit" }}
//               to={`details/${post._id}`}
//             >
//               <Post post={post} />
//             </Link>
//           </Grid>
//         ))
//       ) : (
//         <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
//           No data is available for selected category
//         </Box>
//       )}
//     </>
//   );
// };

// export default Posts;
