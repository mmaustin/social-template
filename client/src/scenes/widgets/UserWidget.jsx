import {
  ManageAccountsOutlined,
  EditCalendarOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImageWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({userId, picturePath}) => {

  const [user, setUser] = useState(null);
  const {palette} = useTheme();
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  
}