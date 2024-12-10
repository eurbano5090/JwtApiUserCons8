const express = require('express')
const {
  createUser,
  findUserById,
  findAllUser,
  updateUserById,
  findByEmail,
  deleteUserById
} = require('../controllers/user.controller')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY, verifyToken, encryptPassword, verifyEmail } = require('../middleware/index')

const router = express.Router()

router.post('/signin', async (req, res) => {
  try {
    const user = await findByEmail({ where: { email: req.body.email } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, { 
      expiresIn: '1h'
    })
    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error })
  }
})

router.post('/user/signup', verifyEmail, encryptPassword, async (req, res) => {
  try {
    const user = await createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await findAllUser()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/users/:id', verifyToken, async (req, res) => {
  try {
    const user = await findUserById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/users/:id', verifyToken, async (req, res) => {
  try {
    await updateUserById(req.params.id, req.body)
    res.status(200).json({ message: 'Usuario actualizado con éxito' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/users/:id', verifyToken, async (req, res) => {
  try {
    await deleteUserById(req.params.id, req.body)
    res.status(200).json({ message: 'Usuario eliminado con éxito' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
