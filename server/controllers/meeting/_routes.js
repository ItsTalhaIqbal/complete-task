const express = require('express');

const router = express.Router();


const meetingController = require('./meeting');

router.post('/', meetingController.add);
router.get('/', meetingController.index);
router.get('/:id', meetingController.view);
router.delete('/:id', meetingController.deleteData);
router.post('/deleteMany', meetingController.deleteMany);

module.exports = router;
