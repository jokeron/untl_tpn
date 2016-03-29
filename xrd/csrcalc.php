<?php
	$title = 'Расчет размера ОКР';
	$style = '../style.css';
	$wayToEmblema = '../common';
	include '../common/begin.php';
	include '../common/body.php';
	echo "<script src='index.js'></script>";
	echo "<div class='main'>";
		echo "<div class = 'maintext animated fadeInUp'>";
			echo "<h1>Расчет размера ОКР</h1>";
			echo "<div class='data'><textarea id='rawData' class='csr'></textarea></div>
				<div class='buttonDiv'><button id='goButton' class='csr'>W-H</button><button id='goSherrerButton' class='csr'>Шеррер</button></div>
				<canvas id='example' width='500' height = '500'></canvas>
				<div id='info'></div>
				<img id='savedImageCopy'>";
// закрытие дива maintext
		echo "</div>";
	include '../common/sidebar.php';
	//echo "<div class='empty></div>";
	// закрытие дива main
	echo "</div>";

	include '../common/footer.php';
?>