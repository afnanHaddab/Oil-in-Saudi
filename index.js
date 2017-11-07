$(document).ready(function () {
  var text = [{key:"time_period", values:[]}];
        var count=[{key:"total_millions_of_barrels", values:[]}];

        var obj=[];
        d3.json('https://datasource.kapsarc.org/api/records/1.0/search/?dataset=saudi-crude-oil-production-from-sama-annual-statistics-2015-dec&rows=13&sort=time_period&facet=time_period',function(error,data){
          var value = [];
          var value2=[];
          var temp;
          var temp2;


          $.each( data.records, function( key, val ) {
            $.each( val.fields, function( key2, val2  ) {
              if (key2=="time_period" ){
                temp =val2;
                value.push( {  time_period : val2 }  );}
                if (key2=="total_millions_of_barrels"){ 
                  temp2 =val2;
                  value2.push({total_millions_of_barrels: val2} );  

                }

              });
            obj.push({text: temp ,count: temp2 });

          }); 

  var bubbleChart = new d3.svg.BubbleChart({
    supportResponsive: true,
    //container: => use @default
    size: 600,
    //viewBoxSize: => use @default
    innerRadius: 600 / 3.5,
    //outerRadius: => use @default
    radiusMin: 50,
    //radiusMax: use @default
    //intersectDelta: use @default
    //intersectInc: use @default
    // circleColor: ['black','red'],
    // {style:("fill", "#000000")},

 // data: {
 //      items: [
 //      obj
       
 //      ],
 //      }
    data: {
      items: [
        obj[0],
        obj[1],
        obj[2],
        obj[3],
        obj[4],
        obj[5],
        obj[6],
        obj[7],
        obj[8],
        obj[9],
        obj[10]
      ],

      eval: function (item) {return item.count;
      
      
},
      classed: function (item) {
                    

        return item.text.split(" ").join("");}
    },
    plugins: [
      {

        name: "central-click",
        options: {
          text: "(Millions of Barrels)",
          style: {
            "font-size": "12px",
            "font-style": "italic",
            "font-family": "Source Sans Pro, sans-serif",
            //"font-weight": "700",
            "text-anchor": "middle",
            "fill": "white"
          },
          attr: {dy: "65px"},
          centralClick: function() {
            alert("Here is more details!!");
          }
        }
      },
      {
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "count",
              classed: {count: true},
              style: {
                "font-size": "28px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #1
              textField: "text",
              classed: {text: true},
              style: {
                "font-size": "14px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "20px",

                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            }
          ],
          centralFormat: [
            {// Line #0
              style: {"font-size": "50px"},
              attr: {}
            },
            {// Line #1
              style: {"font-size": "30px"},
              attr: {dy: "40px"}
            }
          ]
        }
      }]
  });
});});

