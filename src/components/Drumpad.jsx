import React, { useEffect, useState } from "react";

export default function Drumpad(props) {
  const x = new Audio(props.soundsrc);
  // const y = new Audio("sounds/hi-hat-open.wav");
  console.log(x);

  const [isAnimate, setAnimate] = useState(false);
  // const [isPlaying, setPlaying] = useState(false);
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };


  function animate() {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 120);
  }
  function handleCLick() {
    handleToggle()
    x.loop = true;
    x.play();
    if (x.currentTime != 0) {
      x.pause();
      x.currentTime = 0;
    }

    //   x.currentTime = 0;
    //   animate();
    // } else if (x.paused) {
    //   x.loop = true;
    //   x.play();
    //   // x.currentTime = 0;
    //   animate();

    // }
  }

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [handleKeyDown]);

  // function handleKeyDown(event) {
  //   if (event.key === props.keybind && event.key === "J") {
  //     y.play();
  //     // y.currentTime = 0;
  //     animate();
  //   }
  //   if (event.key === props.keybind && event.key === "N") {
  //     y.load();
  //     x.play();
  //     x.currentTime = 0;
  //     animate();
  //   } else {
  //     if (
  //       event.key === props.keybind &&
  //       event.key !== "J" &&
  //       event.key !== "N"
  //     ) {
  //       x.play();
  //       x.currentTime = 0;
  //       animate();
  //     }
  //   }
  // }

  return (
    <div className="inline">
      {/* <p className="pad-letter">{props.keybind}</p> */}

      <button
        onClick={handleCLick}
        className={isActive ? "drumpad pressed" : "drumpad"}
      >
        <img
          id={props.name}
          className="drumpad-img"
          src={props.img}
          alt={props.alt}
        />
      </button>
      <h3>{props.name}</h3>
    </div>
  );
}
