// Define url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


/* 
------------------------ MetaData ------------------------
*/

// Set up dimensions of the chart
var margin1 = {top:70, right:50,bottom:60,left:175};
var width1 = 600 - margin1.left - margin1.right;
var height1 = 400 - margin1.top - margin1.bottom;

// Set up dimension of the chart
var margin = {top: 40, right: 150, bottom: 60, left: 30},
    width = 500 - margin1.left - margin1.right;
    height = 420 - margin1.top - margin1.bottom;

//Set up container for Bar Graph
var svg1 = d3.select(".container").append("svg1")
    .attr("width", width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left + "," + margin.top + ")")
    .attr("class", "barGraph");

//Set up container for bubble graph
var svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left + "," + margin.top + ")")
    .attr("class", "bubbleGraph");


/* 
^^^^^^^^^^ MetaData ^^^^^^^^^^
*/

/* 
------------------------ Loading Data  ------------------------
*/
// Load and process data 
d3.json(url).then(data => {
    /* 
    -------Setting up drop menu down selection----------
    */

    d3.select("#selDataset")
        .selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .attr("value", d=>d)
        .text(d => d);

    /*
    -------Create a function to check the dropdown menu for updates----------
    */
    // Setting up inital values to choose data
    let indexValue = data.names.indexOf('940');

    // Detect change in drop down menu and set selctedData
    let button = d3.select("#selDataset");

    // Checks if drop down menu was changed and changes selectedData value 
    button.on("change", function(event) {
        button.attr("onchange", this.value);
        selectedId = button.attr("onchange");
        indexValue = data.names.indexOf(this.value);
        defaultGraph(organiseData(dataSample[indexValue]));
         
    });
    /*
    ----------Setting up default graph----------
   */

    // defining the dataSamples to to hold position of data. 
    //Holds {id:, otu_ids: [,,], sample_values:[,,],otu_labels:[,,]}

    let dataSample = data.samples;

    // To sort the dataSamples by descending sample_values
    function organiseData(sampleData) {
        combinedIdValue = [sampleData.otu_ids,sampleData.sample_values];
        combinedIdValue.sort((a,b) => b[1]-a[1])
        //console.log(combinedIdValue)
        return combinedIdValue
    };
    
    /*
    ----------Function to display Bar Graph----------
    */ 

    function defaultGraph(dataSamples) { //dataSamples[i]
    
    //Set up SVG container 
    d3.selectAll("svg1").remove();
    
    const svg1 = d3.select(".container").append("svg")
    .attr("width", width + margin1.left + margin1.right)
    .attr("height",height + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform", "translate("+margin1.left + "," + margin1.top + ")")
    ;

    //Set up x and y scales
    x = d3.scaleLinear()
     .range([0,width])
     .domain([0, d3.max(dataSamples[1].slice(0,10))]);
 
    y = d3.scaleBand()
     .range([0,height])
     .padding(0.1)
     .domain(dataSamples[0].slice(0,10));

    // Create the x and y axes
    xAxis = d3.axisBottom(x)

    yAxis = d3.axisLeft(y)
    
    // Add the x and y Axes to the chart 
    svg1.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg1.append("g")
    .call(yAxis);

    // Create the Bar fors the chart
    svg1.selectAll(".bar")
    .data(dataSamples[1])
    .enter().append("rect")
    .attr("class","bar")
    .attr("y", function(d,i) {return y(dataSamples[0][i])})
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", function(d) {return x(d)})
    .style("fill","skyblue");}

//function bubble graph

    function bubbleGraph(dataSample) {

    // Add X axis
    var x = d3.scaleLinear()
        .domain([d3.min(dataSample[0]),d3.max(dataSample[0])])
        .range([0, width1]);
    
    //Add Y axis
    var y = d3.scaleLinear()
        .domain([d3.min(dataSample[1]), d3.max(dataSample[1])])
        .range([height1,0]);

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([d3.min(dataSample[1]), d3.max(dataSample[1])])
        .range([5,20]);
    
    // Create the x and y axes
    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);
    
    // Add the x and y axis to the chart
    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height1 + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "yAxis")
        .call(yAxis);

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(dataSample[0].map((d,i) => ({ x:d, y: dataSample[1][i]})))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.x) })
        .attr("cy", function (d) {return y(d.y) })
        .attr("r", function (d) { return z(d.y) })
        .style("fill", "red")
};


/*
^^^^^^^^^^ Setting up default graph ^^^^^^^^^^
*/ 


/*
----- Call functions -----
*/  
    //Call graph function to display the first data
    defaultGraph(organiseData(dataSample[0]));
    //bubbleGraph(organiseData(dataSample[0]))
    console.log(organiseData(dataSample[0]))
})
.catch(e => {
    console.log(e)});;


////////////////////// Trial code


//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv", function(data) {

  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//
    function trailGraph(data) {
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 45000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(3));

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+50 )
      .text("Gdp per Capita");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20 )
      .text("Life expectancy")
      .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3.scaleSqrt()
    .domain([200000, 1310000000])
    .range([ 2, 30]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    .range(d3.schemeSet1);


  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.country)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }


  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", .05)
    // expect the one that is hovered
    d3.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 1)
  }


  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "bubbles " + d.continent })
      .attr("cx", function (d) { return x(d.gdpPercap); } )
      .attr("cy", function (d) { return y(d.lifeExp); } )
      .attr("r", function (d) { return z(d.pop); } )
      .style("fill", function (d) { return myColor(d.continent); } )
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )



    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    // Add legend: circles
    var valuesToShow = [10000000, 100000000, 1000000000]
    var xCircle = 390
    var xLabel = 440
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return height - 100 - z(d) } )
        .attr("r", function(d){ return z(d) })
        .style("fill", "none")
        .attr("stroke", "black")

    // Add legend: segments
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
        .attr('x1', function(d){ return xCircle + z(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return height - 100 - z(d) } )
        .attr('y2', function(d){ return height - 100 - z(d) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', xLabel)
        .attr('y', function(d){ return height - 100 - z(d) } )
        .text( function(d){ return d/1000000 } )
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')

    // Legend title
    svg.append("text")
      .attr('x', xCircle)
      .attr("y", height - 100 +30)
      .text("Population (M)")
      .attr("text-anchor", "middle")

    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 390)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 390 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    console.log(data)
}

    trailGraph(data)
  })
