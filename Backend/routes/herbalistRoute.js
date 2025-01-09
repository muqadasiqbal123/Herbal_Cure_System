import express from 'express'
import { herbalistList } from '../controllers/herbalistController.js'

const herbalistRouter = express.Router()

// Create Endpoint to get all herbalist list
herbalistRouter.get('/list', herbalistList)

export default herbalistRouter