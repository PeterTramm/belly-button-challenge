//defining url link
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Reading samples.json using D3

d3.json(url).then(function(data) {
    console.log(data)})

/*
Create a horizontal bar chart with a drop down menu
to display the top 10 OTU found
*/


//Get the values for the bar chart 


