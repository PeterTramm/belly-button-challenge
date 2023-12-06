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
    .attr("transform", "translate("+margin.left + "," + margin.top + ")");

// Load and process data 
d3.json(url).then(data => {
    
    //setting up positional argument
    positionNumber = 2
    data1 = data.samples

    /*
    -------Defining list for storage----------
    */

    sampleValues = [];
    otuIds = [];
    otuLabels = [];
    /*
    -------Pushing values into list----------
    */

    data1.forEach(d => {
        sampleValues.push(d.sample_values);
        otuLabels.push(d.otu_labels);
        otuIds.push(d.otu_ids)
    });
    
    // console.log(otuLabels); // List of bacteria Names
    // console.log(otuIds); // List of bacteria identifciation numbers
    // console.log(sampleValues); // List of counts of bacteria Ids
   

    data3 = []
    for (i=0;i < data1.length; i++) {
        //console.log(otuIds[i]);
        
        for (j=0; j <otuIds.length; j++) {
        //console.log(otuIds[i][j])
        
        data3.push([otuIds[i][j],sampleValues[i][j]]);

        }
        
    }
   

    
    const sortedIds = data3.map(a => a[0]);
    const sortedValues = data3.map(a => a[1])

    // console.log(sortedIds)
    // console.log(sortedValues)
    //console.log(data3)
    // console.log(data.samples)
    // console.log(sampleValues
    
    /* 
    -------Setting up drop menu down selection----------
    */
    d3.select("#selDataset")
        .selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .attr("value", d=>d)
        .text(d => d)
        ;
    console.log(data1)

    /*
    -------Create a function to check the dropdown menu for updates----------
    */
    
    // Detect change in drop down menu and set selctedData
    let button = d3.select("#selDataset")
    let selectedId = data.samples[0].otu_ids[0]
    
    //Change onchange value to drop down menu selection
    button.on("change", function(event) {
        button.attr("onchange", this.value);
         selectedId = button.attr("onchange")
         //console.log(selectedId);
    })
    

    /*
    -------Select the right data to display----------
    */
    

    /*
    -------Sorting the data----------
    */

    //Sort the data arrays by descending 
    data3.sort((a,b) => b[1] - a[1]);

    /*
    -------Setting up graph dimensions----------
    */

    //Set up x and y scales
    const x = d3.scaleLinear()
        .range([0,width])
        .domain([0, d3.max(sortedValues)]);
    
    const y = d3.scaleBand()
        .range([0,height])
        .padding(0.1)
        .domain(sortedIds.slice(0,10))

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
    .data(sortedValues)
    .enter().append("rect")
    .attr("class","bar")
    .attr("y", function(d) {return y(d)})
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", function(d) {return x(d)})
    .style("fill","skyblue")


});

