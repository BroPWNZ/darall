import express = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/position')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/category/:id', controller.getByCategoryId)
router.get('/:id', controller.getById)
router.post('/',upload.array('imageSrc',1), controller.create)
router.patch('/:id', controller.update)
router.delete('/:id',  controller.remove)


module.exports = router