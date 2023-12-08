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
        d3.selectAll("svg").remove();
        defaultGraph(organiseData(dataSample[indexValue]));
        bubbleGraph(organiseData(dataSample[indexValue]));
        demoInfo(data);
         
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
    const svg = d3.select(".container").append("svg")
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
    svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
    .call(yAxis);

    // Create the Bar fors the chart
    svg.selectAll(".bar")
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
    
    var svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left + "," + margin.top + ")")
    ;

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

//// function to delete graphs
function demoInfo() { 
    d3.selectAll("li").remove()
    
    for (key in data.metadata[indexValue]) {
        console.log(key)
        console.log(data.metadata[indexValue][key])
        d3.select("#sample-metadata")
        .append("li")
        .text(`${key}: ${data.metadata[indexValue][key]}`)
    }
};


/*
^^^^^^^^^^ Setting up default graph ^^^^^^^^^^
*/ 


/*
----- Call functions -----
*/  
    //Call graph function to display the first data
    defaultGraph(organiseData(dataSample[0]));
    bubbleGraph(organiseData(dataSample[0]))
    console.log(organiseData(dataSample[0]))
    console.log(data)
})
.catch(e => {
    console.log(e)});;


