<?php
if (version_compare(PHP_VERSION, '5.6.0', '<')) {
	die('require PHP > 5.6 !');
}
if(!file_exists('./Api_mac/Api_set/install.lock')) {
	die('<a href="/install">请先安装！</a><br><br><h3>视频安装教程：</h3><br>1.<a href="/install/play.php?source=bt">宝塔安装教程</a><br>1.<a href="/install/play.php?source=kangle">kangle安装教程</a><br><br><h1>觉得视频卡顿？<br>可打开/install/mp4/文件夹查看</h1>');
} else {
	if(is_dir('./install/')) {
		die('请先删除install文件夹');
	}
}
define('in_Inside',true);
include('./public/index.php');