import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import PageButtonWidget from "./PageButtonWidget";


const PostsWidgets = ({userId, isProfile}) => {

  const dispatch = useDispatch();
  const objectposts = useSelector(state => state.posts);
  const totalPosts = useSelector(state => state.totalPosts);
  const numOfPages = useSelector(state => state.numOfPages)
  //const {posts} = objectposts;
  //console.log(objectposts);
  const token = useSelector(state => state.token);

  const getPosts = async () => {
    const response = await fetch('http://localhost:5001/posts', {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    const {posts, totalPosts, numOfPages} = data;
    //console.log(totalPosts, numOfPages);
    dispatch(setPosts({posts: posts, totalPosts: totalPosts, numOfPages: numOfPages }));
  }

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:5001/posts/${userId}/posts`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    dispatch(setPosts({posts: data.posts}));
  }

  useEffect(() => {
    if(isProfile){
      getUserPosts();
    } else {
      getPosts();
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {objectposts.map(({
        _id, userId, firstName, lastName, description, location,
        picturePath, userPicturePath, likes, comments
      }) => (
        <PostWidget
        key={_id}
        postId={_id}
        postUserId={userId}
        name={`${firstName} ${lastName}`}
        description={description}
        location={location}
        picturePath={picturePath}
        userPicturePath={userPicturePath}
        likes={likes}
        comments={comments}
        />
      ))}
      <PageButtonWidget totalPosts={totalPosts} numOfPages={numOfPages}/>
    </>
  )
}
export default PostsWidgets