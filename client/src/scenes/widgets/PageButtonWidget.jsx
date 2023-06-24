import { Button, Typography, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";



const PageButtonWidget = ({totalPosts, numOfPages}) => {

  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  const pages = Array.from({length: numOfPages}, (_, i) => {
    return i + 1;
  })

  const [page, setPage] = useState(1);
  //console.log(page);

  const nextPage = () => {
    let newPage = page + 1;
    if(newPage > numOfPages){
      newPage = 1;
    }
    setPage(newPage);
  }

  const prevPage = () => {
    let newPage = page - 1;
    if(newPage < 1){
      newPage = numOfPages;
    }
    setPage(newPage);
  }

  const getPosts = async () => {
    const response = await fetch(`http://localhost:5001/posts?page=${page}`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    const {posts, totalPosts, numOfPages} = data;
    //console.log(totalPosts, numOfPages);
    dispatch(setPosts({posts: posts, totalPosts: totalPosts, numOfPages: numOfPages }));
  }

  useEffect(() => {
    getPosts();
  }, [page]) //eslint-disable-line react-hooks/exhaustive-deps

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
          Next Button
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
                onClick={() => setPage(pageNumber)}
              >
              {pageNumber}
            </Button>
          })}
        </Box>
        <Button
          onClick={prevPage}
          sx={{color: 'blue', bgcolor: 'white'}}
        >
          Prev Button
        </Button>
      </FlexBetween>  
    </WidgetWrapper>
  )
}
export default PageButtonWidget