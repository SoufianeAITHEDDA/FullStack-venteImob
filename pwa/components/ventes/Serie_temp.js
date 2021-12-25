import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Ventes } from "../../types/Ventes";
import { DataS } from "../../types/DataS"
import * as d3 from "d3";
import React from "react";




const margin = { top: 40, right: 80, bottom: 60, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 280 - margin.top - margin.bottom,
    color = "OrangeRed";

const dataE = [];
var dataSerie = [];



const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}




const drawChart = async (ventes) => {


    for (var i = 0; i < ventes.length; i++) {


        d3.select("#the_SVG_ID").remove();

        var element = [];


        var exist = false;
        element.date = new Date(ventes[i].date);
        element.moyenne_total = ventes[i].prixMoyenM2


        dataE.map(e => {
            if (e.date.getFullYear() == element.date.getFullYear() && e.date.getMonth() == element.date.getMonth()) {
                e.total = e.total + 1;
                e.moyenne_total = e.moyenne_total + element.moyenne_total;
                exist = true;
            }
        }
        )
        if (exist == false) {
            element.total = 1;
            console.log(element.date.getFullYear() + '-0' + element.date.getMonth() + '-01');
            element.date = new Date(element.date.getFullYear(), element.date.getMonth(), 1)

            dataE.push(element)
        }

    }

    console.log(dataE)
    dataE.map(e => {
        e.moyenne_total = e.moyenne_total / e.total;
        const s = new DataS(e.date, e.moyenne_total)
        dataSerie.push(s);
    });

    console.log(dataSerie);

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("id", "the_SVG_ID")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    var div = d3.select("#my_dataviz")
        .append("div") // declare the tooltip div 
        .attr("class", "tooltipburndown")
        .style("position", "absolute")
        .style("text-align", "center")
        .style("height", "70px")
        .style("width", "120px")
        .style("background", "#AD6557")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("opacity", 0)
        .style("position", "absolute");

    const tickValuesForAxis = dataSerie.map(d => (d.date));

    var x = d3.scaleTime()
        .domain(d3.extent(tickValuesForAxis))
        .range([0, width]);


    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))


    var y = d3.scaleLinear()
        .domain([0, d3.max(dataSerie, function (d) { return d.prixMoyen / 1000; })])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));


    dataSerie.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    svg.append("path")
        .datum(dataSerie)
        .attr("stroke-width", 1.5)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("stroke-opacity", 1)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d.date) })
            .y(function (d) { return y(d.prixMoyen / 1000) }
            )

        )


    var cursorX;
    var cursorY;

    document.onmousemove = function (e) {
        cursorX = e.pageX;
        cursorY = e.pageY;
    }



    svg.selectAll(".dot")
        .data(dataSerie)
        .attr("class", "dot")
        .enter().append("circle")
        .style("fill", function (d) {
            if (d.open <= d.ideal) {
                return "#579FAD"
            } else {
                return "#AD6557"
            };
        })
        .attr("r", 5)
        .attr("cx", function (d) {
            return x(d.date);
        })
        .attr("cy", function (d) {
            return y(d.prixMoyen / 1000);
        })
        // Tooltip stuff after this
        .on("mouseover", function (event, d) {
            d3.select(".tooltipburndown").transition().duration(200).style("opacity", .9);
            d3.select(".tooltipburndown").html("mois : " + (d.date.getMonth() + 1) + " <BR>" + "annee: " + d.date.getFullYear() + " <BR>" + "prix moyen: " + "<b>" + d.prixMoyen + "€")
                .style("left", cursorX - 70 + "px")
                .style("top", cursorY + 20 + "px")
                .style("height", "fit-content")
                .style("width", "fit-content")
        })
        .on("mouseout", function (d) {
            d3.select(".tooltipburndown").transition().duration(500).style("opacity", 0);
        });



    svg.selectAll("text")
        .data(dataSerie)
        .enter()
        .append("text")
        .attr("x", function (d, i) {
            return 20 + 50 * i;
        })
        .attr("y", 100)
        .text(function (d) { return d; });

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("K€");




    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 5) + ")")
        .style("text-anchor", "middle")
        .text("Date");






}





export const Serie = ({ ventes }) => {
    const [error, setError] = useState(null);
    const router = useRouter();


    React.useEffect(() => {
        drawChart(ventes);
    }, [ventes]);

    return (
        <div id="chart">
            <div id="my_dataviz">

            </div>
        </div>



    )
};