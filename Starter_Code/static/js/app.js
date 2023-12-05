//defining url link
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Reading samples.json using D3

d3.json(url).then(function(data) {
    console.log(data);
    console.log(data.samples);
    
    // get values for the bar chart
    let sampleValues = []
    for (let i = 0; i < 10; i ++) {
        sampleValues.push(data.samples[i]['sample_values'])
    }
    console.log(sampleValues);

    let otuIds = []
    for (let i = 0; i < 10; i ++) {
        otuIds.push(data.samples[i]['otu_ids'])
}
    console.log(otuIds);

    let otuLabels = []
    for (let i = 0; i < 10; i ++) {
        otuLabels.push(data.samples[i]['otu_labels'])
}
    console.log(otuLabels);

    let data1 = {
        "x": sampleValues,
        "y": otuIds
    }
    // Plotting graph
    //defining function 
    function init() {
        let data = [{
          values: data1,
          labels: otuIds,
          type: "bar"
        }];
      
        let layout = {
          height: 600,
          width: 800
        };
      
        Plotly.newPlot("bar", data, layout);
      };
    
      init();
});


