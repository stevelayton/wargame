<?php
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

function getGameId(){
	return 0;
}

function getInfoByItem($item) {
	//get 
	dbconnect();
	$gameId = getGameId();
	$item = mysql_real_escape_string($item);
	$result = mysql_query("SELECT * FROM gameId_". $gameId ." WHERE tracking = '" . $item . "' LIMIT 1;");
	if (!$result) {
		echo("<P>Error performing query: " . mysql_error() . "</p>");
		exit();
	}
	$row = mysql_fetch_array($result);
	return $row;
}

function roll() {
	//roll 1d6.
	return rand(1,6);
}

function getDef($item) {
	//return defense for item.

	dbconnect();
	$gameId = getGameId();
	$item = mysql_real_escape_string($item);
	$result = mysql_query("SELECT * FROM gameId_". $gameId ." WHERE tracking = '" . $item . "' LIMIT 1;");
	if (!$result) {
		echo("<P>Error performing query: " . mysql_error() . "</p>");
		exit();
	}
	$row = mysql_fetch_array($result);

	$name = $row['name'];
	$result = mysql_query("SELECT * FROM stats WHERE name = '" . $name . "' LIMIT 1;");
	if (!$result) {
		echo("<P>Error performing query: " . mysql_error() . "</p>");
		exit();
	}
	$row = mysql_fetch_array($result);

	return $row['arm'];
}

function getHp($item) {
	//return hp for item.

	//temp
	return 6;
}

function setHp($item) {
	//set new hp for item.
}

function attack($activeItem, $attackedItem) {
	//getDef, checkDef against attack roll, hit?, setHP if so.
	$damage = 0;
	$def = getDef($attackedItem);
	if ($def <= roll()) {
		$damage = roll();
		$hp = getHp($attackedItem);
		$hp = $hp - $damage;
		setHp($hp);
	}
	return $damage;
}

function distance($x2, $x1, $y2, $y1) {
}

function rotate($activeItem, $ang) {

	//insert current $ang into db.

}

function move($activeItem) {

	//insert move action into db.
}

function destroyed($attackedItem) {

	//something destroyed? mark it.
}

function currentStats($item) {
	//return the current stats of the item requested.
}

echo attack($_GET['attacker'],$_GET['attacked']);
function print_r_html ($arr) {
  ?><pre><?
    print_r($arr);
    ?></pre><?
}
//print_r_html($_GET);
//print_r_html(getInfoByItem('player01tank01'));
//print_r_html(getDef('player01tank01'));
?>