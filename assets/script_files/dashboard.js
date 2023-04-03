//return the dates of current week
getCurrentWeak = function(){
    let curr = new Date;
    let week = [];
    for (let i = 0; i < 7; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }
    return week;
  }
  
  //create weekdays elements and append to the weekdays-container of each habit
  createWeekDays = function(){
    let curr = new Date 
    let today = curr.toString().substring(8,10);
    let week = getCurrentWeak();
    var d = new Date();  //creating the object of today's date
    var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var monthName = months[d.getMonth()];
    var dayNames = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  
    //fetching all habits weekdays container
    var habitsWeekdays = document.getElementsByClassName('weekdays-container');
  
    for(let j=0;j<habitsWeekdays.length;j++) //iterating on all habits elements
    {
      for(let i=0;i<7;i++){//iterating on all days of week
  
        //if the day is today then add specific styling
        if(week[i].substring(8,10) == today){
          let day = habitsWeekdays[j].getElementsByClassName(dayNames[i]);
          day[0].style.cssText = 'height:100%; width:20%; margin-top:0; box-shadow: 0px 0px 4px 1px #a99cbb';
          let dayName = day[0].getElementsByClassName('day-name');
          dayName[0].style.cssText = 'background:#b71c1c;font-size:1rem;'
          let dateElement = day[0].getElementsByClassName('date');
          dateElement[0].innerText = monthName + "," + week[i].substring(8,10);
          dateElement[0].style.cssText = 'font-size:0.9rem';
  
          //if status 'unfinished' is found
          try{
            let unFinishedElement = day[0].getElementsByClassName('unfinished');
            unFinishedElement[0].style.cssText = 'font-size:1.1rem;';
          }catch(err){
            if(err){
              console.log(err);
            }
          }
  
          //if status 'finished' is found
          try{
            let finishedElement = day[0].getElementsByClassName('finished');
            finishedElement[0].style.cssText = 'font-size:1.1rem;';
          }catch(err){
            if(err){
              console.log(err);
            }
          } 
        }
        else{ //if the day is other than today
          let day = habitsWeekdays[j].getElementsByClassName(dayNames[i]);
          let dateElement = day[0].getElementsByClassName('date');
          dateElement[0].innerText = monthName + "," + week[i].substring(8,10);
        }
      }
    }
  }
  
  //calling function to create weekdays
  createWeekDays();
  