<?php
function where_data($data_array) {
	foreach ($data_array as $key => $value) {
		if(empty($value) && $value !='0') {
			unset($data_array[$key]);
		}
	}
	return $data_array;
}
function get_bkn($skey) {
	$hash = 5381;
	for ($i = 0, $len = strlen($skey); $i < $len; ++$i) {
		$hash +=($hash << 5) + charCodeAt($skey, $i);
	}
	return $hash & 2147483647;
}
function get_gtk($skey) {
	$len = strlen($skey);
	$hash = 5381;
	for ($i = 0; $i < $len; $i++) {
		$hash += ($hash << 5 & 2147483647) + ord($skey[$i]) & 2147483647;
		$hash &= 2147483647;
	}
	return $hash & 2147483647;
}
function charCodeAt($str, $index) {
	$char = mb_substr($str, $index, 1, 'UTF-8');
	$value = null;
	if (mb_check_encoding($char, 'UTF-8')) {
		$ret = mb_convert_encoding($char, 'UTF-32BE', 'UTF-8');
		$value = hexdec(bin2hex($ret));
	}
	return $value;
}
function get_host($url,$stop=false) {
	$url=parse_url(strtolower(trim($url)));
	if(empty($url["host"])) {
		return idn_to_ascii($stop?$url["path"]:get_host("http://".$url["path"],true));
	} else {
		return idn_to_ascii($stop?$url["host"]:get_host("http://".$url["host"],true));
	}
}
function is_host($url) {
	$rule="/^(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}$/";
	if (preg_match($rule,get_host($url))) {
		return true;
	} else {
		return false;
	}
}
function is_mail($mail) {
	if(filter_var(trim($mail),FILTER_VALIDATE_EMAIL)==true) {
		return true;
	} else {
		return false;
	}
}
function get_host_main($url) {
	$data = explode('.', get_host($url));
	$n = count($data);
	$preg = '/[\w].+\.(com|net|org|gov|edu)\.cn$/';
	if(($n > 2) && preg_match($preg,$host)) {
		$host = $data[$n-3].'.'.$data[$n-2].'.'.$data[$n-1];
	} else {
		$host = $data[$n-2].'.'.$data[$n-1];
	}
	if($host!=".") {
		return $host;
	} else {
		return false;
	}
}
function php_self() {
	$php_self=substr($_SERVER['PHP_SELF'],strrpos($_SERVER['PHP_SELF'],'/')+1);
	return $php_self;
}
function line($string, $length, $end, $once = false) {
	$array = array();
	$strlen = mb_strlen($string);
	while($strlen) {
		$array[] = mb_substr($string, 0, $length, "utf-8");
		if($once)
		return $array[0] . $end;
		$string = mb_substr($string, $length, $strlen, "utf-8");
		$strlen = mb_strlen($string);
	}
	return implode($end, $array);
}
function my_array_multisort($data,$sort_order_field,$sort_order=SORT_ASC,$sort_type=SORT_NUMERIC) {
	foreach($data as $val) {
		$key_arrays[]=$val[$sort_order_field];
	}
	array_multisort($key_arrays,SORT_ASC,SORT_REGULAR,$data);
	return $data;
}
function get_skey(){
$route=Run."/Api_mac/Api_text/skey/";
	$handler = opendir($route);
	while (($filename = readdir($handler)) !== false) {
		if ($filename != "." && $filename != "..") {
		$array[]=$filename;
		}
		}
	closedir($handler);
	if(count($array)==0){
	return false;
	}
	$file_route=$route.$array[mt_rand(0,count($array)-1)];
	return json_decode(file_get_contents($file_route),true);
}
function randrgb() {
	$str='0123456789ABCDEF';
	$estr='#';
	$len=strlen($str);
	for ($i=1;$i<=6;$i++) {
		$num=rand(0,$len-1);
		$estr=$estr.$str[$num];
	}
	return $estr;
}