<?php
class safe {
	public function __construct() {
		$this->log=Run."/Api_mac/Api_log/xxs/".date("Y-m-d").".txt";
		//拦截信息
		$this->tips=Run."/Api_mac/Api_set/safe/html/safe.php";
		//提示页面
	}
	public function check($name,$type) {
		if($type=="get") {
			$rule="'|<[^>]*?>|^\\+\/v(8|9)|\\b(and|or)\\b.+?(>|<|=|\\bin\\b|\\blike\\b)|\\/\\*.+?\\*\\/|<\\s*\\/?script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";
		} else if($type=="post") {
			$rule="'|<[^>]*?>|^\\+\/v(8|9)|\\b(and|or)\\b.+?(>|<|=|\\bin\\b|\\blike\\b)|\\/\\*.+?\\*\\/|<\\s*\\/?script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";
		} else if($type=="cookie") {
			$rule = "\\b(and|or)\\b.{1,6}?(=|>|<|\\bin\\b|\\blike\\b)|\\/\\*.+?\\*\\/|<\\s*\\/?script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";
		}
		foreach ($name as $key => $value ) {
			$this->filtration($key,$value,$rule);
		}
	}
	public function filtration($key,$value,$rule) {
		if(preg_match ( "/" . $rule . "/is",$value,$return)==1) {
			$this->storing($key,$value,$return[0]);
		}
		if(preg_match ( "/" . $rule . "/is",$key,$return)==1) {
			$this->storing($key,$value,$return[0]);
		}
	}
	public function storing($key,$value,$rule) {
		$accesslog=[
		    "time"=>time(),
		    "ip"=>getip_user(),
		    "ua"=>$_SERVER["HTTP_USER_AGENT"],
		    "url"=>htmlspecialchars(urldecode($this->geturl())),
		    "rule"=>htmlspecialchars($rule),
		    "Requestmethod"=>$_SERVER['REQUEST_METHOD'],
		];
		write($this->log,json_encode($accesslog)."\n",true);
		include($this->tips);
		header("HTTP/1.1 403 Forbidden");
		exit();
	}
	public function geturl() {
		if(empty($_SERVER['QUERY_STRING'])) {
			return $_SERVER['PHP_SELF'];
		} else {
			return $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
		}
	}
}
$filtration=new safe();
$filtration->check($_GET,"get");
//GET过滤
$filtration->check($_POST,"post");
//POST过滤
$filtration->check($_COOKIE,"cookie");
//COOKIE过滤