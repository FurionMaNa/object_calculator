<?php 
	$data = explode(',',$_POST['imgBase64']);
	$data = str_replace(' ', '+', $data[1]);
	$fname = "printer/screen/".md5($data).".png";
	$fname2 = "screen/".md5($data).".png";
	file_put_contents($fname, base64_decode($data));
	echo $fname2;
?>