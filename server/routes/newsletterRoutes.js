const express = require('express');
const router = express.Router();
const {
  getSubscribers,
  subscribe,
  deleteSubscriber
} = require('../controllers/newsletterController');

router.route('/')
  .get(getSubscribers)
  .post(subscribe);

router.route('/:id')
  .delete(deleteSubscriber);

module.exports = router;
