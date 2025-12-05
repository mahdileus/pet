const mongoose = require("mongoose");

const articleCategorySchema  = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String 
  },
  parent: { 
    type: mongoose.Types.ObjectId, 
    ref: "Category", 
    default: null 
  }
}, { timestamps: true });

const ArticleCategory  = mongoose.models.ArticleCategory  || mongoose.model("ArticleCategory", articleCategorySchema);

module.exports = ArticleCategory;
