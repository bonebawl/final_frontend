import React, { useState } from "react";
import Steam_api from "./Steam_template";
import Map_template from "./Map_template";
import Minesweeper from "./Minesweeper";
import Sched_template from "./Sched";
import Clawk_timer from "./Clock";
export default function Widgets({
  type,
  hovered,
  onHover,
  onSwitch,
  children,
  active,
}) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [showMinesweeper, setShowMinesweeper] = useState(false);
  const baseClasses =
    "flex flex-col justify-center items-center relative h-full";
  const backgroundImages = {
    Productivity:
      "https://images.unsplash.com/photo-1515334798407-90e6ea6624c1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Entertainment:
      "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Educational:
      "https://images.unsplash.com/photo-1667312939934-60fc3bfa4ec0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const handleMouseEnter = () => {
    onHover(type, true);
    setIsInteracting(false);
  };

  const handleMouseLeave = () => {
    if (!isInteracting) {
      onHover(type, false);
    }
  };

  return (
    <div
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 mix-blend-luminosity bg-no-repeat bg-cover bg-center transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-30"}`}
        style={{ backgroundImage: `url('${backgroundImages[type]}')` }}
      ></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { hovered }),
        )}
      </div>
      {hovered && (
        <div
          className="absolute inset-0 bg-opacity-50 flex items-center justify-center border-dotted"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          {type === "Productivity" && (
            <div
              className="z-20 text-center justify-center select-none duration-300 overflow-auto"
              draggable="false"
            >
              <Sched_template></Sched_template>
              <Clawk_timer></Clawk_timer>
            </div>
          )}
          {type === "Entertainment" && (
            <div
              className="z-20 text-center justify-center select-none duration-300"
              draggable="false"
            >
              <Steam_api />
              <h3 className="font-outfit text-white m-2">OR</h3>
              <button
                onClick={() => setShowMinesweeper(true)}
                className="bg-[#46497e] px-3 py-2 rounded text-white font-outfit text-base"
              >
                Play Minesweeper
              </button>
            </div>
          )}
          {type === "Educational" && (
            <div className="select-none duration-300 z-20" draggable="false">
              <Map_template />
            </div>
          )}
        </div>
      )}
      {showMinesweeper && (
        <Minesweeper onClose={() => setShowMinesweeper(false)} />
      )}
    </div>
  );
}