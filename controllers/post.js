const { addComment,createPost, likePost, unlikePost }  =  require("../models/postmodel");

 const createPostController = async (req, res) => {
  try {
    const result = await createPost(req.body, req.file);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ code: -500, msg: "Server error" });
  }
};

 const addCommentController = async (req, res) => {
  try {
    const result = await addComment(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ code: -500, msg: "Server error" });
  }
};

 const likePostController = async (req, res) => {
  try {
    const result = await likePost(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ code: -500, msg: "Server error" });
  }
};

 const unlikePostController = async (req, res) => {
  try {
    const result = await unlikePost(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ code: -500, msg: "Server error" });
  }
};


module.exports = {
    createPostController,unlikePostController,likePostController,addCommentController
}