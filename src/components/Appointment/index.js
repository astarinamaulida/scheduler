
import React from "react";
import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "RROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"; 

  // To save new interview appointment
  // bookInterview function is imported from application component
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  };

  
  // Add confirmation dialog and only perform the deletion when the user confirms
  function confirmation() {
    transition(CONFIRM);
  };

  // Tp cancel interview appointment
  // cancelInterview function is imported from application component
  function cancel(id) {
    transition (DELETING, true)

    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  };

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirmation} onEdit={() => transition(EDIT)}/>)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back} onSave={save} />)}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message= 'Are you sure you would like to delete?' onCancel={() => back()} onConfirm={cancel} />}
      {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="Error saving appointment" onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message= 'Error deleting appointment' onClose={() => back()}/>}
    </article>
  );
};
