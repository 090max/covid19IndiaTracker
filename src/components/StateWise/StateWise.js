import React, { useState, useEffect } from "react";
import MyState from "../Mystate/MyState.js";
import AllState from "../AllState/AllState";

import "./StateWise.css";
const StateWise = () => {
  const [x_cord, setX] = useState(-1);
  const [y_cord, setY] = useState(-1);
  const [user_state, setUserState] = useState("");
  const [state_data, setStateData] = useState([]);

  async function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geo Location not supported on this browser");
    }
  }

  function showPosition(position) {
    console.log(position.coords.latitude);
    setX(position.coords.latitude);
    setY(position.coords.longitude);
    console.log("X,y", x_cord, y_cord);
  }

  async function retrieve_user_state() {
    if (x_cord != -1 && y_cord != -1) {
      const url =
        "https://geocode.xyz/" +
        x_cord.toString() +
        "," +
        y_cord.toString() +
        "?geoit=xml";
      const http = new XMLHttpRequest();
      http.open("GET", url);
      http.send();
      http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(http.responseText, "text/xml");
          console.log("Fetched Information for the cord", http.responseText);
          var final_state_fetched = "";
          var fetched_state = xmlDoc.getElementsByTagName("state");
          if (fetched_state.length == 0) {
            var fetched_region = xmlDoc.getElementsByTagName("region")[0]
              .childNodes[0].nodeValue;
            var arr = fetched_region.split(",");
            if (arr.length == 2) {
              final_state_fetched = arr[1].trim();
            }
          } else {
            final_state_fetched = fetched_state[0].childNodes[0].nodeValue;
          }
          if (final_state_fetched == "Nct Of Delhi")
            final_state_fetched = "delhi";
          console.log("state fetched is", final_state_fetched);
          setUserState(final_state_fetched);
        }
      };
    }
  }

  async function retrieve_all_states() {
    if (state_data.length == 0) {
      fetch("https://covidtracker19.herokuapp.com/getstate?state=all")
        .then(resp => resp.json())
        .then(data => {
          setStateData(data);
        });
    }
  }
  useEffect(() => {
    getLocation();
    retrieve_user_state();
  }, [x_cord, y_cord]);

  useEffect(() => {
    retrieve_all_states();
    console.log(state_data);
  }, []);

  return (
    <div className="outerContainer">
      <div className="myStateContainer">
        <MyState state_info={user_state} />
      </div>
      <div className="infoDiv">
        All States Information, In decreasing order of the number of active
        cases..
      </div>
      <div className="allStateContainer">
        {state_data.map((el, index) => (
          <AllState
            key={index}
            state={el["state"]}
            confirmed={el["confirmed"]}
            foreign={el["foreign"]}
            cured={el["cured/migrated"]}
            death={el["death"]}
          />
        ))}
      </div>
    </div>
  );
};

export default StateWise;
