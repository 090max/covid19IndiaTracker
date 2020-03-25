import React, { useState, useEffect } from "react";
// var CanvasJSReact =
// var CanvasJS = CanvasJSReact.CanvasJS;
import CanvasJSChart from "../Canvas/canvasjs.react";

const Analysis = () => {
  const [active_cases, setActiveCases] = useState({
    title: {
      text: "Active Cases Visualization"
    }
  });
  const [death_cases, setDeathCases] = useState({
    title: {
      text: "Death Cases Visualization"
    }
  });
  const [cured_cases, setCuredCases] = useState({
    title: {
      text: "Cured Cases Visualization"
    }
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length == 0) {
      fetch("https://covidtracker19.herokuapp.com/getanalytics")
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
      console.log("FETCHING>>>");
    }
  }, [active_cases]);

  useEffect(() => {
    if (data.length > 0) {
      var temp_arr_active_case = [];
      var temp_arr_death_case = [];
      var temp_arr_cured_case = [];

      data.forEach(elem => {
        var obj1 = {};
        var obj2 = {};
        var obj3 = {};

        var temp_date = new Date(elem["date"]);
        // labels.push(new Date(elem["date"]).toLocaleString());
        obj1["x"] = obj2["x"] = obj3["x"] = new Date(
          temp_date.getFullYear(),
          temp_date.getMonth(),
          temp_date.getDate()
        );
        obj1["y"] = elem["active_case"];
        temp_arr_active_case.push(obj1);
        console.log(obj1);
        obj2["y"] = elem["death_case"];
        temp_arr_death_case.push(obj2);
        console.log(obj2);
        obj3["y"] = elem["discharged_case"];
        temp_arr_cured_case.push(obj3);
        console.log(obj3);
      });

      var temp_active_case_obj = {
        title: {
          text: "Active Cases Visualization"
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 5,
              left: 15,
              right: 15,
              bottom: 15
            }
          }
        },
        axisX: {
          title: "TimeLine",
          gridThickness: 2,
          valueFormatString: "MMM DD",
          ticks: {
            stepSize: 10
          }
        },
        axisY: {
          title: "Active Cases"
        },
        data: [
          {
            // labels: labels,
            type: "area",
            dataPoints: temp_arr_active_case
          }
        ]
      };

      var temp_death_case_obj = {
        title: {
          text: "Death Cases Visualization"
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 5,
              left: 15,
              right: 15,
              bottom: 15
            }
          }
        },
        axisX: {
          title: "TimeLine",
          gridThickness: 2,
          valueFormatString: "MMM DD",
          ticks: {
            stepSize: 10
          }
        },
        axisY: {
          title: "Death Cases"
        },
        data: [
          {
            // labels: labels,
            type: "area",
            dataPoints: temp_arr_death_case
          }
        ]
      };

      var temp_cured_case_obj = {
        title: {
          text: "Cured Cases Visualization"
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 5,
              left: 15,
              right: 15,
              bottom: 15
            }
          }
        },
        axisX: {
          title: "TimeLine",
          gridThickness: 2,
          valueFormatString: "MMM DD",
          ticks: {
            stepSize: 10
          }
        },
        axisY: {
          title: "Cured Cases"
        },
        data: [
          {
            // labels: labels,
            type: "area",
            dataPoints: temp_arr_cured_case
          }
        ]
      };
      setActiveCases(temp_active_case_obj);
      setDeathCases(temp_death_case_obj);
      setCuredCases(temp_cured_case_obj);
    }
  }, [data]);

  return data.length ? (
    <div className="outerContainer">
      <CanvasJSChart options={active_cases} />
      <br />
      <CanvasJSChart options={death_cases} />
      <br />
      <CanvasJSChart options={cured_cases} />
    </div>
  ) : (
    <div className="fetching">Fetching Data ...</div>
  );
};

export default Analysis;
