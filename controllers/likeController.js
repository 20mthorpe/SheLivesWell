
// const util = require('../utilities');
// const likeController = {}

// const likeModel = require('../models/likeModel');

// likeController.buildLikedPage = async function(req, res){
//     let nav = await util.getNav();
//     const user_id = req.user.id;
//     const liked_data = await likeModel.getLikedByUser();
//     const isLoggedIn = res.locals.loggedin;
//     const grid = util.buildMediaGrid(liked_data, isLoggedIn);
//     res.render('like/', { 
//         title: 'Liked',
//         nav,
//         errors: null,
//         grid,
//      });
// };

// likeController.processLike = async function(req, res){
//     let nav = await util.getNav();

//     // I think all these variables are invalid or undefined
//     const user_id = res.locals.user._id;
//     const media_id = req.body.media_id;
//     //const liked = req.body.liked;

//     const like = await likeModel.likeMedia(media_id, user_id);
//     if (like) {
//         req.flash("notice", "Like updated.")
//         return res.status(201).redirect('/like');
//     } else {
//         req.flash("error", "Like update failed.")
//         return res.status(501).redirect('/like');
//     }
// }

// likeController.processUnlike = async function(req, res){
//     let nav = await util.getNav();

//     // I think all these variables are invalid or undefined
//     //const user_id = res.locals.user._id;
//     //const media_id = req.body.media_id;
//     const liked = req.body.liked;

//     const unlike = await likeModel.unlikeMedia(liked._id);
//     if (unlike) {
//         req.flash("notice", "Like updated.")
//         return res.status(201).redirect('/like');
//     } else {
//         req.flash("error", "Like update failed.")
//         return res.status(501).redirect('/like');
//     }
// }


// module.exports = likeController