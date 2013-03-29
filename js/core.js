var mode = '';
var activeItem;
console.log(activeItem);
console.log("Mode: " + mode);

//hacked up "stats", will be process and created server side eventually.
//Smoother with objects
//elementId, angle, health
var tankDataTest = ["imgTest", 0, 100];
//console.log("tankDataTest: " + tankDataTest);

var fullDataTest = {};
//var[elementId] = angle: x, health: x, armour: x,
//<img src="tank.png" alt="" name="tank" id="player01tank01" class="tank" style="-webkit-transform: rotate(180deg); left:120px;">
fullDataTest["player01tank01"] = {
	unitName: "Tank",
	angle: 180,
	health: 8,
	ranged: 5,
	melee: 0,
	armor: 4,
	rof: 2
};
fullDataTest["player01tank02"] = {
	unitName: "Tank",
	angle: 180,
	health: 8,
	ranged: 5,
	melee: 0,
	armor: 4,
	rof: 2
};
fullDataTest["player01tank03"] = {
	unitName: "Tank",
	angle: 180,
	health: 8,
	ranged: 5,
	melee: 0,
	armor: 4,
	rof: 2
};
//	fullDataTest["imgTest03"] = {unitName: "Tank", angle: 180, health: 8, ranged: 5, melee: 0, armor: 4, rof: 2};
//	fullDataTest["imgTest04"] = {unitName: "Solider", angle: 180, health: 5, ranged: 3, melee: 2, armor: 3, rof: 1};
//	fullDataTest["imgTest05"] = {unitName: "War Dog", angle: 180, health: 6, ranged: 0, melee: 3, armor: 2, rof: 1};
fullDataTest["player02tank01"] = {
	unitName: "Tank",
	angle: 0,
	health: 8,
	ranged: 5,
	melee: 0,
	armor: 4,
	rof: 2
};
fullDataTest["player02tank02"] = {
	unitName: "Tank",
	angle: 0,
	health: 8,
	ranged: 5,
	melee: 0,
	armor: 4,
	rof: 2
};
fullDataTest["imgTest08"] = {
	unitName: "Solider",
	angle: 0,
	health: 5,
	ranged: 3,
	melee: 2,
	armor: 3,
	rof: 1
};

//console.log("fullDataTest[]: " + fullDataTest);
//console.log("fullDataTest['imgTest']['unitName']: " + fullDataTest["imgTest"]["unitName"]);
//console.log("fullDataTest['imgTest02']['angle']: " + fullDataTest["imgTest02"]["angle"]);

for (key in fullDataTest["imgTest"]) {
	//console.log("key '" + key + "' has value: " + fullDataTest["imgTest"][key]);
}

setInterval(function() {
	//console.log("activeItem == " + activeItem);
	if (activeItem != null) {
		var test = "#" + activeItem;
		var pos = $(test).position();
		//console.log(pos.top);
		//console.log(pos.left);
		//var img = document.getElementById(activeItem); 
		//console.log(img.clientWidth);
		//console.log(img.clientHeight);

		var docHeight = $(document).height();
		var docWidth = $(document).width();
		//console.log("docHeight: " + docHeight);
		//console.log("docWidth: " + docWidth);

		var placementLeft = docWidth - 250;

		$('#floater').css({
			"left": placementLeft + "px"
		});
		$('#floater').show();
	}
}, 30);


$("img").click(function() {
	var clicked = $(this);
	//check if opfor clicked.
	var opforCheck;
	opforCheck = $(this).attr("src")
	if (opforCheck.indexOf("opfor") != 0 && opforCheck.indexOf("destroyed") != 0) {
		if (activeItem == $(this).attr("id")) {
			$('#floater').hide();
			console.log("Inside activeItem == $this");
			activeItem = null;
			var notSelected = clicked.attr("src").slice(9);
			clicked.attr("src", notSelected);
		} else if (activeItem == null) {
			console.log("Inside activeItem == null");
			if ($(this).attr("id") != "imgBackground") {
				activeItem = $(this).attr("id");
				var selected = "selected_" + clicked.attr("src");
				clicked.attr("src", selected);
				if (activeItem != null) {
					var box = document.getElementById(activeItem);
					var pos = getPositions(box);
					//console.log(pos, pos[0], pos[1], pos[2]);
					$("img").each(function(i) {
						var pos2 = getPositions(this);
						var horizontalMatch = comparePositions(pos[0], pos2[0]);
						var verticalMatch = comparePositions(pos[1], pos2[1]);
						var match = horizontalMatch && verticalMatch;
						//$("body").append("<p>box " + (i+1) + " " + $(this).attr("id") + " overlaps the red box? ......... " + match + "</p>");     
					});
				}
			}
		}
	} else if (mode == 'attack') {
		console.log('Getting ready to try and create an attack system. \n Todo: Get stats of both attacker and attacked then do stuff...\n 1d6 attack 1d6 hit, going to need some balancing, will mostly be server side.');
		if (opforCheck.indexOf("opfor") == 0 && fullDataTest[activeItem]["rof"] > 0) {

			var test = "#" + activeItem;
			console.log("Find midpount of activeItem: Start at: " + $(test).offset().left + " is at " + ($(test).offset().left + ($(test).height() / 2)));
			console.log("Find midpount of activeItem: Start at: " + $(test).offset().top + " is at " + ($(test).offset().top + ($(test).width() / 2)));
			var activeTop = ($(test).offset().top + ($(test).height() / 2));
			var activeLeft = ($(test).offset().left + ($(test).width() / 2));
			var box2 = document.getElementById(clicked.attr("id"));
			var pos2 = getPositions(box2);
			console.log(pos2[0][0]);
			console.log(pos2[1][0]);
			console.log(getDistance(pos2[1][0], activeTop, pos2[0][0], activeLeft));
			pos, pos2 = {};


			// Whole section to be moved to server side
			var attackDie = 0;
			var hitDie = 0;
			var attackMulti = 1; //attack maultiplier - in case something ends up with multiple attack die.
			console.log('Clicked on a opfor item at least, activeItem: ' + activeItem + ' and "attacked" item: ' + $(this).attr("id") +
				'\n opfor hp: ' + fullDataTest[clicked.attr("id")]["health"] +
				'\n selected hp: ' + fullDataTest[activeItem]["health"] +
				'\n selected attack: ' + fullDataTest[activeItem]["health"]);
			var defense = 0; //fullDataTest[clicked.attr("id")]["armor"];
			//attackDie = Math.round(Math.random()*5)+1;
			//hitDie = Math.round(Math.random()*5)+1;
			//console.log("Attack roll: " + attackDie + " Hit roll: " + hitDie);
			//if (defense <= attackDie)
			//{
			//fullDataTest[clicked.attr("id")]["health"] = fullDataTest[clicked.attr("id")]["health"] - hitDie;
			//console.log("Health clicked: " + fullDataTest[clicked.attr("id")]["health"]);
			//$.get("http://localhost/battle/serverside.php", { attacker: activeItem, attacked: clicked.attr("id") },
			//  function(data){
			//	 console.log("Data returned: " + data);
			//	 hitDie = data;
			//  });

			$.ajax({
				async: false,
				type: 'GET',
				url: 'http://localhost/battle/serverside.php',
				data: {
					attacker: activeItem,
					attacked: clicked.attr("id")
				},
				success: function(data) {
					console.log("Data returned: " + data);
					hitDie = data;
				}
			});

			fullDataTest[clicked.attr("id")]["health"] = fullDataTest[clicked.attr("id")]["health"] - hitDie;
			console.log("Health clicked: " + fullDataTest[clicked.attr("id")]["health"]);

			$('#hit').html('Hit for ' + hitDie + ' damage!');
			$('#hit').fadeIn(2000);
			$('#hit').fadeOut('slow');
			//}
			//else {
			//	$('#hit').html('Attack missed!');
			///		$('#hit').fadeIn(2000);
			//	$('#hit').fadeOut('slow')
			//}

			//fullDataTest[activeItem]["rof"] = fullDataTest[activeItem]["rof"] - 1;
			console.log("ROF activeItem: " + fullDataTest[activeItem]["rof"]);

			//swap images for destroyed/killed
			if (fullDataTest[clicked.attr("id")]["health"] <= 0) {
				var selected = "destroyed_" + clicked.attr("src");
				clicked.attr("src", selected);
			}
			mode = '';
			/*
	$.get("http://localhost/battle/serverside.php", { attacker: activeItem, attacked: clicked.attr("id") },
	function(data){
	console.log("Data returned: " + data);
	});
	*/
		} else if (fullDataTest[activeItem]["rof"] <= 0) {
			alert("No more attacks for this turn.");
		}
	}

	//console.log("Distance Test: " + getDistance(4, 0, 1, 4));

	console.log("Active item: " + activeItem + ". Clicked: " + clicked.attr("id") + " Mode: " + mode);
});
$("#face0").click(function() {
	facing(0, activeItem);
});
$("#face45").click(function() {
	facing(45, activeItem);
});
$("#face90").click(function() {
	facing(90, activeItem);
});
$("#face135").click(function() {
	facing(135, activeItem);
});
$("#face180").click(function() {
	facing(180, activeItem);
});
$("#face225").click(function() {
	facing(225, activeItem);
});
$("#face270").click(function() {
	facing(270, activeItem);
});
$("#face315").click(function() {
	facing(315, activeItem);
});
$("#face360").click(function() {
	facing(360, activeItem);
});

$("#ranged").click(function() {
	mode = "attack";
	console.log("Mode: " + mode);
});
$("#forward").click(function() {
	var test = "#" + activeItem;
	//var pos = $(test).position();
	//console.log(pos.top);
	//console.log(pos.left);
	//pull current angle from tankDataTest array
	//will need to account for play surface boundraies
	console.log(tankDataTest[1]);
	if (fullDataTest[activeItem]["angle"] == 0) //if (tankDataTest[1] == 0) //up 0px at the top so minus px
	{
		$(test).animate({
			marginTop: "-=20px",
			//				marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 45) //if (tankDataTest[1] == 45) //up at 45 degree angle
	{
		$(test).animate({
			marginTop: "-=20px",
			marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 90) //if (tankDataTest[1] == 90) 
	{
		$(test).animate({
			//				marginTop: "-=20px",
			marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 135) //tankDataTest[1] == 135) 
	{
		$(test).animate({
			marginTop: "+=20px",
			marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 180) //if (tankDataTest[1] == 180) 
	{
		$(test).animate({
			marginTop: "+=20px",
			//				marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 225) //if (tankDataTest[1] == 225) 
	{
		$(test).animate({
			marginTop: "+=20px",
			marginLeft: "-=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 270) //if (tankDataTest[1] == 270) 
	{
		$(test).animate({
			//				marginTop: "+=20px",
			marginLeft: "-=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 315) //if (tankDataTest[1] == 315) 
	{
		$(test).animate({
			marginTop: "-=20px",
			marginLeft: "-=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 360) //if (tankDataTest[1] == 360) 
	{
		$(test).animate({
			marginTop: "-=20px",
			//				marginLeft: "-=20px",
		}, 400);
	}
	//pos = $(test).position();
	//console.log(pos.top);
	//console.log(pos.left);
});
$("#backward").click(function() {
	var test = "#" + activeItem;
	//var pos = $(test).position();
	//console.log(pos.top);
	//console.log(pos.left);
	//pull current angle from tankDataTest array
	//will need to account for play surface boundraies
	//console.log(tankDataTest[1]);
	if (fullDataTest[activeItem]["angle"] == 0) //if (tankDataTest[1] == 0) //up 0px at the top so minus px
	{
		$(test).animate({
			marginTop: "+=20px",
			//				marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 45) //if (tankDataTest[1] == 45) //up at 45 degree angle
	{
		$(test).animate({
			marginTop: "+=20px",
			marginLeft: "-=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 90) //if (tankDataTest[1] == 90) 
	{
		$(test).animate({
			//				marginTop: "-=20px",
			marginLeft: "-=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 135) //if (tankDataTest[1] == 135) 
	{
		$(test).animate({
			marginTop: "-=20px",
			marginLeft: "-=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 180) //if (tankDataTest[1] == 180) 
	{
		$(test).animate({
			marginTop: "-=20px",
			//				marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 225) //if (tankDataTest[1] == 225) 
	{
		$(test).animate({
			marginTop: "-=20px",
			marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 270) //if (tankDataTest[1] == 270) 
	{
		$(test).animate({
			//				marginTop: "+=20px",
			marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 315) //if (tankDataTest[1] == 315) 
	{
		$(test).animate({
			marginTop: "+=20px",
			marginLeft: "+=20px",
		}, 400);
	}
	if (fullDataTest[activeItem]["angle"] == 360) //if (tankDataTest[1] == 360) 
	{
		$(test).animate({
			marginTop: "+=20px",
			//				marginLeft: "-=20px",
		}, 400);
	}
	//pos = $(test).position();
	//console.log(pos.top);
	//console.log(pos.left);
});

jQuery(document).ready(function($) {
	// Show social voter only if the browser is wide enough.
	if ($(window).width() >= 1030)
	//$('#social-float').show();

	// Update when user resizes browser.
	$(window).resize(function() {
		if ($(window).width() < 1030) {
			//$('#social-float').hide();
		} else {
			//$('#social-float').show();
		}
	});
});


function facing(angle, activeItem) {
	var test = "#" + activeItem;
	$(test).animate({
		'rotate': angle
	});
	fullDataTest[activeItem]["angle"] = angle;
}

function getPositions(box) {
	var $box = $(box);
	var pos = $box.position();
	var width = $box.width();
	var height = $box.height();
	return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
}

function comparePositions(p1, p2) {
	var x1 = p1[0] < p2[0] ? p1 : p2;
	var x2 = p1[0] < p2[0] ? p2 : p1;
	return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

//1,2 0,1

function getDistance(x1, x2, y1, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2.0) + Math.pow(y1 - y2, 2.0));
}


$(document).ready(function() {
	//var box = document.getElementById("box");
	//var pos = getPositions(box);

	//$(".other").each(function(i) {          
	//  var pos2 = getPositions(this);
	// var horizontalMatch = comparePositions(pos[0], pos2[0]);
	//var verticalMatch = comparePositions(pos[1], pos2[1]);          
	//var match = horizontalMatch && verticalMatch;               
	// $("body").append("<p>box " + (i+1) + " overlaps the red box? ......... " + match + "</p>");     
	//});
});