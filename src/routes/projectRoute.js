const auth  = require('../middleware/auth.js')

const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController');

router.get('/project', auth, projectController.getProject);
router.post('/project', auth, projectController.create);
router.post('/project/:id', auth, projectController.details);
router.put('/project/update/:id', auth, projectController.update)
router.delete('/project/delete/:id', auth, projectController.delete)

module.exports = router;