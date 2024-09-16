const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(
    `Request Method: ${req.method}, Request URL: ${
      req.url
    } Time Stamp: ${new Date().toISOString()}`
  );
  next();
}

const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (!user) {
      res.status(404).json({ message: `user not found` });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({
      message: 'missing required name field',
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({
      message: 'missing required text field',
    });
  } else {
    next();
  }
}

//eslint-disable-next-line
function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
    custom: 'Princess is in another castle.',
  });
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost,
  errorHandler,
};
