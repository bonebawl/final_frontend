import React, { useState, useEffect } from "react";
import generateSchedule from "../js_files/sched_maker.js";

function Sched_template() {
  const [sched, setSched] = useState("");
  const [schedList, setSchedList] = useState([]);
  const [time, setTime] = useState("");
  const [typaGuy, setTypaGuy] = useState("Night");
  const [generatedSchedule, setGeneratedSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem("generatedSchedule");
    return savedSchedule ? JSON.parse(savedSchedule) : null;
  });
  const [first, setFirst] = useState(true);

  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const handleSchedInput = (e) => {
    setSched(e.target.value);
  };

  const make = () => {
    setFirst(false);
    if (schedList.length > 0 && time && typaGuy) {
      const newSchedule = generateSchedule(schedList, time, typaGuy);
      setGeneratedSchedule(newSchedule);
    } else {
      alert(
        "Please add tasks, set time, and select a time of day before generating the schedule.",
      );
    }
  };
  useEffect(() => {
    if (generatedSchedule) {
      localStorage.setItem(
        "generatedSchedule",
        JSON.stringify(generatedSchedule),
      );
    }
  }, [generatedSchedule]);
  const handleTypaGuy = (e) => {
    setTypaGuy(e.target.value);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleSched = () => {
    if (sched.trim()) {
      setSchedList([...schedList, sched.trim()]);
      setSched("");
    }
  };
  const handleTimeBlur = () => {
    if (!time.match(timePattern)) {
      setTime("00:00");
    }
  };
  return(
    <div className="z-20">
        <h1 className="text-3xl font-bold font-outfit m-2 text-white">Random Schedule Maker</h1>
        {first && (
          <p className='text-base font-semibold font-outfit m-2 text-white'>Add tasks and determine how much hours/minutes you'll work on it everyday!</p>
        )}
        
        <div className='justify-center flex'>
            <div>
            <input
                type='text'
                placeholder='Add a task'
                value = {sched}
                onChange={handleSchedInput}
                className = "mb-2 rounded px-2 py-1 text-base font-outfit w-44"
                ></input>
                <button className="bg-[#46497e] ml-2 px-3 py-1 rounded text-white font-outfit text-base" onClick={handleSched}>Add</button>
            </div>
            <div>
            <input
                type='text'
                placeholder = "HH:MM"
                pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                onBlur={handleTimeBlur}
                onChange = {handleTime}
                value = {time}
                className = "mx-2 rounded px-2 py-1 text-base font-outfit w-44"
                >
                </input>
            <select value={typaGuy} placeholder="Day" onChange={handleTypaGuy} className = "mr-2 rounded px-2 py-1 text-base font-outfit">
                <option value="night">Night</option>
                <option value="morning">Morning</option>
                <option value="noon">Noon</option>
                <option value="afternoon">Afternoon</option>
            </select>
            </div>
            <button onClick={make} className="bg-[#46497e] px-2 py-1 text-base rounded text-white font-outfit mb-2">Generate Schedule</button>
        </div>
        {generatedSchedule && (
           <div className="bg-[#46497e] rounded-lg p-3">
<h2 className="text-xl text-white font-semibold mb-2 font-outfit">Generated Schedule:</h2>
<div className="grid grid-cols-3 gap-4 mb-4">
    {generatedSchedule.slice(0, 3).map(({ day, schedule }) => (
        <div key={day} className="bg-gray-800 p-3 rounded border-solid border-white border-4 font-outfit">
            <h3 className="font-semibold font-outfit text-white text-sm">{day}</h3>
            {schedule.map(({ task, start, end }, index) => (
                <p key={index} className="text-white text-xs">
                    [{start} - {end}]: {task}
                </p>
            ))}
        </div>
    ))}
</div>
<div className="grid grid-cols-4 gap-4">
    {generatedSchedule.slice(3).map(({ day, schedule }) => (
        <div key={day} className="bg-gray-800 p-4 rounded border-solid border-white border-4 font-outfit">
            <h3 className="font-semibold text-white text-sm font-outfit">{day}</h3>
            {schedule.map(({ task, start, end }, index) => (
                <p key={index} className="text-gray-300 text-xs">
                    [{start} - {end}]: {task}
                </p>
            ))}
        </div>
    ))}
</div>
</div>
         )}
    </div>
);

}


export default Sched_template;