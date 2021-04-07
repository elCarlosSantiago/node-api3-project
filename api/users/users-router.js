const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const {
  validatePost,
  validateUserId,
  validateUser,
  errorHandler,
} = require('./../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const allUsers = await Users.get();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  try {
    const userId = await Users.getById(id);
    res.status(200).json(userId);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const user = req.body;
  try {
    const newUser = await Users.insert(user);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateUser, validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  const changes = req.body;
  try {
    const updatedUser = await Users.update(id, changes);
    res.status(200).json({ message: 'Changes were made', count: updatedUser });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  try {
    const deletedUser = await Users.remove(id);
    res
      .status(200)
      .json({ message: 'User deleted successfully', count: deletedUser });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  try {
    const userPosts = await Users.getUserPosts(id);
    res.status(200).json(userPosts);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/:id/posts',
  validateUserId,
  validatePost,
  async (req, res, next) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const { id } = req.params;
    const { text } = req.body;
    const newPostObj = {
      user_id: id,
      text: text,
    };
    try {
      const newPost = await Posts.insert(newPostObj);
      res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

router.use(errorHandler);

// do not forget to export the router

module.exports = router;
