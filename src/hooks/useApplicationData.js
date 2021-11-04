import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // Getting data days, appointments and interviewers from API axios
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(response => {
      setState(prev => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    });
  }, []);

  // Book new interview appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Update the days to increase interview spots when the interview being canceled/deleted
    let days = state.days
    if (!state.appointments[id].interview) {
      days = state.days.map((day) => {
        const updatedDay = { ...day };
        if (updatedDay.appointments.includes(id)) {
          updatedDay.spots--;
          return updatedDay
        } else {
          return updatedDay
        };
      });
    };

    // PUT request to the endpoint to update the database with interview data
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  };

  // Cancel interview appointment
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Update the days to increase interview spots when the interview being canceled/deleted
    const days = state.days.map((day) => {
      const updatedDay = { ...day };
      if (updatedDay.appointments.includes(id)) {
        updatedDay.spots++;
        return updatedDay
      } else {
        return updatedDay
      };
    });

    // DELETE reguest to the endpoint to delete the interview data
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((es) => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  };
  return { state, setDay, bookInterview, cancelInterview }
};