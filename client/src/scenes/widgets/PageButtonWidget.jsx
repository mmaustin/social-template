import { Button, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";



const PageButtonWidget = ({totalPosts, numOfPages}) => {
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography>{totalPosts}</Typography>
        <Typography>{numOfPages}</Typography>
      </FlexBetween>
      <Button
        sx={{color: 'blue'}}
      >
        Button
      </Button>
    </WidgetWrapper>
  )
}
export default PageButtonWidget