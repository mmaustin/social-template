import {Box, Typography, useTheme} from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';


const FriendsListWidget = ({userId}) => {

  const dispatch = useDispatch();
  const {palette} = useTheme();
  const token = useSelector(state => state.token);
  const friends = useSelector(state => state.user.friends); 
  
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:5001/users/${userId}/friends`,
       { method: "GET",
        Authoriaation: `Bearer ${token}`
      }
    );
    const data = await response.json();
    dispatch(setFriends({friends: data}));
  };

  useEffect(()=>{
    getFriends();
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>FriendsListWidget</div>
  )
}
export default FriendsListWidget