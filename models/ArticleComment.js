const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  article: { 
    type: mongoose.Types.ObjectId, 
    ref: "Article", 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  replies: [{ 
    type: mongoose.Types.ObjectId, 
    ref: "Comment" 
  }],
  likes: { 
    type: Number, 
    default: 0 
  },
  isApproved: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

const ArticleComment  = mongoose.models.ArticleComment  || mongoose.model("ArticleComment", commentSchema);

module.exports = ArticleComment ;
