// require models
const Habit = require('../models/habbits');
const User = require('../models/user');

//conroller to create new habit
module.exports.create = async (req,res) =>{
  try{
    if(req.user){
        let newHabit = await Habit.create({content: req.body.habit});
        let user = await  User.findById(req.user.id);   
        user.habits.push(newHabit);
        user.save();
        req.flash('success','Your Habit Created Successfully');
        return res.redirect('back');
    }else{
        req.flash('error' , "INTERNAL SEVER ERROR .");
        return;
    }
  }catch(error){
    req.flash('error','ERROR IN:' + error.message);
    return res.redirect('back');
  }
};

//controller to make the status of the day as finished
module.exports.done =async (req,res) =>{
   try{
    if(req.user){
        let habitId = req.query.habitId;
        let date = req.query.date;

        let habit = await Habit.findById(habitId);
        habit.currentStatus.push({date: date,state:'finished'});
        habit.save();
        req.flash('success','Your Habit Finished');
        return res.redirect('back');
    }else{
        req.flash('error' , "INTERNAL SEVER ERROR .");
        return;
    }
   }catch(error){
        req.flash('error','ERROR IN:' + error.message);
        return res.redirect('back');
   }
};

//controller to make the status of the day as not finished
module.exports.undone = async (req,res) =>{
    try{
        if(req.user){
            let habitId = req.query.habitId;
            let date = req.query.date;
    
            let habit = await Habit.findById(habitId);
            habit.currentStatus.push({date: date, state:'unfinished'});
            habit.save();
            req.flash('success','Your Habit not finsished');
            return res.redirect('back');
        }else{
            req.flash('error' , "INTERNAL SEVER ERROR .");
            return;
        }
    }catch(error){
        req.flash('error','ERROR IN:' + error.message);
        return res.redirect('back');
    }
};

//controller to delete the habit
module.exports.delete = async (req,res) =>{
   try{
    if(req.user){
        let user = await User.findById(req.user._id);
        let habitIndex = user.habits.indexOf(req.query.habitId);
        user.habits.splice(habitIndex, 1);
        user.save();

        let habit = await Habit.findByIdAndDelete(req.query.habitId);
        req.flash('success','Your Habit Deleted Successfully');
        return res.redirect('back');
    }else{
        req.flash('error' , "INTERNAL SEVER ERROR .");
        return;
    }
    }catch(error){
        req.flash('error','ERROR IN:' + error.message);
        return res.redirect('back');
    }
};

//controller to add the habit as a favourite
module.exports.addFavourite = async (req,res) =>{
   try{
    if(req.user){
        let habit = await Habit.findById(req.query.habitId);
        habit.favourite = true;
        habit.save();
        req.flash('success','Your Habit added as favourite');
        return res.redirect('back');
    }else{
        req.flash('error' , "INTERNAL SEVER ERROR .");
        return;
    }
    }catch(error){
        req.flash('error','ERROR IN:' + error.message);
        return res.redirect('back');
    }
};

//controller to remove the habit from favourite
module.exports.removeFavourite = async (req,res) =>{
    try{
        if(req.user){
            let habit = await Habit.findById(req.query.habitId); 
            habit.favourite = false;
            habit.save();
            req.flash('success','Your Habit removed from favourite');
            return res.redirect('back');
        }else{
            req.flash('error' , "INTERNAL SEVER ERROR .");
            return;
        }

    }catch(error){
        req.flash('error','ERROR IN:' + error.message);
        return res.redirect('back');
    }
}