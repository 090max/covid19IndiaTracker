import React, { useState, useEffect } from "react";
import { resolvePlugin } from "@babel/core";
import InfoDipslay from "../InfoDisplay/InfoDisplay";
import { Link } from "react-router-dom";

import "./General.css";

const General = () => {
  const [active_case, setActive] = useState("...");
  const [discharged_case, set_discharged_case] = useState("...");
  const [migrated_case, set_migrated_case] = useState("...");
  const [death_case, set_death_case] = useState("...");
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    //Fetching the data for the india covid19 casese from the api ...
    if (!dataFetched) {
      fetch("https://covidtracker19.herokuapp.com/getgeneral")
        .then(response => response.json())
        .then(data => {
          setActive(data["active_case"]);
          set_discharged_case(data["discharged_case"]);
          set_migrated_case(data["migrated_case"]);
          set_death_case(data["death_case"]);
          setDataFetched(true);
        });
    }
  }, []);

  return (
    <div className="outerContainer">
      <div className="information">India Covid19 Cases Report</div>
      <div className="options">
        <Link to={`/analyze`}>
          <button className="mt-20">See Analytics</button>
        </Link>
        <Link to={`/statewise`}>
          <button className="mt-20">State Wise Display</button>
        </Link>
      </div>
      <div className="innerContainer">
        <InfoDipslay type={"Active Cases"} info={active_case} />
        <br />
        <InfoDipslay type={"Discharged Cases"} info={discharged_case} />
        <br />
        <InfoDipslay type={"Migrated Cases"} info={migrated_case} />
        <br />
        <InfoDipslay type={"Death Cases"} info={death_case} />
      </div>
    </div>
  );
};

export default General;
