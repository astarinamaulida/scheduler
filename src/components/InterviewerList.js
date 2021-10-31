import React from "react";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  // To keep the selected interviewer still being selected
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
      );
    });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}