// Fri 17/7/20 L-389 Set up Server Challenge

// step1 starting file
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const express = require('express');

const app = express();

app.set('view engine', ejs);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//// TODO:

// SET UP Mongoose connection (step 2)
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true,useUnifiedTopology: true});

// step3 create the Schema
const articleSchema = {
  title: String,
  content: String
};

// step4 create the Model

const Article = mongoose.model("Article",articleSchema);

// // l-391 Get all Articles
// // step 5 Fetching or get all the articles in our collections
//
// app.get("/articles", function(req,res){
//   Article.find(function(err, foundArticles){
//     // console.log(foundArticles);
//     if(!err){
//         res.send(foundArticles);
//     } else {
//       res.send(err);
//     }
//
//   });
//
// });
//
// // L-392 Post a New article (download postman from  getpostman.com)
// // step 6
//
// app.post("/articles", function(req,res){
//   // create an article step 7
//   const newArticle = new Article({
//     title: req.body.title,
//     content:req.body.content
//   });
//   // to know that you can add function in save https://mongoosejs.com/docs/models.html
//   newArticle.save(function(err){
//     if(!err){
//       res.send("Successfully added a new article");
//     } else {
//       res.send ("err");
//     }
//   });
// });
//
// // L-393 DELETE all articles
// // step 8
// app.delete("/articles", function(req,res){
//   Article.deleteMany(function(err){
//     if(!err){
//       res.send("Succesfully deleted all articles");
//     } else{
//       res.send(err);
//     }
//
//   });
// });

// L-395 -Chained Route Handlers Using Express step 9 deleting the get post and delete above
// app.route()method   http://expressjs.com/en/guide/routing.html
// app.route("/articles").get().post().delete()
//////////////Request targeting all article /////////
app.route("/articles")
.get(function(req,res){
  Article.find(function(err, foundArticles){
    // console.log(foundArticles);
    if(!err){
        res.send(foundArticles);
    } else {
      res.send(err);
    }

  });

})
.post(function(req,res){
  // create an article step 7
  const newArticle = new Article({
    title: req.body.title,
    content:req.body.content
  });
  // to know that you can add function in save https://mongoosejs.com/docs/models.html
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added a new article");
    } else {
      res.send ("err");
    }
  });
})
.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Succesfully deleted all articles");
    } else{
      res.send(err);
    }

  });
});
//  step 10. L-395 GET a specific article
//////////////Request targeting a specific article /////////
// Route parameters   http://expressjs.com/en/guide/routing.html

app.route("/articles/:articleTitle")
// req.params.articleTitle = "jQuery";
.get(function(req,res){
  Article.findOne({title: req.params.articleTitle},function(err,foundArticle){
    if(foundArticle){
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found");
    }
  });
})

// step 11 update L-396 PUT a specific Article
.put(function(req,res){
  Article.update(
    {title: req.params.articleTitle},
    {title:req.body.title, content:req.body.content},
    {overwrite:true},
    function(err,){
      if(!err){
        res.send("Succefully updated article.");
      }
    });
})

// step 12 L-397 Patch a specifc article( just on postman and patch)
//  step 13 l- 398 delete a specifc article
// https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne

.delete(function(req,res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err,){
      if(!err){
        res.send("Succefully deleted article.");
      } else{
        res.send(err);
      }
    });
});


app.listen(3000,function(){
  console.log("Server started on port 3000");
});
