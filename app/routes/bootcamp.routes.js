const express = require('express')
const {
  createBootcamp,
  addUser,
  findBootcampById,
  findAllBootcamp
} = require('../controllers/bootcamp.controller')
const { verifyToken } = require('../middleware/index')

const router = express.Router()

router.post('/bootcamps', verifyToken, async (req, res) => {
  try {
    const user = await createBootcamp(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/bootcamps/adduser', verifyToken, async (req, res) => {
  try {
    const user = await addUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/bootcamps', async (req, res) => {
  try {
    const user = await findAllBootcamp(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/bootcamps/:id', verifyToken, async (req, res) => {
  try {
    const user = await findBootcampById(req.params.id, req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
