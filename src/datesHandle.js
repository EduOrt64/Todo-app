


import { format, differenceInDays  } from 'date-fns';


 const today = new Date ();



const todayFormat = format(today, 'yyyy/MM/dd/eeee')


const dueDate = new Date('2025-07-05');
const dueDateFormat = format(dueDate, 'yyyy/MM/dd/eeee');

const timeLeftToComplete = differenceInDays(dueDate, today);
console.log(timeLeftToComplete);

import { isSameDay, parseISO } from "date-fns";



export function todayList(object) {
    const today = new Date();
  
     const newObject = object.flatMap(project =>
      project.tasks.filter(task => {
        const dueDate = parseISO(task.dueDate);
        return isSameDay(today, dueDate);
      })
    );
  
    console.log("Tasks due today:", newObject);
    return newObject;
  }



  