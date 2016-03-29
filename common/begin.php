<?
	echo "<!DOCTYPE html>
			<html>
			<head>
				<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
				<link rel='stylesheet' href='$style' type='text/css'/>
				<link rel='stylesheet' href='$wayToEmblema/animate.min.css' type='text/css'/>
				<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js'></script>
				<script>
   					$(document).ready(function() {
    					$('p.menu').hover(
     						function() {
     							$(this).addClass('animated');
      							$(this).addClass('pulse'); // Добавляем класс bounce
     						},
     						function() {
     							$(this).addClass('animated');
      							$(this).removeClass('pulse'); // Убираем класс
     						}
    					)
					})
  				</script>
				<title>$title</title>
			</head>";
?>