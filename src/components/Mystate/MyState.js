import React, { useState, useEffect } from "react";
import "./MyState.css";
import { strict } from "assert";
import { expression } from "@babel/template";

const MyState = ({ state_info }) => {
  const [confirmed, set_confirmed] = useState("Fetching...");
  const [foreign, set_foreign] = useState("Fetching...");
  const [cured, set_cured] = useState("Fetching...");
  const [death_case, set_death_case] = useState("Fetching...");
  const [cnt, setCnt] = useState(0);

  function update_variables(state_info) {
    if (state_info != "") {
      var lower_state = state_info.toLowerCase().replace(" ", "");
      console.log("The state i got is ", state_info);
      const url =
        "https://covidtracker19.herokuapp.com/getstate?state=" + lower_state;
      console.log("url", url);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          var objectLength = Object.keys(data).length;
          if (objectLength == 5) {
            set_confirmed(data["confirmed"]);
            set_foreign(data["foreign"]);
            set_cured(data["cured/migrated"]);
            set_death_case(data["death"]);
          } else {
            set_confirmed("__");
            set_foreign(data["__"]);
            set_cured(data["__"]);
            set_death_case("__");
          }
        });
    }
  }

  useEffect(() => {
    update_variables(state_info);
  }, [state_info]);

  return state_info ? (
    <div className="card 1">
      <div className="card_title title-white">
        <p>Your State : {state_info}</p>
      </div>
      <div className="information_div">
        <div className="info">Confirmed: {confirmed}</div>
        <div className="info">Foreign: {foreign}</div>
        <div className="info">Cured/Discharded: {cured}</div>
        <div className="info">Deaths: {death_case}</div>
      </div>
    </div>
  ) : (
    <div className="card fetching_info_mystate">
      Fetching Your State....Make sure Location services are Enabled !!
    </div>
  );
};

export default MyState;
