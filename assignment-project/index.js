const express = require('express')
const app = express()
const authenticateMiddleware = require('./middleware')
const User = require('./usermodel')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const secretKey = 'MY_SECRET_KEY'

app.use(bodyParser.json())

app.post('/insert', async (req, res) => {
  const { user_name, user_email, user_password, user_image, total_orders } =
    req.body
  try {
    const newUser = await User.create({
      user_name,
      user_email,
      user_password,
      user_image,
      total_orders,
    })
    newUser.save()
    return res.json({ message: 'User inserted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

app.get('/details/:user_id', async (req, res) => {
  const user_id = req.params.user_id
  try {
    const user = await User.findByPk(user_id)
    if (user) {
      return res.json({ user_details: user })
    }
    return res.status(404).json({ message: 'User not found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

app.put('/update/:user_id', async (req, res) => {
  const userId = req.params.user_id
  const { user_name, user_email, user_password } = req.body
  try {
    const user = await User.findByPk(userId)
    if (user) {
      // Update user details
      const updateDetails = {
        user_name: user_name,
        user_email: user_email,
        user_password: user_password,
      }
      // Save the updated user
      const result = await user.update(updateDetails)
      if (result) {
        return res.json({ message: 'Details updated successfully' })
      }
    }

    return res.status(404).json({ message: 'User not found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

app.get('/image/:user_id', async (req, res) => {
  const user_id = req.params.user_id
  try {
    const user = await User.findByPk(user_id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const user_image = user.user_image
    return res.json({ user_image })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

app.delete('/delete/:user_id', async (req, res) => {
  const user_id = req.params.user_id
  try {
    // Delete the user using Sequelize
    const user = await User.findByPk(user_id)
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    await user.destroy()
    return res.json({ message: 'User deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

app.listen(3004, () => console.log('Server running...'))
