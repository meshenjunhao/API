<?php
if($system["prevention"]==true) {
	$ua=$_SERVER['HTTP_USER_AGENT'];
	if(strpos($ua, 'MicroMessenger') == true || strpos($ua, 'Windows Phone') == true) {
		$shielding=true;
	}
	if(strpos($ua, 'QQ') !== false&&strpos($ua, '_SQ_') !== false) {
		$shielding=true;
	}
	if($shielding) {
		require_once Run.'/Api_mac/Api_system/prevention/index.html';
		exit();
	}
}