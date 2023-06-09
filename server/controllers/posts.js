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

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page -1) * limit;

        const posts = await Post.find().skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments(posts);
        const numOfPages = Math.ceil(totalPosts / limit);

        res.status(200).json({posts, totalPosts, numOfPages});        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getUserPosts = async(req,res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page -1) * limit;        

        const {userId} = req.params;
        const posts = await Post.find({userId}).skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments(posts);
        const numOfPages = Math.ceil(totalPosts / limit);

        res.status(200).json({posts, totalPosts, numOfPages})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const likePost = async(req,res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({message: error.message});
    }    
}