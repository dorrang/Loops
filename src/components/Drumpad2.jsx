import React, { useEffect, useState } from "react";

export default function Drumpad(props) {

  return (
    <div className="inline">

      <button
        onClick={() => props.toggleActive(props.pad.id)}
        className={props.pads[props.i].isActive ? "drumpad pressed" : "drumpad"}
      >
        <img
          id={props.pad.name}
          className="drumpad-img"
          src={props.pad.imgURL}
          alt={props.pad.alt}
        />
      </button>
      {/* <h3>{props.pad.name}</h3> */}
    </div>
  );
}
