import React, { useEffect, useState } from "react";
import Drumpad2 from "./Drumpad2";
import drumsetdata from "../drumsetdata";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Drumset() {
  // data
  const [pads, setPads] = useState(drumsetdata.map(d => { return { ...d, audioObj: new Audio(d.soundURL) } }));
  const [idToChange, setIdToChange] = useState('');
  const [activePads, setActivePads] = useState([]);
  const [padsActive, setPadsActive] = useState(false);

  // toggle active per pad in pads array 
  useEffect(() => {
    const index = pads.findIndex(pad => pad.id === idToChange);
    if (index !== -1) {
      let temp = [...pads];
      temp[index].isActive = !temp[index].isActive;
      setPads(temp);
      setIdToChange('');
    }
  }, [idToChange]);


  // after active-toggle, pushes active pad from pads array to activePads array, update padsActive boolean accordingly.
  useEffect(() => {
    pads.some(pad => pad.isActive) ? setPadsActive(true) : setPadsActive(false);
    setActivePads(pads.filter(pad => pad.isActive && pad));
  }, [pads]);

  // e=for every change in activePads array
  //stopping all non active pads in pads array
  //
  useEffect(() => {
    pads.forEach(pad => (!pad.isActive) && stopPad(pad.audioObj));

    if (padsActive) {
      let first;
      if (activePads.length === 1) {
        first = activePads[0]
        playPad(first.audioObj) // playing first pad in active pads
        //when ended, play all active pads in pads array
        first.audioObj.addEventListener('ended', () => {
          console.log("ended");
          pads.forEach(pad => {
            if (pad.isActive) {
              playPad(pad.audioObj);
            }
          })
        }, false);
      }
      // console.log(first);
      if (!first?.isActive) {
        pads.find(pad => pad.isActive).audioObj.addEventListener('ended', () => {
          // console.log("ended");
          pads.forEach(pad => {
            if (pad.isActive) {
              playPad(pad.audioObj);
            }
          })
        }, false);
      }

    } else {
      stopAll();
    }

  }, [activePads])


  const playActive = () => {
    pads.forEach(pad => (!pad.isActive) && stopPad(pad.audioObj));

    activePads.forEach(pad => {
      if (pad.isActive) {
        // pad.audioObj.loop = true;
        pad.audioObj.play();
        pad.audioObj.addEventListener('ended', () => {
          playPad(pad.audioObj);

        }, false);
      };
    })
  }

  const stopAll = () => {
    pads.forEach(pad => {
      pad.audioObj.pause();
      pad.audioObj.currentTime = 0;
    })
  }

  const stopPad = (objAud) => {
    objAud.pause();
    objAud.currentTime = 0;

  }

  const playPad = (objAud) => {
    objAud.play();
  }

  return (
    <div>
      <div className="drums">
        {pads.map((d, i) => (
          <Drumpad2
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
        <div className="ctrlBtn" onClick={stopAll}>
          <FontAwesomeIcon className="icon" icon={faStop} />
          Stop
        </div>


      </div>
    </div>
  );
}
