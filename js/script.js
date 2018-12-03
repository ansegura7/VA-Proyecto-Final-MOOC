/*********** Start Main Functions **********/

// Init parameters
var ast = [];
ast.data = new Array();
ast.width = 495;
ast.height = 350;
ast.maxItems = 500;

// Init dynamic components
ast.init = () => {

	// Fire main event
	ast.loadData();
}

// Load yearly data and charts
ast.loadData = () => {
	let filepath = "https://raw.githubusercontent.com/ansegura7/VA-Proyecto-Final-MOOC/master/data/";
	let filename = filepath + "StudentsExpectation.csv";
	
	d3.csv(filename).then(
		function(data) {
			let iniExpectAvg = d3.mean(data, (d) => { return +d.InitialExpectID });
			let endExpectAvg = d3.mean(data, (d) => { return +d.EndExpectID });

			// Load and parse data
			data.forEach(function(d, i) {
				d.StudentIx = (i + 1);
				d.StudentID = d.StudentID;
				d.SpendHours = d.SpendHours;
				d.CountryLive = d.CountryLive;
				d.Gender = d.Gender;
				d.AgeRange = d.AgeRange;
				d.EducationLevel = d.EducationLevel;
				d.InitialExpectID = +d.InitialExpectID;
				d.InitialExpectValue = d.InitialExpectValue;
				d.InitialExpectAvg = +iniExpectAvg
				d.EndExpectID = +d.EndExpectID;
				d.EndExpectValue = d.EndExpectValue;
				d.EndExpectAvg = +endExpectAvg;
				ast.data.push(d);
			});

			// Create charts
			ast.createCharts();
		},
		function(error) {
			// Error log message
			console.log(error);
		}
	);
}

ast.createCharts = () => {

	console.log("Filted Data");	console.log(ast.data);

	// Charts variables
	let xVar = "";
	let yVar = "";
	let xTitle = "";
	let yTitle = "";
	let cTitle = "";
	let varList = [];

	// Filtering data
	let filterData = ast.data; //ast.data.filter((d) => { return (d.year >= yearFrom); });
	//console.log("Filted Data");	console.log(filterData);

	// Create stacked data
	varList = ["Antes", "Despues"]; //["0 - N/C", "1 - Poca", "2 - Regular", "3 - Buena", "4 - Muy buena", "5 -Excelente"];
	let stackedData = ast.aggregateData(filterData, varList);
	console.log("Stacked Data"); console.log(stackedData);

	// Chart 1 - Stacked bar chart
	let svgStackedBarChart1 = d3.select("#svgPt1Bars");
	xVar = "Answer";
	xTitle = "Answer Type";
	yTitle = "Students Count";
	ast.doStackedBarChart(stackedData, svgStackedBarChart1, varList, xVar, xTitle, yTitle, cTitle, false);

	// Chart 2 - Line chart
	let svgLineChart1 = d3.select("#svgPt1Lines");
	varList = ["InitialExpectID", "InitialExpectAvg", "EndExpectID", "EndExpectAvg"];
	xVar = "StudentIx"
	xTitle = "Student Index";
	yTitle = "Expectative";
	ast.doMultiSeriesChart(filterData, svgLineChart1, ast.maxItems, xVar, yVar, varList, xTitle, yTitle, cTitle);
}

// Create the Viz Charts
ast.doStackedBarChart = (rawdata, svg, keys, xVar, xTitle, yTitle, cTitle, sortData) => {
	svg.html("");
	if (rawdata == undefined || rawdata.length == 0)
		return;

	// Sort data desc
	let data = [];
	if(sortData)
		rawdata.sort((a, b) => { return b.total - a.total; });
	else
		data = rawdata;

	const margin = {top: 50, right: 20, bottom: 50, left: 50},
		iwidth = ast.width - margin.left - margin.right,
		iheight = ast.height - margin.top - margin.bottom;
	
	// Main graphic
	let g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// set x scale
	var x = d3.scaleBand()
		.rangeRound([0, iwidth])
		.paddingInner(0.25)
		.align(0.5)
		.domain(data.map((d) => { return d[xVar]; }));

	// set y scale
	var y = d3.scaleLinear()
		.rangeRound([iheight, 0])
		.domain([0, d3.max(data, (d) => { return d.total; })])
		.nice();

	// set the colors
	var z = d3.scaleOrdinal()
		.range(["#6b486b", "#ff8c00"]) // ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])
		.domain(keys);

	g.append("g")
		.selectAll("g")
		.data(d3.stack()
			.keys(keys)(data))
		.enter().append("g")
			.attr("fill", (d) => { return z(d.key); })
		.selectAll("rect")
		.data((d) => { return d; })
		.enter()
			.append("rect")
			.attr("x", (d) => { return x(d.data[xVar]); })
			.attr("y", (d) => { return y(d[1]); })
			.attr("height", (d) => { return y(d[0]) - y(d[1]); })
			.attr("width", x.bandwidth())
		.on("mouseover", function() { tooltip.style("display", null); })
		.on("mouseout", function() { tooltip.style("display", "none"); })
		.on("mousemove", function(d) {
			// console.log(d);
			var xPosition = d3.mouse(this)[0] - 5;
			var yPosition = d3.mouse(this)[1] - 5;
			tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
			tooltip.select("text").text(d[1]-d[0]);
	});

	g.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + iheight + ")")
		.call(d3.axisBottom(x));

	g.append("g")
		.attr("class", "axis")
		.call(d3.axisLeft(y)
			.ticks(null, "s"))
		.append("text")
			.attr("x", 2)
			.attr("y", y(y.ticks().pop()) + 0.5)
			.attr("dy", "0.32em")
			.attr("fill", "#000")
			.attr("font-weight", "bold")
			.attr("text-anchor", "start");

	var legend = g.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", 10)
		.attr("text-anchor", "end")
		.selectAll("g")
			.data(keys.slice().reverse())
			.enter().append("g")
			.attr("transform", (d, i) => { return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
		.attr("x", (iwidth - 19))
		.attr("y", (10 - margin.bottom))
		.attr("width", 19)
		.attr("height", 19)
		.attr("fill", z);

	legend.append("text")
		.attr("x", (iwidth - 24))
		.attr("y", (20 - margin.bottom))
		.attr("dy", "0.32em")
		.text((d) => { return d; });

	// Prep the tooltip bits, initial display is hidden
	var tooltip = svg.append("g")
		.attr("class", "tooltip")
		.style("display", "none");
      
	tooltip.append("rect")
		.attr("width", 60)
		.attr("height", 20)
		.attr("fill", "white")
		.style("opacity", 0.5);

	tooltip.append("text")
		.attr("x", 30)
		.attr("dy", "1.2em")
		.style("text-anchor", "middle")
		.attr("font-size", "12px")
		.attr("font-weight", "bold");
	
	// text label for the y axis
	g.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -(iheight / 2))
		.attr("y", -margin.left)
		.attr("dy", "1em")
		.attr("fill", "#000")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(yTitle);
	
	// text label for the x axis
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", iheight + (margin.bottom / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(xTitle); 

	return svg.node();
}

// Create Multi-Series chart
ast.doMultiSeriesChart = (rawdata, svg, maxItems, xVar, yVar, varList, xTitle, yTitle, cTitle) => {
	svg.html("");
	if (rawdata == undefined || rawdata.length == 0)
		return;
	
	const margin = {top: 50, right: 20, bottom: 50, left: 50},
		iwidth = ast.width - margin.left - margin.right,
		iheight = ast.height - margin.top - margin.bottom;

	// Manipulate data
	const lineData = rawdata.slice(0, rawdata.length);
	const varData = varList.map((id) => {
		return {
			id: id,
			values: lineData.map((d) => {
				return {index: +d[xVar], value: +d[id]};
			})
		};
	});
	
	// Create axis
	const x = d3.scaleLinear()
		.domain([1, rawdata.length])
		.range([0, iwidth]);

	const y = d3.scaleLinear()
		.domain([0, 5])
		.range([iheight, 0]);

	const z = d3.scaleOrdinal(d3.schemeCategory10)
		.domain(varData.map((c) => { return c.id; }));

	var line = d3.line()
	    .curve(d3.curveBasis)
		.x((d) => x(d.index))
		.y((d) => y(d.value));

	const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + iheight + ")")
		.call(d3.axisBottom(x));
	
	// text label for the y axis
	g.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -(iheight / 2))
		.attr("y", -margin.left)
		.attr("dy", "1em")
		.attr("fill", "#000")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(yTitle);
	
	// text label for the x axis
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", iheight + (margin.bottom / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "11pt")
		.text(xTitle); 
	
	// add title
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", (10 - margin.top))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "16pt")
		.text(cTitle)
		.style("color", "steelblue");
	
	var vars = g.selectAll(".vars")
		.data(varData)
		.enter().append("g")
		.attr("class", "vars");
	
	vars.append("path")
		.attr("class", "line")
		.attr("d", (d) => { return line(d.values); })
		.style("stroke", (d) => { return z(d.id); })
		.style("fill", "none");
	
	vars.append("text")
		.datum((d) => { return {id: d.id, value: d.values[0]}; }) // d.values.length - 1
		.attr("transform", (d) => { return "translate(" + x(d.value.index) + "," + y(d.value.value) + ")"; })
		.attr("x", 2)
		.attr("dy", "0.35em")
		.style("font-family", "sans-serif")
		.style("font-size", "10pt")
		// .text((d) => d.id);

	var mouseG = g.append( "g" )
		.attr("class", "mouse-over-effects");

	mouseG.append("path") // this is the black vertical line to follow mouse
		.attr("class", "mouse-line")
		.style("stroke", "black")
		.style("stroke-width", "1px")
		.style("opacity", "0");

	mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
		.attr('width', iwidth) // can't catch mouse events on a g element
		.attr('height', iheight)
		.attr('fill', 'none')
		.attr('pointer-events', 'all')
			.on('mouseout', function() { // on mouse out hide line, circles and text
				d3.select(".mouse-line")
					.style("opacity", "0");
				d3.selectAll(".mouse-per-line circle")
					.style("opacity", "0");
				d3.selectAll(".mouse-per-line text")
					.style("opacity", "0");
			})
			.on('mouseover', function() { // on mouse in show line, circles and text
				d3.select(".mouse-line")
					.style("opacity", "1");
				d3.selectAll(".mouse-per-line circle")
					.style("opacity", "1");
				d3.selectAll(".mouse-per-line text")
					.style("opacity", "1");
			})
			.on('mousemove', function() { // mouse moving over canvas
				var mouse = d3.mouse(this);
				d3.select(".mouse-line")
					.attr("d", () => {
						var d = "M" + mouse[0] + "," + iheight;
						d += " " + mouse[0] + "," + 0;
						return d;
					});
			});

	return svg.node();
}

// Aggregate data by gender
ast.aggregateData = (data, varList) => {

	// Aggregate data
	let aggData = [];
	
	aggData.push({"Answer": "0 - N/C", "Antes": 1, "Despues": 1, "total": 2});
	aggData.push({"Answer": "1 - Poca", "Antes": 33, "Despues": 0, "total": 33});
	aggData.push({"Answer": "2 - Regular", "Antes": 114, "Despues": 3, "total": 117});
	aggData.push({"Answer": "3 - Buena", "Antes": 114, "Despues": 14, "total": 128});
	aggData.push({"Answer": "4 - Muy buena", "Antes": 31, "Despues": 118, "total": 149});
	aggData.push({"Answer": "5 - Excelente", "Antes": 13, "Despues": 170, "total": 183});

	return aggData
}

/*********** End Main Functions ************/

/********* Start Utility Functions *********/

// Add data types to ComboBox
ast.addComboBoxData = (cmbID, varList, defValue) => {
	var options = d3.select(cmbID);

	const addItem = (d, i) => options
		.append("option")
		.text(d)
		.attr("value", d)
		.property("selected", (d == defValue));

	// Calls addLi for each item on the array
	// console.log(varList);
	varList.forEach(addItem);
}

// Get Fixed Number
ast.toFixedNumber = (value, mult, dec) => {
	if(ast.isNumeric(value))
		return (mult * value).toFixed(dec);
	return 0;
}

// IsNumeric function in Javascript
ast.isNumeric = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

// Get distinct values from JSON array
ast.getDistinctValues = (items, field) => {
	var lookup = {};
	var result = [];

	for (var item, i = 0; item = items[i++];) {
		var name = item[field];

		if (!(name in lookup)) {
			lookup[name] = 1;
			result.push(name);
		}
	}

	return result.sort();
}

// Clone a JSON object
ast.cloneJSON = (obj) => {
	if(obj == undefined)
		return {};
	return JSON.parse(JSON.stringify(obj)); 
}

ast.addCounterToDict = (dict, elem) => {
	elem = elem.trim();
	if (!(elem in dict))
		dict[elem] = 1;
	else
		dict[elem]++;
}

ast.addDictToJsonArray = (list, dict, category) => {
	let node = {};
	for(var k in dict) {
		node = { name: k, group: category, count: dict[k] }
		list.push(node);
	}
}

ast.addDictToJsonArrayWithSplit = (list, dict, token) => {
	let node = {};
	for(var k in dict) {
		let params = ("" + k).split(token);
		let s = params[0];
		let t = params[1];
		node = { source: s, target: t , count: 0} //dict[k]}
		list.push(node);
	}
}

ast.titleCase = (str) => {
	var splitStr = str.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	}
	return splitStr.join(' ').trim(); 
}

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ast.titleCase(ret.join( '' ));
  }
 
})();

ast.getMinValue = (data, varname) => {
	return d3.min(data, (d) => d[varname]);
}
ast.getMaxValue = (data, varname) => {
	return d3.max(data, (d) => d[varname]);
}
/********** End Utility Fundtions **********/