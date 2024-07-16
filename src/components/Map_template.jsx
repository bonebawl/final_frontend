import React, { useState } from "react";
import map_search from "../js_files/map_api.js";
import wiki_search from "../js_files/wikipedia_api.js";
function Map_template() {
  const [mapInputValue, setMapInputValue] = useState("");
  const [mapOutput, setMapOutput] = useState([]);
  const [wikiInputValue, setWikiInputValue] = useState("");
  const [wikiOutput, setWikiOutput] = useState([]);
  const [mapError, setMapError] = useState("");
  const [wikiError, setWikiError] = useState("");

  const handleMapInputChange = (e) => {
    setMapInputValue(e.target.value);
  };
  const handleWikiInputChange = (e) => {
    setWikiInputValue(e.target.value);
  };

  const handleMapSubmit = async (e) => {
    e.preventDefault();
    var temp = await map_search(mapInputValue);
    console.log(temp);
    setMapOutput(temp);
    setMapError("");
    if (temp == undefined) {
      setMapError("undefined");
    }

  };
  const handleWikiSubmit = async (e) => {
    e.preventDefault();
    var temp = await wiki_search(wikiInputValue);
    setWikiOutput(temp);
    console.log(temp);
    setWikiError("");
    if (temp.length <= 0) {
      setWikiError("N");
    }
    setFirst(false);
  };

  return (
    <div className="z-20 flex justify-center m-auto text-center align-middle">
      <form onSubmit={handleWikiSubmit}>
       
        <h1 className="text-center text-white font-outfit">Search the Web</h1>
        
        {wikiError === "N" && (
          <p className="ml-1 text-base text-red-600 font-outfit">
            That's not in the web! 🌎
          </p>
        )}

        <button
          type="submit"
          className="bg-[#46497e] text-white p-2 rounded font-outfit"
        >
          🔍
        </button>
        <input
          type="text"
          value={wikiInputValue}
          onChange={handleWikiInputChange}
          placeholder="What is: "
          className="px-2 py-2 m-2 text-base rounded font-outfit w-44"
        />
        {wikiOutput.length > 0 && (
          <div className="mt-2 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg w-fit font-outfit max-h-[200px] max-w-[265px] min-w-[265px]">
            <ul className="divide-y divide-gray-200 font-outfit ">
              {wikiOutput.map((search, index) => (
                <li key={index} className="px-4 py-3">
                  <p className="text-sm text-justify">{search.text}</p>
                  <a className="text-sm text-red-500" href={search.link}>
                    Click me for more info!
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
      <h3 className="text-center text-white font-outfit">OR</h3>
      <form onSubmit={handleMapSubmit}>

          <h1 className="text-center text-white font-outfit">
            Find schools nearby!
          </h1>
     
        {mapError === "N" && (
          <p className="ml-1 text-base text-red-500 font-outfit">
            That's not in the world! 🌎
          </p>
        )}
        {mapError === "API" && (
          <p className="ml-1 text-base text-red-500 font-outfit">
            Server ran out of API uses! 🗲
          </p>
        )}
        {mapError === "undefined" && (
          <p className="ml-1 text-base text-red-500 font-outfit">
            That's not in the world! 🌎
          </p>
        )}
        <input
          type="text"
          value={mapInputValue}
          onChange={handleMapInputChange}
          placeholder="Search for schools! 🗺️"
          className="px-2 py-2 m-2 text-base rounded font-outfit w-44"
        />
        <button
          type="submit"
          className="bg-[#46497e] text-white p-2 rounded font-outfit"
        >
          🛰️
        </button>
        {mapOutput != undefined && (
          <div
             className="mt-2 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg w-fit"
             style={{ maxHeight: "200px" , maxWidth:"265px", minWidth:"265px"}} // Set a fixed height for the container
          >
            <ul className="divide-y divide-gray-200 font-outfit">
              {mapOutput.map((map, index) => (
                <li key={index} className="px-4 py-3">
                  <p className="text-sm">Name: {map.name}</p>
                  <p className="text-sm">Location: {map.street}</p>
                  <p className="text-sm text-red-500">
                    {map.location.distance} m away!
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default Map_template;
