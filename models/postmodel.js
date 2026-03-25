const { getDB } = require("../db");
const crypto = require("crypto");

 async function createPost(body, file) {
  try {
    let { userid, message, promo } = body;

    if (!userid || (!message && !file)) {
      return { code: -1, msg: "Post must have text or image" };
    }

    const db =await getDB();
    const users = db.collection("users");
    const posts = db.collection("posts");

    const user = await users.findOne({ userid });
    if (!user) return { code: -2, msg: "User not found" };

    const postId = crypto.randomBytes(16).toString("hex");

    const newPost = {
      postId,
      userid,
      username:user.username,
      message: message || "",
      image: file ? `/uploads/${file.filename}` : null,
      promo: promo || false,
      likes: 0,
      likedBy: [],
      comments: [],
      commentsCount: 0,
      createdAt: new Date(),
    };

    await posts.insertOne(newPost);

    return { code: 0, msg: "Post created", post: newPost };
  } catch (e) {
    return { code: -500, msg: "Server error" };
  }
}

 async function addComment(body) {
  try {
    let { postId, userid, text } = body;

    if (!postId || !userid || !text) {
      return { code: -1, msg: "Missing fields" };
    }

    const db = await getDB();
    const posts = db.collection("posts");
    const users = db.collection("users");

    const user = await users.findOne({ userid });
    if (!user) return { code: -2, msg: "User not found" };

    const post = await posts.findOne({ postId });
    if (!post) return { code: -3, msg: "Post not found" };

    const comment = {
      commentId: crypto.randomBytes(12).toString("hex"),
      userid,
      text,
      createdAt: new Date(),
    };

    await posts.updateOne(
      { postId },
      {
        $push: { comments: comment },
        $inc: { commentsCount: 1 },
      }
    );

    return { code: 0, msg: "Comment added", comment };
  } catch (e) {
    return { code: -500, msg: "Server error" };
  }
}

 async function likePost(body) {
  try {
    let { postId, userid } = body;

    if (!postId || !userid) {
      return { code: -1, msg: "Missing fields" };
    }

    const db = await getDB();
    const posts = db.collection("posts");

    const post = await posts.findOne({ postId });
    if (!post) return { code: -2, msg: "Post not found" };

    const alreadyLiked = post.likedBy?.includes(userid);

    if (alreadyLiked) {
      return { code: -3, msg: "Already liked" };
    }

    await posts.updateOne(
      { postId },
      {
        $addToSet: { likedBy: userid },
        $inc: { likes: 1 },
      }
    );

    return { code: 0, msg: "Liked" };
  } catch (e) {
    return { code: -500, msg: "Server error" };
  }
}

 async function unlikePost(body) {
  try {
    let { postId, userid } = body;

    if (!postId || !userid) {
      return { code: -1, msg: "Missing fields" };
    }

    const db = await getDB();
    const posts = db.collection("posts");

    const post = await posts.findOne({ postId });
    if (!post) return { code: -2, msg: "Post not found" };

    const alreadyLiked = post.likedBy?.includes(userid);

    if (!alreadyLiked) {
      return { code: -3, msg: "Not liked yet" };
    }

    await posts.updateOne(
      { postId },
      {
        $pull: { likedBy: userid },
        $inc: { likes: -1 },
      }
    );

    return { code: 0, msg: "Unliked" };
  } catch (e) {
    return { code: -500, msg: "Server error" };
  }
}

module.exports = {
    addComment,createPost,likePost,unlikePost
}