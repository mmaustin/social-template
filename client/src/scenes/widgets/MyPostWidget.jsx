import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material";

import {Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImageWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({picturePath}) => {

  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const {palette} = useTheme();
  const {_id} = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if(image){
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:5001/posts`, {
      method: "POST",
      headers: {Authorization: `Bearer ${token}`},
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({posts}));
    setImage(null);
    setPost("")
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind . . . "
          value={post}
          onChange={(e)=> setPost(e.target.value)}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem"
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5pm"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
              acceptedFiles=".jpg, .jpeg, .png"
              multiple={false}
              onDrop={(acceptedFiles) =>
                  setImage(acceptedFiles, acceptedFiles[0])
              }
          >
              {({getRootProps, getInputProps}) => (
                  <FlexBetween>
                  <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.mani}`}
                      p="1rem"
                      width="100%"
                      sx={{"&:hoover": {cursor: "pointer"}}}
                  >
                      <input {...getInputProps()} />
                      {!image ? (
                          <p>Add Image Here</p>
                      ) : (
                          <FlexBetween>
                              <Typography>{image.name}</Typography>
                              <EditOutlined/>
                          </FlexBetween>
                      )}
                  </Box>
                  {/* START HERE TUESDAY */}
                  </FlexBetween>
              )}
          </Dropzone>
        </Box>
      )}
    </WidgetWrapper>
  )
}
export default MyPostWidget
