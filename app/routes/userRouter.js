const express = require('express');
const router = express.Router();

//Import các hàm trong userController
const {
  createUser,
  getAllUser,
  getAllUserLimit,
  getAllUserSkip,
  getAllUserSortFullName,
  getAllUserSkipLimit,
  getAllUserSortLimitSkipFullName,
  getUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/userController');

router.post('/users', createUser);

router.get('/users', getAllUser);

router.get('/limit-users', getAllUserLimit);

router.get('/skip-users', getAllUserSkip);

router.get('/skip-limit-users', getAllUserSkipLimit);

router.get('/sort-skip-limit-users', getAllUserSortLimitSkipFullName);

router.get('/sort-users', getAllUserSortFullName);

router.get('/users/:userId', getUserById);

router.put('/users/:userId', updateUserById);

router.delete('/users/:userId', deleteUserById);

module.exports = router;
