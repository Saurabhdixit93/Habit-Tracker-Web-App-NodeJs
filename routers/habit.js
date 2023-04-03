const express = require('express');

const router = express.Router();

const habitController = require('../controllers/habit_Controller');

router.post('/create',habitController.create); //for creating new habit
router.get('/done',habitController.done);      //to mark the status as completed
router.get('/undone',habitController.undone);  //to mark the status as not completed
router.get('/delete',habitController.delete);  //to delete a particular habit

router.get('/favourite/add',habitController.addFavourite);       //to add a habit as favourite
router.get('/favourite/remove',habitController.removeFavourite); //to remove the habit from favourite

module.exports = router;