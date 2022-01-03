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

  var cursorX;
  var cursorY;

  document.onmousemove = function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
  }
  
  if(test === "day"){
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
      .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
       
        d3.select(".tooltipburndown").transition().duration(200).style("opacity", .9);
        d3.select(".tooltipburndown").html("Date :" + d.date.substring(0,9) +"<br/> Nombre de ventes: " +  + Number(d.nombre_ventes).toFixed(2))
            .style("left", cursorX - 70 + "px")
            .style("top", cursorY + 20 + "px")
            .style("height", "fit-content")
            .style("width", "fit-content")
      })
      .on("mouseout", function (d) {
        d3.select(".tooltipburndown").transition().duration(500).style("opacity", 0);
      });
  }
  if(test ==="month"){
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
      .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
       
        d3.select(".tooltipburndown").transition().duration(200).style("opacity", .9);
        d3.select(".tooltipburndown").html("mois : " + (d.month + " année: "+ d.year + "<br/> Nombre de ventes: " +  + Number(d.nombre_ventes).toFixed(2)))
            .style("background", "#AD6557")
            .style("left", cursorX - 70 + "px")
            .style("top", cursorY + 20 + "px")
            .style("height", "fit-content")
            .style("width", "fit-content")
      })
      .on("mouseout", function (d) {
        d3.select(".tooltipburndown").transition().duration(500).style("opacity", 0);
      });
  }
  if(test === "year"){
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
      .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
       
        d3.select(".tooltipburndown").transition().duration(200).style("opacity", .9);
        d3.select(".tooltipburndown").html("année: "+ d.year + "<br/> Nombre de ventes: " +  + Number(d.nombre_ventes).toFixed(2))
            .style("left", cursorX - 70 + "px")
            .style("top", cursorY + 20 + "px")
            .style("height", "fit-content")
            .style("width", "fit-content")
      })
      .on("mouseout", function (d) {
        d3.select(".tooltipburndown").transition().duration(500).style("opacity", 0);
      });
  }
  

  svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -20-margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Nombre de Vente");
  

  if(test === "month"){
      svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].year + '/' + data[i].month))
      .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.20em")
            .attr("dy", ".20em")
            .attr("transform", "rotate(-65)");
  }
  if(test === "year"){
      svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].year))
      .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-90)");
  }

  if(test === "day"){
      svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].date.substring(0,9)))
      .selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.25em")
            .attr("transform", "rotate(-90)");
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
