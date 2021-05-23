<?php
class cc {
	public $safe;
	//防火墙配置信息
	public function __construct($safe) {
		$this->cycle=$safe["cycle"];
		//访问周期(秒)
		$this->frequency=$safe["frequency"];
		//访问频率(次)
		$this->lockdown=$safe["lockdown"];
		//封锁时间(秒)
		$this->id=md5(getip_user().$_REQUEST["q"]);
		//身份证(识别码)
		$this->route=Run."/Api_mac/Api_log/cc/".$this->id.".json";
		//储存路径
		$this->log=Run."/Api_mac/Api_log/accesslog/".date("Y-m-d").".txt";
		//访问日志储存路径
	}
	public function check() {
		if(file_exists($this->route)) {
			$ccdata=json_decode(file_get_contents($this->route),true);
			if($ccdata["lockdown"]) {
				//已被拉黑
				if($ccdata["lockdown_time"]>=time()) {
					//封锁中
					header("HTTP/1.0 444");
					//设置状态码
					exit();
				} else {
					//封锁结束
					$ccdata["lockdown"]=false;
					unset($ccdata["lockdown_time"]);
					//删除无用变量
					$this->write($this->route,json_encode($ccdata));
					//保存数据
				}
			}
			if($ccdata["end"]>=time()&&($ccdata["frequency"]+1)>=$this->frequency) {
				//超出最高访问限制
				$ccdata["frequency"]=0;
				$ccdata["start"]=0;
				$ccdata["end"]=0;
				$ccdata["lockdown"]=true;
				$ccdata["lockdown_time"]=time()+$this->lockdown;
				$this->write($this->route,json_encode($ccdata));
				//保存数据
				header("HTTP/1.0 444");
				//设置状态码
				exit();
			} else {
				$this->monitor($ccdata);
				//监控
			}
		} else {
			$ccdata=array(
			    "start"=>time(),
			    "end"=>time()+$this->cycle,
			    "frequency"=>1,
			    "lockdown"=>false,
			    );
			$this->write($this->route,json_encode($ccdata));
			//初始化文件
		}
	}
	public function monitor($ccdata=false) {
		if(!$ccdata) {
			$ccdata=json_decode(file_get_contents($this->route),true);
		}
		if($ccdata["end"]<=time()) {
			//数据过期
			$ccdata["start"]=time();
			$ccdata["end"]=time()+$this->cycle;
			$ccdata["frequency"]+=1;
		} else {
			$ccdata["frequency"]+=1;
		}
		$this->write($this->route,json_encode($ccdata));
		//保存数据
	}
	public function accesslog() {
		$accesslog=[
		    "time"=>time(),
		    "ip"=>getip_user(),
		    "ua"=>$_SERVER["HTTP_USER_AGENT"],
		    "url"=>htmlspecialchars($this->geturl()),
		    "Requestmethod"=>$_SERVER['REQUEST_METHOD'],
		];
		$this->write($this->log,json_encode($accesslog)."\n",true);
	}
	public function geturl() {
		if(empty($_SERVER['QUERY_STRING'])) {
			return $_SERVER['PHP_SELF'];
		} else {
			return $_SERVER['REQUEST_URI'];
		}
	}
	public function write($route,$contents,$cover=false) {
		$fp = fopen($route,($cover?"a":"w"));
		if (flock($fp, LOCK_EX)) {
			fwrite($fp,$contents);
			flock($fp , LOCK_UN);
		} else {
			return false;
		}
		fclose($fp);
		return true;
	}
}
$defend=new cc($safe);
if($safe["ccproof"]) {
	$defend->check();
}
if($safe["accesslog"]) {
	$defend->accesslog();
}