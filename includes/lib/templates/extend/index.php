<?php
switch($filename) {
	case "index"://主页
	$Statistics=$db->query("system");
	$tpl->endow("array",$Statistics);
	//首页统计数据
	$apilist=$db->query("api",false,false,true);
	if(!is_array($apilist)){
	$apilist=[];
	}
	if($web_array["sort"]) {
		$apilist=array_reverse($apilist);
	}
	foreach($apilist as $k=>$v) {
		$api_list[$k]["id"]=$v["id"];
		$api_list[$k]["time"]=date("Y-m-d",$v["update_time"]);
		$api_list[$k]["name"]=$v["name"];
		$api_list[$k]["description"]=$v["description"];
		$api_list[$k]["appid"]=$v["appid"];
		$api_list[$k]["Y"]=date('Y',$v['add_time']);
		$api_list[$k]["m"]=date('m',$v['add_time']);
		$api_list[$k]["d"]=date('d',$v['add_time']);
		$api_list[$k]["randrgb"]=randrgb();
		if($v["status"]==="true") {
			$api_list[$k]["status"]="正常";
			$api_list[$k]["color"]="success";
		} else {
			$api_list[$k]["status"]="维护";
			$api_list[$k]["color"]="danger";
		}
	}
	$tpl->vararray("apilist",$api_list);
	//接口列表
	$call_data=$db->query("apicall","date",date("Y-m-d"));
	$call=0;
	if(is_array($call_data)){
	foreach(json_decode($call_data["json"],true) as $v) {
		$call+=$v;
	}
	}
	$tpl->vararray("call",$call);
	//今日调用量
	$front = strtotime($web_array["date"]);
	$new = strtotime(date("Y-m-d"));
	$phase = $front-$new;
	$tpl->endow("date",abs(round($phase / 86400)));
	//网站运行天数
	break;
	case "doc"://接口文档
	$request_parameter=$db->query("request_parameter","appid",$key,true);
	$tpl->vararray("request_parameter",is_array($request_parameter)?my_array_multisort($request_parameter,"name"):[]);
	$return_parameter=$db->query("return_parameter","appid",$key,true);
	$tpl->vararray("return_parameter",is_array($return_parameter)?my_array_multisort($return_parameter,"name"):[]);
	$status_code_binding=$db->query("status_code_binding","appid",$key,true);
	$tpl->vararray("status_code_binding",is_array($status_code_binding)?my_array_multisort($status_code_binding,"name"):[]);
	$tpl->endow("http",$_SERVER["REQUEST_SCHEME"].'://'.$_SERVER["HTTP_HOST"].'/api/v1/get/');
		$request_parameter=is_array($request_parameter)?$request_parameter:[];
	$perform=get_array_end($request_parameter);
	foreach($request_parameter as $k=>$v) {
		if($v["name"]===$perform["value"]["name"]) {
			$request_parameter_splicing.=$v["name"].'='.$v["explanation"];
		} else {
			$request_parameter_splicing.=$v["name"].'='.$v["explanation"].'&';
		}
	}
	$tpl->endow("title",$doc_data["name"]);
	$tpl->endow("time",date("Y-m-d H:i:s",$doc_data['add_time']));
	$tpl->vararray("api_data",$doc_data);
	$tpl->endow("request_parameter_splicing",$request_parameter_splicing);
	break;
}