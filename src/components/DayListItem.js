import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props){
  const formatSpots = function() {
    switch (props.spots) {
      case 0: return "no spots";
      case 1: return "1 spot";
      default: return `${props.spots} spots`                                              
    };
  };

  // Assign class based on props
  const dayClass =  classNames({
    dayClass: true,
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0, // spots 0 means full
 });

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)} 
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)} remaining</h3>
    </li>
  );
};