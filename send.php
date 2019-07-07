<?php

$headers = 
	'From: '.$email_from."\r\n".
	'Reply-To: '.$email_from."\r\n" .
	'X-Mailer: PHP/' . phpversion();
;

$result = mail(
	'hello@slashwebdesign.studio',
	'Request',
	"Hello, my name is " . $_POST['name'] . " and I would like to discuss " . $_POST['project'] . " with you to get pricing and availability. You can reply to " . $_POST['email'] . " as soon as possible.",
$headers);

header("Content-type: application/json");
echo json_encode($result);