const jwt = require('jsonwebtoken')

const secretKey = 'MY_SECRET_KEY'

// Middleware function to authenticate JWT tokens
function authenticateMiddleware(req, res, next) {
  // Get the token from the request header, query parameter, or cookie
  const token = req.headers.authorization
  console.log(token)
  try {
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
      }
      req.user = decoded
      next()
    })
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' })
  }
}

module.exports = authenticateMiddleware
