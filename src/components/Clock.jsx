import React, { useState, useEffect } from "react";
function Clawk_timer() {
  const [inputString, setInputString] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("todoList");
    return savedList ? JSON.parse(savedList) : [];
  });
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todoList"));
    if (savedList) {
      setList(savedList);
    }

    const timerID = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
      removePastItems();
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const handleAdd = () => {
    const currentTime = new Date();
    const [inputHours, inputMinutes] = inputTime.split(":");
    const taskTime = new Date();
    taskTime.setHours(inputHours, inputMinutes, 0, 0);

    if (
      taskTime < currentTime ||
      !inputTime.match(/^([01]\d|2[0-3]):([0-5]\d)$/)
    ) {
      setInputTime("00:00");
    } else {
      if (inputString.trim()) {
        setList([...list, { text: inputString.trim(), time: inputTime }]);
        setInputString("");
        setInputTime("");
      }
    }
  };
  const handleInputString = (e) => {
    setInputString(e.target.value);
  };
  const handleRemove = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleInputTime = (e) => {
    let value = e.target.value;
    if (value.length === 1 && parseInt(value, 10) <= 2) {
      setInputTime(value);
    } else if (value.length === 2 && !value.includes(":")) {
      if (parseInt(value, 10) <= 23) {
        setInputTime(value + ":");
      }
    } else {
      setInputTime(value);
    }
  };

  const removePastItems = () => {
    const currentTime = new Date();
    setList((prevList) =>
      prevList.filter(({ time }) => {
        const [taskHours, taskMinutes] = time.split(":");
        const taskTime = new Date();
        taskTime.setHours(taskHours, taskMinutes, 0, 0);
        if (taskTime < currentTime) {
          alert("TIMER! TIMER! TIMER! TIMER! TIMER!!!");
          return false;
        }
        return true;
      }),
    );
  };

  return (
    <div className="App">
      <h1 className="mt-2 mb-2 text-2xl font-bold text-white font-outfit">
        To-Do List
      </h1>
      <p className="m-2 text-base font-semibold text-white font-outfit">
        This to-do list utilizes the 24-hour time format.
      </p>
      <div className="todo">
        <input
          type="text"
          value={inputString}
          onChange={handleInputString}
          placeholder="Add a new task"
          className="px-2 py-1 mr-2 text-base rounded font-outfit w-44"
        />
        <input
          type="text"
          value={inputTime}
          onChange={handleInputTime}
          placeholder="HH:MM"
          className="px-2 py-1 mr-2 text-base rounded font-outfit w-44"
        />
        <button
          onClick={handleAdd}
          className="bg-[#46497e] mt-2 px-3 py-1 rounded text-white font-outfit text-base"
        >
          Add to List
        </button>
        <ul className="p-0 list-none">
          {list
            .sort((a, b) => {
              const timeA = new Date(`1970-01-01T${a.time}`);
              const timeB = new Date(`1970-01-01T${b.time}`);
              return timeA - timeB;
            })
            .map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between my-2 text-white font-outfit"
              >
                {item.text} - {item.time}
                <button
                  onClick={() => handleRemove(index)}
                  className="px-3 py-1 text-base text-white bg-red-500 rounded font-outfit"
                >
                  Remove
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Clawk_timer;
