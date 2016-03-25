points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";

Meteor.startup( function() {
  canvas = new Canvas();
  Session.set('straight-line', true);

  Deps.autorun( function() {
    var data = points.find({}).fetch();

    if (canvas) {
      canvas.draw(data);
    }
  });
});

Template.color_buttons.events({
  "click .js-color-black": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "black";
	},
  "click .js-color-blue": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "blue";
	},
  "click .js-color-brown": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "brown";
	},
  "click .js-color-cyan": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "cyan";
	},
  "click .js-color-green": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "green";
	},
  "click .js-color-grey": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "grey";
	},
  "click .js-color-orange": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "orange";
	},
  "click .js-color-pink": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "pink";
	},
  "click .js-color-purple": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "purple";
	},
  "click .js-color-red": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "red";
	},
  "click .js-color-white": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "white";
	},
  "click .js-color-yellow": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "yellow";
	},
  "click .js-color-salmon": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "salmon";
	},
  "click .js-color-orangered": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "orangered";
	},
  "click .js-color-navy": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "navy";
	},
  "click .js-color-indigo": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "indigo";
	},
  "click .js-color-chocolate": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "chocolate";
	},
  "click .js-color-lime": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "lime";
	},
  "click .js-color-darkblue": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "darkblue";
	},
  "click .js-color-firebrick": function() {
    lastX=0;
    lastY=0;
    	strokeColor = "firebrick";
	}

})

Template.wall.events({
  "click .export": function() {
	 var html = d3.select("svg")
	        .attr("version", 1.1)
        	.attr("xmlns", "http://www.w3.org/2000/svg")
	        .node().parentNode.innerHTML;

	  console.log(html);
	  var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
	  var img = '<img src="'+imgsrc+'">'; 
	  d3.select("#export_canvas").html(img);

	  var canvas = document.querySelector("canvas"),
		  context = canvas.getContext("2d");

	  var image = new Image;
	  image.src = imgsrc;
	  image.onload = function() {
		  context.drawImage(image, 0, 0);

		  var canvasdata = canvas.toDataURL("image/png");

		  var pngimg = '<img src="'+canvasdata+'">'; 
	  	  d3.select("#pngdataurl").html(pngimg);

		  var a = document.createElement("a");
		  a.download = "sample.png";
		  a.href = canvasdata;
		  a.click();
	  };
	},
  "click .straight-line": function() {
        Session.set('straight-line', true);
	},
  "click .dashed-line": function() {
        Session.set('straight-line', false);
	},

  "click button.clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },
  "click button.thicker": function () {
    thickness+=1;
  },
  "click button.thicker10x": function () {
    thickness+=10;
  },
  "click button.thinner10x": function () {
    if (thickness - 11 > 0) {
      thickness-=10;
    }
  },
  "click button.thinner": function () {
    if (thickness > 0) {
      thickness-=1;
    }
  },



})

var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.

      if (lastX==0) {// check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
      points.insert({
        //this draws a point exactly where you click the mouse
      // x: (event.pageX - offset.left),
      // y: (event.pageY - offset.top)});


        //We can do more interesting stuff
        //We need to input data in the right format
        //Then we can send this to d3 for drawing


        //1) Algorithmic mouse follower
      // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
      // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        //2) draw a line - requires you to change the code in drawing.js
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,
        // We could calculate the line thickness from the distance
        // between current position and last position
        //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
        //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
        // Or we could just set the line thickness using buttons and variable
        w: thickness,
        // We can also use strokeColor, defined by a selection
        c: strokeColor,


      }); // end of points.insert()

        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});
