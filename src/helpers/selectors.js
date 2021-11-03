// Returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      return state.days[i].appointments.map((appointment) => 
      {return state.appointments[appointment]
      })
    }
  }
  return [];
}


// Returns interviewers for that day
export function getInterviewersForDay(state, day) {
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      return state.days[i].interviewers.map((interviewer) => {
        return state.interviewers[interviewer];
      });
    }
  }

  return [];
}

// Returns an object that contains the interview data
// when we pass it an object that contains the interviewer
// null if no interview
export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewObj = { 
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  }
  return interviewObj;
}