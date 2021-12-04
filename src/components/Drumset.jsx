import React, { useEffect, useState } from "react";
import Drumpad from "./Drumpad";
import Drumpad2 from "./Drumpad2";
import drumsetdata from "../drumsetdata";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Drumset() {
  const [pads, setPads] = useState(drumsetdata.map(d => { return { ...d, audioObj: new Audio(d.soundURL) } }));
  const [idToChange, setIdToChange] = useState('');
  const [prevPad, setPrevPad] = useState({});


  useEffect(() => {
    const index = pads.findIndex(pad => pad.id === idToChange);
    if (index !== -1) {
      let temp = [...pads];
      temp[index].isActive = !temp[index].isActive;
      setPrevPad(temp[index]);
      setPads(temp);
      setIdToChange('');
    }
  }, [idToChange]);




  const stop = () => {
    pads.forEach(pad => {
      pad.audioObj.pause();
      pad.audioObj.currentTime = 0;
    })

  }

  const playActive = () => {

    pads.forEach(pad => {
      if (pad.isActive) {
        // pad.audioObj.loop = true;
        pad.audioObj.currentTime = 0;
        pad.audioObj.play();
        pad.audioObj.addEventListener('ended', () => {
          pad.audioObj.currentTime = 0;
          pad.audioObj.play();
        }, false)
      }
    })
  }

  const play = () => {
    let remainingTime = 0;
    pads.forEach(pad => {
      if (pad.isActive) {
        let cache = { ...prevPad };
        if (cache.audioObj.currentTime > 0) {
          remainingTime = cache.audioObj.currentTime;
          console.log(pad.id, remainingTime);
          pad.audioObj.currentTime = remainingTime;
        }
        /////////////NEED TO ADD SUSPENSION OF 2 BARS (4SEC) - CURRENT AUDIO TIME
        // var sus = setTimeout(() => {
        // pad.audioObj.loop = true;
        console.log(pad.audioObj.currentTime, remainingTime);
        pad.audioObj.play();
        // }, (4000 - remainingTime));
        pad.audioObj.addEventListener('ended', () => {
          // clearTimeout(sus);
          pad.audioObj.currentTime = 0;
          pad.audioObj.play();
        }, false);
      } else {
        // clearTimeout(sus);
        pad.audioObj.pause();
        pad.audioObj.currentTime = 0;
      }
    })
  }



  return (
    <div>
      <div className="drums">
        {pads.map((d, i) => (
          <Drumpad2
            onClick={play()}
            i={i}
            pads={[...pads]}
            pad={d}
            key={d.key}
            toggleActive={padId => setIdToChange(padId)}
          />
        ))}
      </div>
      <div className="controller">
        <div className="ctrlBtn" onClick={playActive} >
          <FontAwesomeIcon className="icon" icon={faPlay} />
          Play
        </div>
        <div className="ctrlBtn" onClick={stop}>
          <FontAwesomeIcon className="icon" icon={faStop} />
          Stop
        </div>


      </div>
    </div>
  );
}
