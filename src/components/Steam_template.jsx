import React, { useState } from "react";
import search_steam from "../js_files/steam_api.js";

function Steam_api() {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(false);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var temp = await search_steam(inputValue);
    setOutput(temp);
    setError(false);
    if (temp.length <= 0) {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="z-10 w-fit">
      {error && (
        <p className="ml-1 text-base text-red-600">Error getting that ☹</p>
      )}
      <h1 className="text-3xl font-bold font-outfit m-2 text-white">Steam Game Finder!</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Steam Games! ♕"
        className="w-48 px-2 py-2 text-base rounded font-outfit"
      />

      <button
        type="submit"
        className="ml-2 bg-[#46497e] text-white p-2 rounded font-outfit"
      >
        🕹️
      </button>
      {output.length > 0 && (
        <div
          className="mt-2 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg w-fit"
          style={{ maxHeight: "200px", maxWidth: "265px", minWidth: "265px" }} // Set a fixed height for the container
        >
          <ul className="justify-center divide-y divide-gray-200">
            {output.map((game, index) => (
              <li key={index} className="px-4 py-3">
                <img
                  src={game.img}
                  alt="the games pfp"
                  className="ml-auto mr-auto"
                />
                <p>Name: {game.name}</p>
                <p>Price: {game.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default Steam_api;
