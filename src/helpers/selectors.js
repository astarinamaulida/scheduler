import InterviewerList from "components/InterviewerList";

// Returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  let result = [];
  const allowed = state.days.filter(eachDay => eachDay.name === day);

  for (let i of allowed) {
    for (let j = 0; j < i.appointments.length; j++) {
      let vv = i.appointments[j];
      if (state.appointments[vv]) {
        result.push(state.appointments[vv]);
      }
    }
  }
  console.log("result: ", result);
  return result;
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