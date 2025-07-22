export default (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        details: err.errors.map(e => e.message),
      });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    res.status(500).json({ message: 'Something went wrong' });
  };