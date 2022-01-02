import React, { Component } from 'react';
const colors = ['#0F288E', '#D4F20F', '#758E0F', '#57e188', '#FF5E00', '#F20F0F', '#00FF11', '#FF00DE', '#87d3f2', '#4ebeeb', '#35a4e8', '#188ce5', '#542ea5', '#724bc3', '#9c82d4', '#c981b2', '#b14891', '#ff6d00', '#ff810a', '#ff9831', '#ffb46a', '#ff9a91', '#ff736a', '#f95d54', '#ff4136', '#c4c4cd'];
import { useState } from 'react';
import { slice } from 'lodash';
//import in case tests
import * as d3 from 'd3'

class DonutChart extends Component {

    constructor(props) {
        super(props);
        this.chRef = React.createRef();

        this.state = {
            data: [],
            year: 2021
        }
        this.handleChange = this.handleChange.bind(this);


    }


    handleChange(event) {
        //window.location.reload(false);
        let y =parseInt(event.target.value, 10)
        this.setState({ data: this.pieData(this.props, y), year:y });
        //console.log("change", y)
        this.drawChart(y)

    }


    // Chart load after component Mount
    componentDidMount() {
        //console.log("Mount ",this.state)
        this.drawChart(2021)

    }




    pieData = (data1, year) => {

        //filter data by year
        let { data } = data1
        let dataYear = data.filter(d => d.date.substring(0, 4) == year);

        //get all the regions
        let allRegions = dataYear.map(r => r.region);

        //remove duplicates
        let regions = [...new Set(allRegions)]


        let finalData = [];

        for (let i = 0; i < regions.length; i++) {

            //get the ventes number of each region  then put it in our object
            const value = dataYear.filter(d => d.region == regions[i]).map(d => d.nombreVentes).reduce((pv, cv) => pv + cv, 0)
            const region = regions[i];
            finalData.push({ name: region, value: value })

        }

        //get the total number of ventes
        const total = finalData.map(d => d.value).reduce((pv, cv) => pv + cv, 0)

        //transform values to %
        finalData = finalData.map(d => {
            return { value: Math.round(d.value * 100 / total), name: d.name }
        })

        //limit to 8 greatest values
        const limit = 8
        if(regions.length > limit){
            finalData= _.sortBy( finalData, 'value' ).reverse();
            let slices = finalData.slice(0, limit-1);
            let autresValue = finalData.slice(limit, finalData.length).map(d => d.value).reduce((pv, cv) => pv + cv, 0)
            slices.push({value:autresValue, name:"Autres"})
            finalData = slices

        }
        //console.log("pieData", this.state)
        return finalData;
    }





    // DrawChart
    drawChart(y) {

        d3.select("#d3-donutChart").remove();
       let data = this.pieData(this.props, y);
        //console.log(this.state.year," draww chart", data)
        //filter by year
        //let data = this.pieData(data, this.state.year)

        const svgContainer = d3.select(this.chRef.current).node();

        const width = 960,
            height = 450,
            radius = Math.min(width, height) / 2;

        //________________

        // legend Position
        let legendPosition = d3.arc().innerRadius(radius / 0.37).outerRadius(radius);


        // Create SVG
        const svg = d3.select(this.chRef.current)
            .append('svg')
            .attr("id", "d3-donutChart")
            .attr("width", '50%')
            .attr("height", '30%')
            .attr('viewBox', '-300 -300 ' + width + ' ' + width)
            //.attr('preserveAspectRatio','xMinYMin')
            .append("g")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

        let pie = d3.pie()
            .value(d => d.value)
        let data_ready = pie(data)


        // Donut partition
        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(radius / 1.75)  // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', (d) => colors[d.index])
            .attr("stroke", "#fff")
            .style("stroke-width", "2")
            .style("opacity", "1")



        // Legend group and legend name
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('g')
            .attr("transform", d => `translate(${legendPosition.centroid(d)})`)
            .append('text')
            .text((d) => { return d.data.name })
            .style("text-anchor", "middle")
            .style("font-weight", 700)
            .style("fill", '#000000')
            .style("font-size", 14)



        const legendPosition2 = d3.arc().innerRadius(radius / 1.8).outerRadius(radius);
        const legendPosition3 = d3.arc().innerRadius(radius / 1.2).outerRadius(radius);

        //Label for value
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('g')
            .attr("transform", d => `translate(${legendPosition2.centroid(d)})`)
            .append('text')
            .text(d => d.data.value + "%")
            .style("text-anchor", "middle")
            .style("fill", '#000000')
            .style("font-size", '20px')
            .style("font-weight", 900)
        //.attr('x', d => legendPosition.centroid(d))

        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('g')
            .attr("transform", d => `translate(${legendPosition3.centroid(d)})`)

            .append('line')
            .style("stroke", "black")
            .attr('x1', 0)
            .attr('y1', 0)
            // .attr('x2', 200)
            .attr("transform", d => `translate(${legendPosition2.centroid(d)})}`)
            .attr('x2', d => legendPosition2.centroid(d)[0])
            .attr('y2', d => legendPosition2.centroid(d)[1] - 5)
            .style('stroke-width', 4)


    }



    render() {
        return <>
            <h1>Pourcentage de ventre par region : {this.state.year}</h1>
            <select className="form-select " value={this.state.year} onChange={this.handleChange}  >
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                 <option value="2019">2019</option>
                <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>

            <div ref={this.chRef}  id="pie"></div>
        </>
    }


}

export default DonutChart;
