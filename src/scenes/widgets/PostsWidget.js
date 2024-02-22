import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../states";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isPorfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getUserPost = async () => {
    const res = await fetch(`/post/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    dispatch(setPost({ posts: data }));
  };

  const getPosts = async () => {
    const res = await fetch(`/post/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isPorfile) {
      getUserPost();
    } else {
      getPosts();
    }
  }, [dispatch]);

  return (
    <>
      {posts?.post?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userpicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userpicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
