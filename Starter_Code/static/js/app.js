// Define url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


/* 
------------------------ MetaData ------------------------
*/

// Set up dimensions of the chart
const margin = {top:70, right:40,bottom:60,left:175}
const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

//Set up container
const svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left + "," + margin.top + ")");


/* 
------------------------ MetaData ------------------------
*/

/* 
------------------------ Loading Data  ------------------------
*/
// Load and process data 
d3.json(url).then(data => {
    
    /*
    -------Pushing values into list----------
    */

    var data1 = data.samples;
    let sampleValues = []
    let otuLabels = []
    let otuIds = []

    data1.forEach(d => {
        sampleValues.push(d.sample_values);
        otuLabels.push(d.otu_labels);
        otuIds.push(d.id);
    });

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
    
    // Detect change in drop down menu and set selctedData
    let button = d3.select("#selDataset");
    let selectedId = data.samples[0].otu_ids[0];

    //Define selectedData to use
    
    // Setting up inital values to choose data
    let indexValue = otuIds.indexOf('940');

    // Checks if drop down menu was changed and changes selectedData value 
    button.on("change", function(event) {
        button.attr("onchange", this.value);
        selectedId = button.attr("onchange");
        indexValue = otuIds.indexOf(this.value);
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
    ---Set up default graph using the the first row of data---
    */ 
    // dataSamples = data.samples[i]
    //console.log(dataSample[0].sample_values.slice(0,10));

    function defaultGraph(dataSamples) { //dataSamples[i]
    
    //Set up SVG container 
    d3.selectAll("svg").remove();
    
    const svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("+margin.left + "," + margin.top + ")");

    //Set up x and y scales
    x = d3.scaleLinear()
     .range([0,width])
     .domain([0, d3.max(dataSamples[1].slice(0,10))]);
 
    y = d3.scaleBand()
     .range([0,height])
     .padding(0.1)
     .domain(dataSamples[0].slice(0,10))

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

/*
----- Call functions -----o
*/
    defaultGraph(organiseData(dataSample[0]));

    //console.log(organiseData(dataSample[0]));
})
.catch(e => {
    console.log(e)});;
