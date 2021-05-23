<?php
switch($filename) {
	case "index"://主页
	$Statistics=$db->query("system");
	$tpl->endow("array",$Statistics);
	//首页统计数据
	$api_today=date_pv_chart($db->query("apicall","date",date("Y-m-d")));
	$tpl->vararray("api_today",$api_today);
	$pv_today=date_pv_chart($db->query("skimpv","date",date("Y-m-d")));
	$tpl->vararray("pv_today",$pv_today);
	$yesterday_today=date_pv_chart($db->query("skimpv","date",date("Y-m-d",strtotime("-1 day"))));
	$tpl->vararray("yesterday_today",$yesterday_today);
	break;
	case "firset"://安全设置
	$tpl->endow("array",$safe);
	break;
	case "login"://登陆
	if($_REQUEST["loginout"]=="1") {
		if($_SESSION['admin_login']==true) {
			$_SESSION['admin_login']=false;
			$tpl->endow("ullet","您已成功退出登录！");
		}
	}
	break;
	case "tpl_switch"://模板切换
	$tpl->vararray("m_adminlist",gettemplate("admin",'m'));
	//后台模板列表
	$tpl->vararray("pc_adminlist",gettemplate("admin",'pc'));
	//后台模板列表
	$tpl->vararray("m_indexlist",gettemplate("index",'m'));
	//前台模板列表
	$tpl->vararray("pc_indexlist",gettemplate("index",'pc'));
	//前台模板列表
	break;
	case "tpl_authority"://权限管理
	$tpl->vararray("get_tpl_set",$templates);
	//模板设置
	break;
	case "editapi"://编辑接口
	$apidata=$db->query("api","id",''.$_GET["id"].'');
	if(is_array($apidata)) {
		$apidata['status']=is_true($apidata['status']);
		$tpl->vararray("apidata",$apidata);
		//模板设置
	} else {
		$tpl->endow("out",true);
		$tpl->endow("alert","这是一个错误的ID！");
	}
	break;
	case "binding_parameter"://绑定请求参数
	$tpl->vararray("apilist",$db->query("api",false,false,true));
	include(Run."/includes/lib/plugin/type.php");
	$tpl->vararray("type",$parameter_type);
	break;
	case "return_parameter"://绑定返回参数
	$tpl->vararray("apilist",$db->query("api",false,false,true));
	include(Run."/includes/lib/plugin/type.php");
	$tpl->vararray("type",$parameter_type);
	break;
	case "status_code_binding"://状态码绑定
	$tpl->vararray("apilist",$db->query("api",false,false,true));
	include(Run."/includes/lib/plugin/type.php");
	$tpl->vararray("type",$parameter_type);
	break;
	case "routeapi"://Api路径
	$tpl->vararray("route",$Api_route_set);
	break;
}