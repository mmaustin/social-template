import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidgets from "scenes/widgets/PostsWidgets";
import UserWidget from "scenes/widgets/UserWidget";


const ProfilePage = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  //the app component address must have the same /:idName as the
  //parameter name we use to grab the id with useParams!!
  //or you'll spend two hours trying to figure out what's the matter
  const {userId} = useParams();
  const token = useSelector(state => state.token);
  const {_id} = useSelector(state => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:5001/users/${userId}`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    })
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    if(userId === _id){
      getUser();
    } else {
      navigate('/home');
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  if(!user) return null

  return (
    <>
     
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m='2rem 0'/>
          <FriendsListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          { userId === _id ? (<MyPostWidget picturePath={user.picturePath} /> ): ('there\'s nothing to see here')}
          <Box m='2rem 0'/>
          <PostsWidgets userId={userId} isProfile/>
        </Box>
      </Box>      
    </Box> 
    </>
  )
}

export default ProfilePage;