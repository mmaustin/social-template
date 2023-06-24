import { Button, Typography, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";



const PageButtonWidget = ({totalPosts, numOfPages}) => {

  const [page, setPage] = useState(0);

  const nextPage = () => {
    console.log('next page');
  }

  const prevPage = () => {
    console.log('prev page');
  }

  return (
    <WidgetWrapper>
      {/* <FlexBetween>
        <Typography>{totalPosts}</Typography>
        <Typography>{numOfPages}</Typography>
      </FlexBetween> */}
      <Button
        onClick={nextPage}
        sx={{color: 'blue', bgcolor: 'white'}}
      >
        Prev Button
      </Button>
      <Box >buttons</Box>
      <Button
        onClick={nextPage}
        sx={{color: 'blue', bgcolor: 'white'}}
      >
        Prev Button
      </Button>
    </WidgetWrapper>
  )
}
export default PageButtonWidget