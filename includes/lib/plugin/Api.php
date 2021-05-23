<?php
header('Content-Type: text/html;charset=utf-8');
//指定允许其他域名访问  
header('Access-Control-Allow-Origin:*'); 
// 响应头设置  
header('Access-Control-Allow-Headers:x-requested-with,content-type');
api();
//Api调用统计
if(class_exists('redis')) {
	$redis = new redis();
	$redis->connect('127.0.0.1', 6379);
}
define('cache',Run.'/Api_mac/Api_cache/'.$return[3]);
if(is_dir(cache)==false) {
	mkdir(cache,0777,true);
}
function get_api_cache($key,$return=false) {
	global $redis;
	$cache = $redis->get($key);
	if(empty($cache)==false) {
		if($return) {
			return $cache;
		} else {
			header('Content-type: application/json');
			echo $cache;
			exit();
		}
	} else {
		return false;
	}
}
function put_api_cache($key,$msg,$time=(60*60*12)) {
	global $redis;
	$redis->setex($key,$time,$msg);
}