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
    data1 = data.samples
    sampleValues = [];
    otuIds = [];
    otuLabels = [];

    data1.forEach(d => {
        sampleValues.push(d.sample_values);
        otuLabels.push(d.otu_labels);
        otuIds.push(d.otu_ids)
    });
    
    // console.log(data1)
    // console.log(otuLabels); // List of bacteria Names
    // console.log(otuIds); // List of bacteria identifciation numbers
    // console.log(sampleValues); // List of counts of bacteria Ids
    //data2 = data1[0].
    data3 = []
    for (i=0;i < data1.length; i++) {
        //console.log(otuIds[i]);
        
        for (j=0; j <otuIds.length; j++) {
        //console.log(otuIds[i][j])
        
        data3.push([otuIds[i][j],sampleValues[i][j]]);

        }
        
    }

    //console.log(data3);
    
    //Sort the data arrays by descending 
    data3.sort((a,b) => b[1] - a[1]);
    //console.log(data3)
    // console.log(data.samples)
    // console.log(sampleValues
    


    //Set up x and y scales
    const x = d3.scaleLinear()
        .range([0,width])
        .domain([0, d3.max(sampleValues)]);
    
    const y = d3.scaleBand()
        .range([height,0])
        .padding(0.1)
        .domain(data1[0].sample_values.sort(d3.descending).slice(0,10).otu_ids);

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
    .data(data1)
    .enter().append("rect")
    .attr("class","bar")
    .attr("y",function (d) {return y(d.otu_ids)})
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", function (d) {return x(d.sample_values);})
    .style("fill","skyblue")
});

