<?php
date_default_timezone_set('Asia/Shanghai');
//设置时区
session_start();
//开启session
define('in_system',true);
//文件保护
define('Debugging',true);
//调试模式
if(defined('in_Inside')) {
	$Run=$_SERVER['DOCUMENT_ROOT'];
} else {
	$Run='../';
}
//程序根目录
require $Run.'/includes/common.php';
// 加载引导文件
require $Run.'/includes/start.php';
// 加载模板引擎