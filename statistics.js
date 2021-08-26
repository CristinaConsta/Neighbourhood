'use strict';

function randomRGB() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

window.chartColors = {
	green: '#75c181', // rgba(117,193,129, 1)
	blue: '#5b99ea', // rgba(91,153,234, 1)
	gray: '#a9b5c9',
	text: '#252930',
	border: '#e7e9ed'
};

/* Random number generator for demo purpose */
var randomDataPoint = function () { return Math.round(Math.random() * 100) };

//Crimes by mounth

//prepare the data from json
let url1 = "/json2";
var incidents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //12 months

fetch(url1)
    .then(res => res.json())
    .then(out1 => {
        for (var i = 0; i < out1.length; i++) {
            incidents[out1[i]._id - 1] = out1[i].count; //the data for the months inside posts
        }
		var lineChartConfig = {
			type: 'line',
		
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: [{
					label: 'Incidents',
					backgroundColor: "rgba(117,193,129,0.2)",
					borderColor: "rgba(117,193,129, 0.8)",
					data: incidents,
				}]
			},
			options: {
				responsive: true,
		
				legend: {
					display: true,
					position: 'bottom',
					align: 'end',
				},
		
				tooltips: {
					mode: 'index',
					intersect: false,
					titleMarginBottom: 10,
					bodySpacing: 10,
					xPadding: 16,
					yPadding: 16,
					borderColor: window.chartColors.border,
					borderWidth: 1,
					backgroundColor: '#fff',
					bodyFontColor: window.chartColors.text,
					titleFontColor: window.chartColors.text,
					callbacks: {
						label: function (tooltipItem, data) {
							return tooltipItem.value;
						}
					},
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						gridLines: {
							drawBorder: false,
							color: window.chartColors.border,
						},
						scaleLabel: {
							display: false,
		
						}
					}],
					yAxes: [{
						display: true,
						gridLines: {
							drawBorder: false,
							color: window.chartColors.border,
						},
						scaleLabel: {
							display: false,
						},
						ticks: {
							beginAtZero: true,
							userCallback: function (value, index, values) {
								return value.toLocaleString();
							}
						},
					}]
				}
			}
		};
		var lineChart = document.getElementById('chart-line').getContext('2d');
		window.myLine = new Chart(lineChart, lineChartConfig);
		
	})
	

//Crimes by Borough

let url3="/json3";
var Boroughs=[];
var incidentNo=[];
var bgColors=[];

fetch(url3)
	.then(res => res.json())
	.then(out3 => {
		for (var i = 0; i < out3.length; i++) {
			Boroughs[i] = out3[i]._id;
			incidentNo[i] = out3[i].count;
	}
	var barChartConfig = {
		type: 'bar',
	
		data: {
			labels: Boroughs,
			datasets: [{
				label: 'Incidents',
				backgroundColor: "rgba(117,193,129,0.8)", 
				hoverBackgroundColor: "rgba(117,193,129,1)",
					
				data: incidentNo
			}, 
			]
		},
		options: {
			responsive: true,
			legend: {
				position: 'bottom',
				align: 'end',
			},
	
			tooltips: {
				mode: 'index',
				intersect: false,
				titleMarginBottom: 10,
				bodySpacing: 10,
				xPadding: 16,
				yPadding: 16,
				borderColor: window.chartColors.border,
				borderWidth: 1,
				backgroundColor: '#fff',
				bodyFontColor: window.chartColors.text,
				titleFontColor: window.chartColors.text,
				callbacks: {
					label: function(tooltipItem, data) {	                 
						return tooltipItem.value + '%';   
					}
				},
				
	
			},
			scales: {
				xAxes: [{
					display: true,
					gridLines: {
						drawBorder: false,
						color: window.chartColors.border,
					},
	
				}],
				yAxes: [{
					display: true,
					gridLines: {
						drawBorder: false,
						color: window.chartColors.borders,
					},
					ticks: {
						beginAtZero: true,
						userCallback: function(value, index, values) {
							return value + '%';  
						}
					},
	
					
				}]
			}
			
		}
	}
	var barChart = document.getElementById('chart-bar').getContext('2d');
	window.myBar = new Chart(barChart, barChartConfig);
	
     })
	
//  Crimes by type

let url2="/json1";
var crimeNames=[];
var crimes=[];
var bgColors=[];

fetch(url2)
	.then(res => res.json())
	.then(out2 => {
		for (var i = 0; i < out2.length; i++) {
			crimeNames[i] = out2[i]._id;
			crimes[i] = out2[i].count;
			bgColors[i] = randomRGB();
        }
			 
var pieChartConfig = {
	type: 'pie',
	data: {
		datasets: [{
			data: crimes,
			backgroundColor: bgColors,
			label: 'Dataset 1'
		}],
		labels: crimeNames
	},
	options: {
		responsive: true,
		legend: {
			display: true,
			position: 'bottom',
			align: 'center',
		},

		tooltips: {
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,
			
			/* Display % in tooltip - https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages */
			callbacks: {
                label: function(tooltipItem, data) {
					//get the concerned dataset
					var dataset = data.datasets[tooltipItem.datasetIndex];
					//calculate the total of this data set
					var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
					return previousValue + currentValue;
					});
					//get the current items value
					var currentValue = dataset.data[tooltipItem.index];
					//calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
					var percentage = Math.floor(((currentValue/total) * 100)+0.5);
					
					return percentage + "%";
			    },
            },
			

		},
	}
};

		var pieChart = document.getElementById('chart-pie').getContext('2d');
		window.myPie = new Chart(pieChart, pieChartConfig);
     })

//Crimes by City

let url4="/json4";
var cities=[];
var incidentNumber=[];
var bColors=[];

fetch(url4)
	.then(res => res.json())
	.then(out4 => {
		for (var i = 0; i < out4.length; i++) {
			cities[i] = out4[i]._id;
			incidentNumber[i] = out4[i].count;
			bColors[i] = randomRGB();
		}

		var doughnutChartConfig = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: incidentNumber,
					backgroundColor: bColors,
					label: 'Dataset 1'
				}],
				labels: cities
			},
			options: {
				responsive: true,
				legend: {
					display: true,
					position: 'bottom',
					align: 'center',
				},
		
				tooltips: {
					titleMarginBottom: 10,
					bodySpacing: 10,
					xPadding: 16,
					yPadding: 16,
					borderColor: window.chartColors.border,
					borderWidth: 1,
					backgroundColor: '#fff',
					bodyFontColor: window.chartColors.text,
					titleFontColor: window.chartColors.text,
					
					animation: {
						animateScale: true,
						animateRotate: true
					},
					
					/* Display % in tooltip - https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages */
					callbacks: {
						label: function(tooltipItem, data) {
							//get the concerned dataset
							var dataset = data.datasets[tooltipItem.datasetIndex];
							//calculate the total of this data set
							var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
							return previousValue + currentValue;
							});
							//get the current items value
							var currentValue = dataset.data[tooltipItem.index];
							//calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
							var percentage = Math.floor(((currentValue/total) * 100)+0.5);
							
							return percentage + "%";
						},
					},
					
		
				},
			}
		};

		var doughnutChart = document.getElementById('chart-doughnut').getContext('2d');
		window.myDoughnut = new Chart(doughnutChart, doughnutChartConfig);
	})
