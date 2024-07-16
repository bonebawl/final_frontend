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

  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const handleSchedInput = (e) => {
    setSched(e.target.value);
  };

  const make = () => {
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
  return (
    <div className="z-20">
      <h1 className="m-2 text-3xl font-bold text-white font-outfit">
        Random Schedule Maker
      </h1>
      <p className="m-2 text-base font-semibold text-white font-outfit">
        Add tasks and determine how much hours/minutes you'll work on it
        everyday!
      </p>
      <div className="flex justify-center">
        <div>
          <input
            type="text"
            placeholder="Add a task"
            value={sched}
            onChange={handleSchedInput}
            className="px-2 py-1 mb-2 text-base rounded font-outfit w-44"
          ></input>
          <button
            className="bg-[#46497e] ml-2 px-3 py-1 rounded text-white font-outfit text-base"
            onClick={handleSched}
          >
            Add
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="HH:MM"
            pattern="^([01]\d|2[0-3]):([0-5]\d)$"
            onBlur={handleTimeBlur}
            onChange={handleTime}
            value={time}
            className="px-2 py-1 mx-2 text-base rounded font-outfit w-44"
          ></input>
          <select
            value={typaGuy}
            placeholder="Day"
            onChange={handleTypaGuy}
            className="px-2 py-1 mr-2 text-base rounded font-outfit"
          >
            <option value="night">Night</option>
            <option value="morning">Morning</option>
            <option value="noon">Noon</option>
            <option value="afternoon">Afternoon</option>
          </select>
        </div>
        <button
          onClick={make}
          className="bg-[#46497e] px-2 py-1 text-base rounded text-white font-outfit mb-2"
        >
          Generate Schedule
        </button>
      </div>
      {generatedSchedule && (
        <div className="bg-[#46497e] rounded-lg p-3">
          <h2 className="mb-2 text-xl font-semibold text-white font-outfit">
            Generated Schedule:
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {generatedSchedule.slice(0, 3).map(({ day, schedule }) => (
              <div
                key={day}
                className="p-3 bg-gray-800 border-4 border-white border-solid rounded font-outfit"
              >
                <h3 className="text-sm font-semibold text-white font-outfit">
                  {day}
                </h3>
                {schedule.map(({ task, start, end }, index) => (
                  <p key={index} className="text-xs text-white">
                    [{start} - {end}]: {task}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {generatedSchedule.slice(3).map(({ day, schedule }) => (
              <div
                key={day}
                className="p-4 bg-gray-800 border-4 border-white border-solid rounded font-outfit"
              >
                <h3 className="text-sm font-semibold text-white font-outfit">
                  {day}
                </h3>
                {schedule.map(({ task, start, end }, index) => (
                  <p key={index} className="text-xs text-gray-300">
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
