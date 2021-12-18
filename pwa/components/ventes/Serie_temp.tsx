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

interface Props {
    ventes: Ventes[];

}





const drawChart = (ventes) => {



    for (var i = 0; i < ventes.length; i++) {

        var element = {
            date: 0,
            moyenne_total: 0,
            total: 1,
        };

        var exist = false;
        var dt = new Date(ventes[i].date);
        element.date = dt.getMonth() + 1;
        element.moyenne_total = ventes[i].prixMoyenM2

        dataE.map(e => {
            if (e.date == element.date) {
                e.total = e.total + 1;
                e.moyenne_total = e.moyenne_total + element.moyenne_total;
                exist = true;
            }
        }
        )
        if (exist == false) {
            dataE.push(element)
        }

    }


    dataE.map(e => {
        e.moyenne_total = e.moyenne_total / e.total;
        const s = new DataS(e.date, e.moyenne_total)
        dataSerie.push(s);
    });

    console.log(dataSerie);

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
        .domain(d3.extent(dataSerie, function (d) { return d.month; }))
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))


    var y = d3.scaleLinear()
        .domain([0, d3.max(dataSerie, function (d) { return d.prixMoyen; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("path")
        .datum(dataSerie)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d.month) })
            .y(function (d) { return y(d.prixMoyen) })
        )


}

export const Serie: FunctionComponent<Props> = ({ ventes }) => {
    const [error, setError] = useState(null);
    const router = useRouter();



    React.useEffect(() => {
        drawChart(ventes);
    }, [ventes]);


    return (
        <div id="chart">
            <div id="my_dataviz"></div>
        </div>


    )
};