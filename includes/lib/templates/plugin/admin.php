<?php
switch($filename) {
	case "config"://网站配置
	if(empty($_POST["run"])) {
		exit(json(-1,"error","后台目录不能为空！"));
	} else if(empty($_POST["logo"])) {
		exit(json(-2,"error","logo路径不能为空！"));
	} else if(empty($_POST["name"])) {
		exit(json(-3,"error","网站名称不能为空！"));
	} else if(empty($_POST["subtitle"])) {
		exit(json(-4,"error","网站副标题不能为空！"));
	} else {
		$array=[
		"name"=>htmlspecialchars($_POST["name"]),
		"subtitle"=>htmlspecialchars($_POST["subtitle"]),
		"keywords"=>htmlspecialchars($_POST["keywords"]),
		"description"=>htmlspecialchars($_POST["description"]),
		"sort"=>htmlspecialchars($_POST["sort"]),
		"close"=>htmlspecialchars($_POST["close"]),
		"logo"=>htmlspecialchars($_POST["logo"]),
		"date"=>htmlspecialchars($_POST["date"]),
		];
		$return=$db->update("admin",$array,'id=1');
		if($return) {
			$system_data=[
			"run"=>$_POST["run"],
			"prevention"=>is_true($_POST["prevention"]),
			];
			put_set_data('system',$system_data);
			exit(json(200,"msg","修改成功！"));
		} else {
			exit(json(-5,"error",$db->mysql_error));
		}
	}
	break;
	case "contact"://联系方式
	if(empty($_POST["qq"])) {
		exit(json(-1,"error","管理QQ不能为空！"));
	} else {
		$array=[
		"qq"=>htmlspecialchars($_POST["qq"]),
		"mail"=>htmlspecialchars($_POST["mail"]),
		"qun"=>htmlspecialchars($_POST["qun"]),
		];
		$return=$db->update("admin",$array,'id=1');
		if($return) {
			exit(json(200,"msg","修改成功！"));
		} else {
			exit(json(-2,"error",$db->mysql_error));
		}
	}
	break;
	case "user"://账号设置
	if(empty($_POST["user"])) {
		exit(json(-1,"error","管理账号不能为空！"));
	} else if(mb_strlen($_REQUEST["user"])<2) {
		exit(json(-2,"error","账号长度不能小于2！"));
	} else if(mb_strlen($_REQUEST["user"])>16) {
		exit(json(-3,"error","账号长度不能大于16！"));
	} else if(empty($_POST["pass"])==false&&mb_strlen($_REQUEST["pass"])<6) {
		exit(json(-4,"error","密码长度不能小于6！"));
	} else if(empty($_POST["pass"])==false&&mb_strlen($_REQUEST["pass"])>16) {
		exit(json(-5,"error","密码长度不能大于16！"));
	} else {
		$array=[
		"user"=>htmlspecialchars($_POST["user"]),
		];
		if($_POST["pass"]) {
			$array["pass"]=password_hash(htmlspecialchars($_POST["pass"]),PASSWORD_DEFAULT);
		}
		$return=$db->update("admin",$array,'id=1');
		if($return) {
			exit(json(200,"msg","修改成功！"));
		} else {
			exit(json(-6,"error",$db->mysql_error));
		}
	}
	break;
	case "login"://后台登陆
	if($_SESSION['code_error']>=500) {
		if((time()-$_SESSION['code_time'])>=(60*30)) {
			$_SESSION['code_error']=0;
			exit(json(-1,"error","操作过期，请重试！"));
		} else {
			exit(json(-2,"error","你输入验证码的错误次数过多，请稍后重试！"));
		}
	} else if(empty($_POST["user"])) {
		exit(json(-3,"error","账号不能为空！"));
	} else if(mb_strlen($_REQUEST["user"])<2) {
		exit(json(-4,"error","账号长度不能小于2！"));
	} else if(mb_strlen($_REQUEST["user"])>16) {
		exit(json(-5,"error","账号长度不能大于16！"));
	} else if(empty($_POST["pass"])) {
		exit(json(-6,"error","密码不能为空！"));
	} else if(empty($_POST["pass"])==false&&mb_strlen($_REQUEST["pass"])<6) {
		exit(json(-7,"error","密码长度不能小于6！"));
	} else if(empty($_POST["pass"])==false&&mb_strlen($_REQUEST["pass"])>16) {
		exit(json(-8,"error","密码长度不能大于16！"));
	} else if(empty($_POST["code"])&&$_POST["code"]!="0") {
		exit(json(-9,"error","验证码不能为空！"));
	} else if($_SESSION["code"]!=$_POST["code"]) {
		$_SESSION['code_error']+=1;
		$_SESSION['code_time']=time();
		exit(json(-10,"error","验证码输入有误！"));
	} else if($_POST["user"]==$web_array['user']&&password_verify($_POST["pass"],$web_array['pass'])) {
		$_SESSION['admin_login']=true;
		exit(json(200,"msg","登入成功，欢迎回来！"));
	} else {
		exit(json(-10,"error","账号或密码错误！"));
	}
	break;
	case "firset";
	if($_POST["type"]=="preventcc") {
		$safe_data=[
		"cycle"=>$_POST["cycle"],//访问周期(秒)
		"frequency"=>$_POST["frequency"],//访问频率(次)
		"lockdown"=>$_POST["lockdown"],//封锁时间(秒)
		];
	} else {
		$safe_data=[
		"firewall"=>is_true($_POST["firewall"]),//防火墙开关
		"ccproof"=>is_true($_POST["ccproof"]),//防CC开关
		"accesslog"=>is_true($_POST["accesslog"]),//访问日志
		];
	}
	put_set_data('safe',$safe_data);
	exit(json(200,"msg","修改成功！"));
	break;
	case "reptile";
	$system_data=[
	"spider"=>is_true($_POST["spider"]),//蜘蛛
	"reptile"=>is_true($_POST["reptile"]),//爬虫
	];
	put_set_data('system',$system_data);
	exit(json(200,"msg","修改成功！"));
	break;
	case "list_accesslog";
	$num=0;
	$route=Run."/Api_mac/Api_log/accesslog/";
	foreach(get_Journal_list($route) as $k=>$v) {
		$num+=1;
				$array["rows"][$k]["id"]=$k+1;
				$array["rows"][$k]["time"]=date("Y-m-d",filemtime($route.$v["time"]));
				$array["rows"][$k]["size"]=$v["size"];
				$array["rows"][$k]["authority"]='<font color="red">'.posix_getpwuid(fileowner($route.$v["time"]))["name"].'</font>';
				$array["rows"][$k]["Row_Number"]=$v["Row_Number"];
	}
	$array["total"]=$num;
	exit(json(200,$array));
	break;
	case "accesslog";
	ini_set('memory_limit','200M');
	$route=Run."/Api_mac/Api_log/accesslog/".$_REQUEST["date"].".txt";
	if(file_exists($route)==false) {
		exit(json(-1,"error","日志不存在！"));
	}
	$page=($_REQUEST['page']?$_REQUEST['page']:1)-1;
	$limit=$limit_num=($_REQUEST['limit']?$_REQUEST['limit']:10)-1;
	if($page==0) {
		$pages_one=$page*$limit;
		$limit=$limit;
	} else if($_REQUEST['page']<=2) {
		$pages_one=$page*$limit+1;
		$limit=$limit*$page+$limit+1;
	} else {
		$Right=($_REQUEST['page']-1);
		$pages_one=$page*$limit+$Right;
		$limit=$limit*$page+$limit+$Right;
	}
	$num=0;
	$offset=$_REQUEST["offset"];
	foreach(file($route) as $k=>$v) {
		$num+=1;
		$data_json=json_decode($v,true);
		$data_json["id"]=$num;
		$data_json["time"]=date("Y-m-d H:i:s",$data_json["time"]);
		$array["rows"][]=$data_json;
	}
	if(empty($array["rows"])==true) {
		exit(json(-2,"error","数据异常！"));
	}
	$array["total"]=$num;
	exit(json(200,$array));
	break;
	case "tpl_switch";
	$templates_data=[
	    "admin"=>[//后台模板
	"filename"=>[
	"m"=>$_POST["m_admin"],
	"pc"=>$_POST["pc_admin"],
	],
	    ],
	    "index"=>[//前台模板
	"filename"=>[
	"m"=>$_POST["m_index"],
	"pc"=>$_POST["pc_index"],	
	],
	    ]
	];
	put_set_data('templates',$templates_data);
	exit(json(200,"msg","修改成功！"));
	break;
	case "tpl_authority";
	$templates_data=[
	"usingphp"=>is_true($_POST["usingphp"]),//允许模板直接使用php
	"mysql"=>is_true($_POST["mysql"]),//允许模板链接数据库，注意：需要开“允许模板直接使用php”才能使用
	];
	put_set_data('templates',$templates_data);
	exit(json(200,"msg","修改成功！"));
	break;
	case "addapi";
	if(empty($_POST["name"])) {
		exit(json(-1,"error","接口名称不能为空！"));
	} else if(empty($_POST["keywords"])) {
		exit(json(-2,"error","接口关键词不能为空！"));
	} else if(empty($_POST["url"])) {
		exit(json(-3,"error","接口地址不能为空！"));
	} else if(empty($_POST["status"])) {
		exit(json(-4,"error","接口状态不能为空！"));
	} else if(empty($_POST["request_format"])) {
		exit(json(-5,"error","请求方式不能为空！"));
	} else if(empty($_POST["return_format"])) {
		exit(json(-6,"error","返回格式不能为空！"));
	} else if(empty($_POST["contents"])) {
		exit(json(-6,"error","返回实例不能为空！"));
	} else {
		$array=[
		"name"=>htmlspecialchars($_POST["name"]),
		"keywords"=>htmlspecialchars($_POST["keywords"]),
		"description"=>htmlspecialchars($_POST["description"]),
		"url"=>htmlspecialchars($_POST["url"]),
		"status"=>htmlspecialchars($_POST["status"]),
		"request_format"=>htmlspecialchars($_POST["request_format"]),
		"return_format"=>htmlspecialchars($_POST["return_format"]),
		"inform"=>htmlspecialchars(urldecode($_POST["inform"])),
		"contents"=>htmlspecialchars(urldecode($_POST["contents"])),
		"appid"=>appid(time().mt_rand()),
		"add_time"=>time(),
		"update_time"=>time(),
		];
		$return=$db->Add("api",$array);
		if($return) {
			$normal=0;
			$anomaly=0;
			if($_POST["status"]==="true") {
				$normal=1;
			} else {
				$anomaly=1;
			}
			$call=$db->query("system","id",1);
			$call_data=[
			"api"=>$call["api"]+1,
			"normal"=>$call["normal"]+$normal,
			"anomaly"=>$call["anomaly"]+$anomaly
			];
			$db->update("system",$call_data,'id=1');
			exit(json(200,"msg","添加成功！"));
		} else {
			exit(json(-5,"error",$db->mysql_error));
		}
	}
	break;
	case "listapi"://接口列表
	$list_api=$db->query("api",false,false,true);
	$listapi["rows"]=$list_api;
	foreach($list_api as $k=>$v){
	$listapi["rows"][$k]['Y']=date('Y',$v['add_time']);
	$listapi["rows"][$k]['m']=date('m',$v['add_time']);
	$listapi["rows"][$k]['d']=date('d',$v['add_time']);
	}
	exit(json(200,$listapi));
	break;
	case "editapi";
	if(empty($_POST["name"])) {
		exit(json(-1,"error","接口名称不能为空！"));
	} else if(empty($_POST["keywords"])) {
		exit(json(-2,"error","接口关键词不能为空！"));
	} else if(empty($_POST["url"])) {
		exit(json(-3,"error","接口地址不能为空！"));
	} else if(empty($_POST["status"])) {
		exit(json(-4,"error","接口状态不能为空！"));
	} else if(empty($_POST["request_format"])) {
		exit(json(-5,"error","请求方式不能为空！"));
	} else if(empty($_POST["return_format"])) {
		exit(json(-6,"error","返回格式不能为空！"));
	} else if(empty($_POST["contents"])) {
		exit(json(-6,"error","返回实例不能为空！"));
	} else {
		$array=[
		"name"=>htmlspecialchars($_POST["name"]),
		"keywords"=>htmlspecialchars($_POST["keywords"]),
		"description"=>htmlspecialchars($_POST["description"]),
		"url"=>htmlspecialchars($_POST["url"]),
		"status"=>htmlspecialchars($_POST["status"]),
		"request_format"=>htmlspecialchars($_POST["request_format"]),
		"return_format"=>htmlspecialchars($_POST["return_format"]),
		"inform"=>htmlspecialchars(urldecode($_POST["inform"])),
		"contents"=>htmlspecialchars(urldecode($_POST["contents"])),
		"update_time"=>time(),
		];
		$apidata=$db->query("api","id",''.$_GET["id"].'');
		$return=$db->update("api",$array,'id='.$_GET["id"]);
		//print_r($apidata);
		if($return&&is_array($apidata)) {
			$normal=0;
			$anomaly=0;
			if($_POST["status"]==="true"&&$apidata["status"]==="false") {
				$normal=1;
				$anomaly=-1;
			} else if($_POST["status"]==="false"&&$apidata["status"]==="true") {
				$normal=-1;
				$anomaly=1;
			}
			$call=$db->query("system","id",1);
			$call_data=[
			"normal"=>$call["normal"]+$normal,
			"anomaly"=>$call["anomaly"]+$anomaly
			];
			$db->update("system",$call_data,'id=1');
			exit(json(200,"msg","修改成功！"));
		} else {
			exit(json(-5,"error",$db->mysql_error));
		}
	}
	break;
	case "binding_parameter";
	if(empty($_POST["appid"])) {
		exit(json(-1,"error","接口ID不能为空！"));
	} else if(empty($_POST["name"])) {
		exit(json(-2,"error","参数名称不能为空！"));
	} else if(empty($_POST["required"])) {
		exit(json(-3,"error","请选择参数是否可为空！"));
	} else if(empty($_POST["type"])) {
		exit(json(-4,"error","参数类型不能为空！"));
	} else if(empty($_POST["explanation"])) {
		exit(json(-5,"error","参数说明不能为空！"));
	} else {
		$array=[
		"appid"=>htmlspecialchars($_POST["appid"]),
		"name"=>htmlspecialchars($_POST["name"]),
		"required"=>htmlspecialchars($_POST["required"]),
		"explanation"=>htmlspecialchars($_POST["explanation"]),
		"type"=>htmlspecialchars($_POST["type"]),
		];
		$return=$db->Add("request_parameter",$array);
		if($return) {
			exit(json(200,"msg","绑定成功！"));
		} else {
			exit(json(-5,"error",$db->mysql_error));
		}
	}
	break;
	case "return_parameter";
	if(empty($_POST["appid"])) {
		exit(json(-1,"error","接口ID不能为空！"));
	} else if(empty($_POST["name"])) {
		exit(json(-2,"error","参数名称不能为空！"));
	} else if(empty($_POST["type"])) {
		exit(json(-3,"error","参数类型不能为空！"));
	} else if(empty($_POST["explanation"])) {
		exit(json(-4,"error","参数说明不能为空！"));
	} else {
		$array=[
		"appid"=>htmlspecialchars($_POST["appid"]),
		"name"=>htmlspecialchars($_POST["name"]),
		"explanation"=>htmlspecialchars($_POST["explanation"]),
		"type"=>htmlspecialchars($_POST["type"]),
		];
		$return=$db->Add("return_parameter",$array);
		if($return) {
			exit(json(200,"msg","绑定成功！"));
		} else {
			exit(json(-5,"error",$db->mysql_error));
		}
	}
	break;
	case "status_code_binding";
	if(empty($_POST["appid"])) {
		exit(json(-1,"error","接口ID不能为空！"));
	} else if(empty($_POST["name"])) {
		exit(json(-2,"error","状态码不能为空！"));
	} else if(empty($_POST["type"])) {
		exit(json(-3,"error","类型不能为空！"));
	} else if(empty($_POST["explanation"])) {
		exit(json(-4,"error","状态码说明不能为空！"));
	} else {
		$array=[
		"appid"=>htmlspecialchars($_POST["appid"]),
		"name"=>htmlspecialchars($_POST["name"]),
		"explanation"=>htmlspecialchars($_POST["explanation"]),
		"type"=>htmlspecialchars($_POST["type"]),
		];
		$return=$db->Add("status_code_binding",$array);
		if($return) {
			exit(json(200,"msg","绑定成功！"));
		} else {
			exit(json(-5,"error",$db->mysql_error));
		}
	}
	break;
	case "routeapi";
	if(empty($_POST["rec_route"])) {
		exit(json(-1,"error","接口路径不能为空！"));
	} else {
		$route=where_data(explode("/",$_POST["rec_route"]));
		$str=[" ","/"];
		$strtr=["+","\/"];
		foreach($route as $v) {
			$false.=$v."/";
		}
		$data=[
		"false"=>str_replace($str,$strtr,$_POST["rec_route"]),
		"solid"=>str_replace(" ","+",$_POST["har_route"]),
		"har_false"=>str_replace(" ","+",$_POST["rec_route"]),
		"doc_false"=>str_replace($str,$strtr,$_POST["doc_rec_route"]),
		"doc_solid"=>str_replace(" ","+",$_POST["doc_har_route"]),
		"doc_har_false"=>str_replace(" ","+",$_POST["doc_rec_route"]),
		];
		put_set_data('api',$data);
		exit(json(200,"msg","保存成功！"));
	}
	break;
	case "de_accesslog";
	if(empty($_POST["id"])) {
		exit(json(-1,"error","错误的ID！"));
	} else {
	$run=Run.'/Api_mac/Api_log/accesslog/'.$_POST["id"].'.txt';
	if(file_exists($run)){
	unlink($run);
		exit(json(200,"msg","删除成功！"));	
	}else{
		exit(json(-2,"error","日志不存在！"));	
	}
	}
	break;
	case "de_api";
	if(empty($_POST["id"])) {
		exit(json(-1,"error","错误的ID！"));
	} else {
	$api_data=$db->query("api","id",$_POST["id"]);
	if(is_array($api_data)&&!is_null($api_data)){
	if($db->delete('api','id="'.$_POST["id"].'"')){
			$call=$db->query("system","id",1);
			$normal=$call["normal"];
			$anomaly=$call["anomaly"];
			if(is_true($api_data["status"])){
			$normal-=1;
			}else{
			$anomaly-=1;
			}
			$call_data=[
			"api"=>$call["api"]-1,
			"normal"=>$normal,
			"anomaly"=>$anomaly
			];
			$db->update("system",$call_data,'id=1');
			$db->delete('request_parameter','appid="'.$api_data["appid"].'"');
			$db->delete('return_parameter','appid="'.$api_data["appid"].'"');
			$db->delete('status_code_binding','appid="'.$api_data["appid"].'"');
		exit(json(200,"msg","删除成功！"));	
	}else{
	exit(json(-3,"error","删除失败！"));	
	}
	}else{
	exit(json(-2,"error","接口不存在！"));	
    }
	}
	break;
	default:
	exit(json(400,"error","您使用了一个错误的Api！"));
	break;
}