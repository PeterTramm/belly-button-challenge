//defining url link
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Reading samples.json using D3
let a = d3.json(url).then(function(data) {
    console.log(data)
})
b = [
    {id: '1', value:10, region:'aus'},
    {id: '2', value:1, region:'anz'},
    {id: '3', value:0, region:'com'},
]
/*
Create a horizontal bar chart with a drop down menu
to display the top 10 OTU found
*/

d3.select(".container").select('.row:nth-child(2)').select('.col-md-2').select('.well').select('select').append('button').text("hello")

//Get the values for the bar chart 
