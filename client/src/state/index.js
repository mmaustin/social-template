import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
    totalPosts: 0,
    numOfPages: 0,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            } else {
                console.error('user friends doesn\'t exist');
            }
        },
        setPosts: (state, action)=>{
            state.posts = action.payload.posts;
            state.totalPosts = action.payload.totalPosts;
            state.numOfPages = action.payload.numOfPages;            
        },
        setPost: (state, action) => {
            //remember, the post is already in state.post. we're replacing
            //that post with the payload post that has the updated likes info.
            //if it's not the updated likes post, just return the post.
            //i really confused myself with this simple operation!!!
            const updatedPosts = state.posts.map((post,i) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setUsersPosts: (state, action) => {
            const userPosts = action.payload.posts.filter((post) => post.userId === action.payload._id);
            state.posts = userPosts;
        }
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUsersPosts} = authSlice.actions;
export default authSlice.reducer;