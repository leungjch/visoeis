// BarChart.js
import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChart({ width, height, data, useLinear }){

    // https://stackoverflow.com/a/23398499
    function getMinMaxOf2DIndex (arr, idx) {
        return {
            min: Math.min.apply(null, arr.map(function (e) { return e[idx]})),
            max: Math.max.apply(null, arr.map(function (e) { return e[idx]}))
        }
    } 

    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {


        const svg = d3.select(ref.current);
        // Clear svg before drawing
        svg.selectAll("*").remove();

        svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "pink")
        .attr("rx", "2%")								// how much to round corners - to be transitioned below
     
        
        var selection = svg.selectAll("circle").remove().data(data);
        console.log(data)

        var yMinMax = getMinMaxOf2DIndex(data, 1);
        var xMinMax = getMinMaxOf2DIndex(data, 0);
        var avgY = (yMinMax.max-yMinMax.max)/2

        console.log("max data is", yMinMax, xMinMax)


        var scaleX = d3.scaleLinear()
                            .domain([xMinMax.min - 1, xMinMax.max + 1])
                            .range([20, width-20]);

        if (useLinear) {
            var scaleY = d3.scaleLinear()

        }
        else {
            var scaleY = d3.scaleSymlog()
        }

        scaleY.domain([yMinMax.min-avgY/10, yMinMax.max+avgY/10])
        .range([height-10, 10]);
        
        // Draw lolipop lines
        // svg.selectAll("myline")
        // .data(data).enter()
        // .append("line")
        // .attr("x1", function(d) { return scaleX(d[0]); })
        // .attr("x2", function(d) { return scaleX(d[0]); })
        // .attr("y1", function(d) {return scaleY(d[1])})
        // .attr("y2", scaleY(yMinMax.min))
        // .attr("stroke", "grey")


        // Plot points
        selection
        .data(data).enter()
        .append("circle")
        .attr("cx", function(d) {return scaleX(d[0])})
        .attr("cy", function(d) {return scaleY(d[1])})
        .attr("r", 5)
        


        // selection
        //     .exit()
        //     .transition().duration(300)
        //         .attr("y", (d) => height)
        //         .attr("height", 0)
        //     .remove()

         }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart;