import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Ventes } from "../../types/Ventes";
import { DataS } from "../../types/DataS"
import React from "react";
//import * as d3 from 'd3'



const drawChart = (data,test) => {
  const width = 900;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };

  d3.select("#the_SVG_ID2").remove();
  //let data = this.props.data

  const svgContainer = d3.select("#my_datavizBars").node();

  const svg = d3.select("#my_datavizBars")
  .append('svg')
  .attr("id", "the_SVG_ID2")
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

  const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

  const y = d3.scaleLinear()
  .domain([0, d3.max(data, function (d) { return d.nombre_ventes; })])
  .range([height - margin.bottom, margin.top])

  svg
  .append("g")
  .attr("fill", 'royalblue')
  .selectAll("rect")
  //.data(data.sort((a, b) => d3.descending(a.nombre_ventes, b.nombre_ventes)))
  .data(data)
  .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.nombre_ventes))
      .attr('title', (d) => d.nombre_ventes)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.nombre_ventes))
      .attr("width", x.bandwidth());

  svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')

  if(test === "month"){
      svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].year + '/' + data[i].month))
      .attr("font-size", '20px')
  }
  if(test === "year"){
      svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].year))
      .attr("font-size", '20px')
  }

  if(test === "day"){
      svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].date.substring(0,9)))
      .attr("font-size", '20px')
  }

  svg.node();
}



export const BarChart = ({ test , bars , datatest }) => {
  console.log("type ------"+test)

  const dataBars = [];
  console.log("bars ///////////"+bars);
  bars.map(e => {
    console.log("hdhhdh",e);
    //var d = new Date(e.year, e.month-1 , "01")
    //const s = new DataS(d , e.moy)
    //dataBars.push(s);
  });

  const [error, setError] = useState(null);
  const router = useRouter();
  const [data , setdata] = useState(bars);



  React.useEffect(async () => {
    drawChart(bars,test);
  }, [bars]);


  return (
    <div id="chartBars">

      <div id="my_datavizBars">

      </div>
    </div>


  )
};
