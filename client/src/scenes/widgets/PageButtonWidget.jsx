import { Button, Typography, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";



const PageButtonWidget = ({totalPosts, numOfPages}) => {

  const pages = Array.from({length: numOfPages}, (_, i) => {
    return i + 1;
  })

  const [page, setPage] = useState(1);

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
      <FlexBetween>
        <Button
          onClick={nextPage}
          sx={{color: 'blue', bgcolor: 'white'}}
        >
          Prev Button
        </Button>
        <Box >
          {pages.map((pageNumber, i) => {
            return <Button
                key={i}
                type='button'
                sx={{color: 'blue', bgcolor: 'white',
                  ...(pageNumber === page && {
                    bgcolor: 'pink' 
                  })
                }}
                onClick={() => console.log('change page')}
              >
              {pageNumber}
            </Button>
          })}
        </Box>
        <Button
          onClick={prevPage}
          sx={{color: 'blue', bgcolor: 'white'}}
        >
          Next Button
        </Button>
      </FlexBetween>  
    </WidgetWrapper>
  )
}
export default PageButtonWidget