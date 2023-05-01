import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async(req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();
        //below returns all the posts to the frontend not just the created post
        const posts = await Post.find();

        res.status(201).json(posts);
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getFeedPosts = async(req,res) => {
    try {
        const posts = await Post.find();

        res.status(200).json(posts);        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getUserPosts = async(req,res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const likePost = async(req,res) => {
    try {
        const {userId} = req.body;
        const {id} = req.params;
        const post = await Post.find({userId});
        //Where does this key [0] come from!!??
        const isLiked = post[0].likes.get(userId);

        if(isLiked){
            post[0].likes.delete(userId);
        } else {
            post[0].likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post[0].likes},
            {new: true}
        );

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({message: error.message});
    }    
}