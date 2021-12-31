import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Ventes } from "../../types/Ventes";
import { DataS } from "../../types/DataS"
import React from "react";




const drawChart =  (bars) => {




}



export const BarChart = ({ test , bars , datatest }) => {
  console.log("type ------"+test)

  const dataBars = [];
  console.log("bars ///////////"+bars);
  bars.map(e => {
    console.log(e);
    //var d = new Date(e.year, e.month-1 , "01")
    //const s = new DataS(d , e.moy)
    //dataBars.push(s);
  });

  const [error, setError] = useState(null);
  const router = useRouter();
  const [data , setdata] = useState(bars);



  React.useEffect(async () => {
    drawChart(data);
  }, [data]);


  return (
    <div id="chartBars">
      <div id="my_datavizBars">
        type : {test}

      </div>
    </div>


  )
};
