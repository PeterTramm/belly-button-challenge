// Define url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Set up dimensions of the chart
const margin = {top:70, right:40,bottom:60,left:175}
const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

//Set up SVG container 

const svg = d3.select(".container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "Translate("+margin.left + "," + margin.top + ")");

// Load and process data 
d3.json(url).then(data => {
    sampleValues = [];
    otuIds = [];
    otuLabels = [];

    data.samples.forEach(d => {
        sampleValues.push(d.sample_values);
        otuLabels.push(d.otu_labels);
        otuIds.push(d.otu_ids)
    });
    
    console.log(otuLabels); // List of bacteria Names
    console.log(otuIds); // List of bacteria identifciation numbers
    console.log(sampleValues); // List of counts of bacteria Ids

    // console.log(data.samples)
    // console.log(sampleValues)
    


    //Set up x and y scales
    const x = d3.scaleLinear()
        .range([0,width])
        .domain([0, d3.max(sampleValues, function (sampleValue) {return sampleValue})]);
    
    const y = d3.scaleBand()
        .range([height,0])
        .padding(0.1)
        .domain(sampleValues.map(function(sampleValues) {return sampleValues}))

    // Create the x and y axes
    const xAxis = d3.axisBottom(x)

    const yAxis = d3.axisLeft(y)

    // Add the x and y Axes to the chart 
    svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

    svg.append("g")
    .call(yAxis);

    // Create the Bar fors the chart
    svg.selectAll(".bar")
    .data(sampleValues)
    .enter().append("rect")
    .attr("class","bar")
    .attr("y",function (sampleValues) {return y(sampleValues)})
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", function (sampleValues) {return x(sampleValues);})
    .style("fill","skyblue")
});

