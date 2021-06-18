const { db } = require('../util/admin');

//Getting all the posts exist 
//Mainly to be displayed at the Feed 
exports.getAllPosts = (req, res)=> {
  db.collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
        let posts = [];
        data.forEach((doc) => {
            posts.push({
                postId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt,
                commentCount: doc.data().commentCount,
                likeCount: doc.data().likeCount,
                userImage: doc.data().userImage,
                comments: doc.data().comments
        });
    });
        return res.json(posts);
    })
    .catch((err) => console.error(err));
}

exports.getComments = (req, res) => {
    db.collection('comments')
      .get()
      .then((data) => {
          let comments = [];
          data.forEach((doc) => {
              comments.push(doc.data())
          });
          return res.json(comments);
        })
}

//For a post
exports.singlePost = (req, res)=> {
    if(req.body.body.trim() === ''){
        return res.status(400).json({body: 'Body is empty. Please fill it'});
    }

    const newPost = {
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
        comments: [],
    };

  db.collection('posts')
    .add(newPost)
    .then((doc) => {
        const resPost = newPost;
        resPost.postId = doc.id;
        //res.json function = content-type header to application/JSON so that client
        //treats the response string as a valid JSON object
        res.json(resPost);
    })
    .catch((err) => {
        res.status(500).json({ error: 'Something is not right bruh'});
        console.error(err);
    });
};

//Getting the information about a single post
exports.getPost = (req, res) => {
    let postData = {};
    db.doc(`/posts/${req.params.postId}`)
      .get()
      .then((doc) => {
          if(!doc.exists){
              return res.status(404).json({ error: 'Sorry. Cant find the post youre looking for'});
          }
          postData = doc.data();
          postData.postId = doc.id;
          return db.collection('comments')
                   .where('postId', '==', req.params.postId)
                   .get();
         })
        .then((data) => {
            postData.comments = [];
            data.forEach((doc) => {
            postData.comments.push(doc.data());
        });
          return res.json(postData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
};

//Comment on a Post
exports.commentPost = (req, res) => {
    if(req.body.body.trim() === ''){
        return res.status(404).json({comment: 'Must not empty'});
    }

    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        postId: req.params.postId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl
    };

    db.doc(`/posts/${req.params.postId}`)
      .get()
      .then((doc) => {
          if(!doc.exists){
              return res.status(404).json({error: 'Cannot find the post'});
          }
          return doc.ref.update({ commentCount: doc.data().commentCount + 1});
      })
      .then(()=>{
          return db.collection('comments').add(newComment);
      })
      .then(()=>{
          res.json(newComment);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({error: 'Something went wrong'});
      })
};

//Mantap betol post!
exports.likePost = (req, res) => {
    const likeDocument = db.collection('likes')
                           .where('userHandle','==', req.user.handle)
                           .where('postId', '==', req.params.postId)
                           .limit(1);

    const postDocument = db.doc(`/posts/${req.params.postId}`);

    let postData;

    postDocument
         .get()
         .then(doc => {
            if(doc.exists){
                postData = doc.data();
                postData.postId = doc.id;
                return likeDocument.get();
            } else{
                return res.status(404).json({error: 'Post not found'});
            }
        })
        .then(data=> {
            if(data.empty){
                return db.collection('likes').add({
                    postId: req.params.postId,
                    userHandle: req.user.handle
                })
                .then(()=> {
                    postData.likeCount++
                    return postDocument.update({ likeCount: postData.likeCount })
                })
                .then(()=>{
                    return res.json(postData);
                })
            } else{
                return res.status(400).json({error: 'Post already liked'});
            }
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json({error: err.code});
        });
};


//Unlike a post
exports.unlikePost = (req,res) => {
    const likeDocument = db
                           .collection('likes')
                           .where('userHandle','==', req.user.handle)
                           .where('postId', '==', req.params.postId)
                           .limit(1);

    const postDocument = db.doc(`/posts/${req.params.postId}`);

    let postData;

    postDocument
        .get()
        .then(doc => {
            if(doc.exists){
                postData = doc.data();
                postData.postId = doc.id;
                return likeDocument.get();
            } else{
                return res.status(404).json({error: 'Post not found'});
            }
        })
        .then(data=> {
            if(data.empty){
                return res.status(400).json({error: 'Post is not liked'});
            } else{
                return db
                .doc(`/likes/${data.docs[0].id}`)
                .delete()
                .then(()=>{
                    postData.likeCount--;
                    return postDocument.update({ likeCount: postData.likeCount});
                })
                .then(()=>{
                    res.json(postData);
                })
            }
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json({error: err.code});
        });
}

//Delete Post
exports.deletePost = (req,res) => {
    const document= db.doc(`/posts/${req.params.postId}`);
    document.get()
        .then(doc=>{
            if(!doc.exists){
                return res.status(404).json( {error: 'Post not found'});
            }
            if(doc.data().userHandle !== req.user.handle){
                return res.status(403).json({error: 'Unauthorized'});
            } else{
                return document.delete();
            }
        })
        .then(()=>{
            res.json({message: 'Post deleted successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
};

