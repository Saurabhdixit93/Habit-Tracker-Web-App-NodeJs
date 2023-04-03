const User = require('../models/user');

// Returns a date in 'yyyy-MM-dd' format
formatDate = function(dateProperty) {
    const newDate = new Date(dateProperty);
    let formattedDate = `${ newDate.getFullYear() }-`;
        formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }-`;  // for double digit month
        formattedDate += `${ `0${ newDate.getDate() }`.slice(-2) }`;        // for double digit day
    return formattedDate;
}

//return the day-number of the week
today = function(){
    let curr = new Date 
    let currentDay = curr.toString().substring(0,3);
    let weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return weekdays.indexOf(currentDay);
}

//stores all the days of current week into week[] arrray 
getCurrentWeek = function(){
    let curr = new Date;
    var week = [];
    for (let i = 0; i < 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(day)
    }
    return week;
}

// This exports a function named "dashboard" as part of the module
module.exports.dashboard = async (req,res) =>{
    try{
    // Check if there is a user authenticated
    if(req.user){
    // Find the user by ID and populate the habits array with the latest created habits first
    let user = await User.findById(req.user.id).populate({path: 'habits', options: { sort: { 'createdAt': -1 } } });
    
        // Initialize an empty array to hold the status of each habit for the current week
        let habitsStatus = [];

        // Get an array of the days of the current week
        let week = getCurrentWeek();

        // Iterate through each habit in the user's habits array
        for(habit of user.habits){

            // Initialize a subarray with 'unmarked' for each day of the current week
            let subArr = ['unmarked','unmarked','unmarked','unmarked','unmarked','unmarked','unmarked'];

            // Iterate through each currentStatus object in the habit's currentStatus array
            for(let i=0;i<7;i++){
                for(let j=0;j<habit.currentStatus.length;j++){

                    // Format the date in the currentStatus object to match the format of the days of the current week
                    let formattedDate = formatDate(habit.currentStatus[j].date);

                    // If the formatted date matches the day of the current week, set the status for that day in the subarray
                    if(formattedDate == week[i]){
                        subArr[i] = habit.currentStatus[j].state; //subArr contains status of a day of particular habit
                        break;
                    }
                }
            }
            // Push the subarray of habit status for the current week to the habitsStatus array
            habitsStatus.push(subArr);
        }

        // Render the dashboard page with the user's habits, the status of each habit for the current week, the days of the current week, and a null message
        return res.render('dashboardmain',{
            title: 'Dashboard page | Habit Tracker',
            habits: user.habits,
            status: habitsStatus, 
            week: week,
            message: { type:null, text: null }
        });
    }
    }catch(err){
        // If there is an error, render the dashboard page with a danger message containing the error message
        return res.render('dashboardmain',{
            title: 'Dashboard page | Habit Tracker',
            message: { type: 'danger', text: err.message }
        });
    }
    
};

// This exports a function named "daily" as part of the module
module.exports.daily = async (req,res) =>{
    try{
    // Check if there is a user authenticated
    if(req.user){
    // Find the user by ID and populate the habits array with the latest created habits first
    let user = await User.findById(req.user.id).populate({path: 'habits', options: { sort: { 'createdAt': -1 } } });
    
        // Initialize an empty array to hold the status of each habit for the current week
        let habitsStatus = [];

        // Get an array of the days of the current week
        let week = getCurrentWeek();

        // Iterate through each habit in the user's habits array
        for(habit of user.habits){

            // Initialize a subarray with 'unmarked' for each day of the current week
            let subArr = ['unmarked','unmarked','unmarked','unmarked','unmarked','unmarked','unmarked'];

            // Iterate through each currentStatus object in the habit's currentStatus array
            for(let i=0;i<7;i++){
                for(let j=0;j<habit.currentStatus.length;j++){

                    // Format the date in the currentStatus object to match the format of the days of the current week
                    let formattedDate = formatDate(habit.currentStatus[j].date);

                    // If the formatted date matches the day of the current week, set the status for that day in the subarray
                    if(formattedDate == week[i]){
                        subArr[i] = habit.currentStatus[j].state; //subArr contains status of a day of particular habit
                        break;
                    }
                }
            }
            // Push the subarray of habit status for the current week to the habitsStatus array
            habitsStatus.push(subArr);
        }
        // Render the daily habits page with the user's habits, the status of each habit for the current week, the days of the current week, the current day number, and a null message
        return res.render('daily',{
            title: 'Daily Habits page | Habit Tracker',
            habits: user.habits,
            status: habitsStatus,
            week: week,
            dayNumber: today(),
            message: { type:null, text: null }
        });
    }
    }catch(err){
    
        // If there is an error, render the daily habits page with a danger message containing the error message
        return res.render('daily',{
            title: 'Daily Habits page | Habit Tracker',
            message: { type: 'danger', text: err.message }
        });
    }
}
