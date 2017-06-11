var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDev');
mongoose.Promise = require('q').Promise;

var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: {type:Date, default: Date.now()}
},{collection:"blogpost"});

var blogModel = mongoose.model("blogPost",blogPostSchema);

// createBlog({
//     title: "Welcome",
//     body : "GoodBYE"
// });

// findAllBlogPosts()
//     .then(function (posts) {
//         console.log(posts);
//
//     });

function findAllBlogPosts() {
    return blogModel.find();
}

function findPostById(id) {
    return blogModel.findById(id);

}

function createBlog(blog) {
    return blogModel.create(blog);
}

function deleteBlogPost(id) {
    return blogModel.remove({_id: id});

}

deleteBlogPost("593b1187f2859537454dc73b")
    .then(function (status) {
        console.log(status);
        return findAllBlogPosts();
    })
    .then(function (doc) {
        console.log(doc);

    });
    // ,function (err) {
    //     console.log(err);


        // .then(function (doc) {
        //     console.log(doc);
        //
        // }, function (err) {
        //     console.log(err);
        //
        // });





