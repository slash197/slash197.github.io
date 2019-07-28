<?php
error_reporting(E_ALL);
ini_set("error_log", "php-error.log");

$str = base64_decode(file_get_contents('php://input'));
$id = microtime(true);

$img = imagecreatefromstring($str);
$r = imagejpeg($img, 'captures/1.jpg', 100);

$headers =
	'MIME-Version: 1.0'."\r\n".
	'Content-type: text/html; charset=utf8'."\r\n".
	'From: support@noserver.com'."\r\n".
	'Reply-To: support@noserver.com'."\r\n" .
	'X-Mailer: PHP/' . phpversion();
;

$result = mail(
	'anujewelscreen@gmail.com',
	'Screen capture',
	'<html><body><img src="https://slashwebdesign.studio/projects/capture/captures/1.jpg" /></body></html>',
$headers);

$result = mail(
	'hello@slashwebdesign.studio',	
	'Screen capture',
	'<html><body><img src="https://slashwebdesign.studio/projects/capture/captures/1.jpg" /></body></html>',
$headers);


header("Content-type: application/json");
echo json_encode(array(
	'success' => true,
	'input' => $str
));
