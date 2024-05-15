const auth  = require('../middleware/auth.js')
const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController');

router.get('/user', auth, userController.getUser);
router.post('/user', userController.create);
router.get('/user/:id', auth, userController.details);
router.post('/login', userController.login);
router.put('/user/update/:id', auth, userController.update)
router.delete('/user/delete/:id', auth, userController.delete)

module.exports = router;
