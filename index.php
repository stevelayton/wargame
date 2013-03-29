<?php
function print_r_html ($arr) {
  ?><pre><?
    print_r($arr);
    ?></pre><?
}

function dbConnect() {
	$link = mysql_connect('', '', '');
	if (!$link) {
		die('Not connected : ' . mysql_error());
	}

	$db_selected = mysql_select_db('wargameworking', $link);
	if (!$db_selected) {
		die ('Can\'t use foo : ' . mysql_error());
	}
}

function getPlacement($gameId) {
	dbConnect();
	$result = mysql_query("SELECT * FROM gameId_" . $gameId . ";");
	if (!$result) {
		echo("<P>Error performing query: " . mysql_error() . "</p>");
		exit();
	}
	while($row = mysql_fetch_array($result)){
		$return[] = $row;
	}
	return $return;
	print_r_html($return);
}
?>


<!DOCTYPE HTML> 

<html lang="en"><head> 
<meta charset="utf-8">
<title>War Game Work</title> 
<style type="text/css" media="screen"> 
	body {
		background:#eee;
		margin:2em;
	}

	img {
		position:absolute;
	}

	img.imgTest {
		z-index:2
	}

	img.imgBackground {
		z-index:1
	}

	#floater {
		position: fixed;
		left: 10px;
		top: 10px;
		width: 200px;
		padding: 10px 5px;
		text-align: center;
		background-color: #fff;
		border: 5px solid rgba(180, 180, 180, .7);
		-webkit-border-radius: 8px;
		-moz-border-radius: 8px;
		border-radius: 8px;
		display: none;
	}

	#hit {
		position: center;
		left: 10px;
		top: 10px;
		width: 200px;
		padding: 10px 5px;
		text-align: center;
		background-color: #fff;
		border: 5px solid rgba(180, 180, 180, .7);
		-webkit-border-radius: 8px;
		-moz-border-radius: 8px;
		border-radius: 8px;
		display: none;
	}
</style> 
</head>
<body>
<div>
	<img src="grassland.jpg" alt="" name="imgBackground" id="imgBackground">
</div> 

<?php
	echo "<!--";
	 $testing = getPlacement(0);
	 print_r_html($testing);
	echo "!-->";
	$count = 0;
	//remember to check which player is currently on and render opfor tag accordingly.
	$currentPlayer = 1;
	while ($count < count($testing)) {
	$op = '';
	$tracking = $testing[$count]['tracking'];
	$opplayer   = 'player02';
	$pos = strstr($tracking, $opplayer);

	if ($pos == true) {
		$op = 'opfor_';
	}

	echo"<div><img src=\"".$op . $testing[$count]['name'].".png\" alt=\"\" name=\"".$testing[$count]['name']."\" id=\"".$testing[$count]['tracking']."\" class=\"".$testing[$count]['name']."\"  style=\"-webkit-transform: rotate(".$testing[$count]['ang']."deg); left:".$testing[$count]['locX']."px; top:".$testing[$count]['locY']."px;\" ></div>";
	$count++;
	}
?>

<div id="hit">Hit!</div>

<div id="floater">
	<p id="fps"></p>
	<p id="forward">Move forward</p>
	<p id="backward">Move backward</p>
	<p id="face0">Click here to rotate 0 degrees</p>
	<p id="face45">Click here to rotate 45 degrees</p>
	<p id="face90">Click here to rotate 90 degrees</p>
	<p id="face135">Click here to rotate 135 degrees</p>
	<p id="face180">Click here to rotate 180 degrees</p>
	<p id="face225">Click here to rotate 225 degrees</p>
	<p id="face270">Click here to rotate 270 degrees</p>
	<p id="face315">Click here to rotate 315 degrees</p>
	<p id="face360">Click here to rotate 360 degrees</p>
	<p id="ranged">Ranged Attack</p>
</div>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/rotate.js"></script>
<script type="text/javascript" src="js/core.js"></script>
</body>
</html> 