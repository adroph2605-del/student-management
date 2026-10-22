// 404 — route haipo
exports.notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

// Global error handler
exports.errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && Object.hasOwn(err, 'body')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request body',
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  // Duplicate key (unique email, studentCode, n.k.)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return res.status(400).json({
      success: false,
      message: `Duplicate value for ${field}`,
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error',
  });
};