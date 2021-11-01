
import React from "react";
import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';

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

  // To save new interview appointment
  // bookInterview function is imported from application component
  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer: interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    });
  };

  
  // Add confirmation dialog and only perform the deletion when the user confirms
  function confirmation() {
    transition(CONFIRM);
  };

  // Tp cancel interview appointment
  // cancelInterview function is imported from application component
  function cancel(id) {
    transition (DELETING)
    
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    });
  }

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirmation} onEdit={() => transition(EDIT)}/>)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back} onSave={save} />)}
      {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => transition(SHOW)} onSave={save} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message= 'Are you sure you would like to delete?' onCancel={() => back()} onConfirm={cancel} />}
    </article>
  )
}
