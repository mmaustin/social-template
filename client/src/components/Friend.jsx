import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImageWidget";
import { useNavigate } from "react-router-dom";


const Friend = ({friendId, name, subtitle, userPicturePath}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {_id} = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const friends = useSelector(state => state.user.friends);

  const {palette} = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find(friend => friend._id === friendId);
  
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:5001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
    
  }

  return (
    <div>Friend</div>
  )
}
export default Friend