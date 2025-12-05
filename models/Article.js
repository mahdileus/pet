const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },

  category: { type: mongoose.Types.ObjectId, ref: "ArticleCategory", required: true },

  author: { type: mongoose.Types.ObjectId, ref: "User", required: true },

  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },

  timeToRead: { type: Number, default: 5 },

  tags: { type: [String], default: [] },

  thumbnail: { type: String, default: "/images/default-article.png" },

  // optional fields for analytics & SEO
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Types.ObjectId, ref: "ArticleComment" }],
  meta: {
    title: String,
    description: String
  }
}, { timestamps: true });

const Article = mongoose.models.Article || mongoose.model("Article", articleSchema);

module.exports = Article;
