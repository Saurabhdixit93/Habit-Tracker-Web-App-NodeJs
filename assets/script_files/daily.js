
//return the dates of current week
getCurrentWeek = function(){
    let curr = new Date;
    let week = [];
    for (let i = 0; i < 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      console.log(first);
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    return week;
  }
  
  // create weekdays elements and append to the weekdays-container of each habit
  createWeekDays = function(){
    let curr = new Date 
    let today = curr.toString().substring(8,10);
    let week = getCurrentWeek();
    var d = new Date();  //creating the object of today's date
    var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var monthName = months[d.getMonth()];
    var dayNames = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

    //fetching all habits weekdays container
    var habitsWeekdays = document.getElementsByClassName('weekdays-container');

    for(let j = 0; j < habitsWeekdays.length; j++)
    {
      for(let i = 0; i < 7; i++){
          if(week[i].substring(8,10) == today){
              let day = habitsWeekdays[j].getElementsByClassName('today');
              // day[0].style.cssText = 'height:90%; box-shadow: 0px 0px 4px 1px #a99cbb';
              let dayName = day[0].getElementsByClassName('day-name');
              dayName[0].innerHTML = dayNames[i];
              dayName[0].style.cssText = 'background:#b71c1c;font-size:1rem;'
              let dateElement = day[0].getElementsByClassName('date');
              dateElement[0].innerText = monthName + "," + week[i].substring(8,10);
              dateElement[0].style.cssText = 'font-size:0.9rem';
          }
      }
    }
  }
  createWeekDays();
  