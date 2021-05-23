<?php
error_reporting(0);
if(file_exists('../Api_mac/Api_set/install.lock')) {
	die('已经安装过了，不能重复安装！');
}
if($_SERVER['REQUEST_METHOD'] == 'POST') {
require_once("../includes/lib/function/system.php");
$sql=<<<HTML
<?php
\$config=[
	'host' => '{$_POST["host"]}', //数据库服务器
	'user' => '{$_POST["user"]}', //数据库用户名
	'pwd' => '{$_POST["pwd"]}', //数据库密码
	'dbname' => '{$_POST["dbname"]}' ,//数据库名
];
?>
HTML;
$token=<<<HTML
<?php
\$token="{$_POST["token"]}";
HTML;
write("../includes/token.php",$token);
write("../includes/config.php",$sql);
require_once '../includes/config.php';
//数据库配置
require_once '../Api_mac/Api_class/mysql.php';
//数据库操作类
$db=new mysql();
if($db->mysql_error) {
	echo json_encode(array("code"=>500,"msg"=>$db->mysql_error));
} else {
	$sql=file_get_contents("./Sql.sql");
	$array=where_data(explode(";",$sql));
	$success=0;
	$fail=0;
	foreach($array as $v) {
		if($db->perform($v)) {
			++$success;
		} else {
			++$fail;
		}
	}
	if($fail==0) {
 		write("../Api_mac/Api_set/install.lock","Jie Admin install lock");
		echo json_encode(array("code"=>200,"msg"=>"安装完成！"));
	} else {
		echo json_encode(array("code"=>500,"msg"=>"安装失败！"));
	}
}
exit();
}
?>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
<title>安装向导-JieAdmin</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="stylesheet" type="text/css" href="./css/materialdesignicons.min.css">
<link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="./css/animate.min.css">
<link rel="stylesheet" type="text/css" href="./css/style.min.css">
</head>

<body>
    <!--页面主要内容-->
<div class="lyear-layout-web">
  <div class="lyear-layout-container">      
      <div class="container-fluid pt-15">
        
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header"><div class="card-title">JieAdmin程序安装页</div></div>
              <div class="card-body">
                
                <form class="guide-box" data-navigateable="true" name="form">
                  <ul class="nav nav-step">
                    <li class="nav-item">
                      <span>环境检查</span>
                      <a class="nav-link active" data-toggle="tab" href="#step-1"></a>
                    </li>
      
                    <li class="nav-item">
                      <span>数据库配置</span>
                      <a class="nav-link" data-toggle="tab" href="#step-2"></a>
                    </li>
      
      
                    <li class="nav-item">
                      <span>安装</span>
                      <a class="nav-link" data-toggle="tab" href="#step-3"></a>
                    </li>
                  </ul>
                  <!--对应内容-->
                  <div class="nav-step-content">
                    <div class="nav-step-pane d-none active" id="step-1"  data-provide="validation">
<table class="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>函数</th>
                        <th>作用</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>file_get_contents</td>
                        <td>读取文件</td>
                        <?php
                        if(function_exists('file_get_contents')){
                        echo '<td><span class="badge badge-success">可用</span></td>';
                        }else{
                        echo '<td><span class="badge badge-danger">禁用</span></td>';
                        }
                        ?>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>sg_load</td>
                        <td>SG11加密组件</td>
                        <?php
                        if(function_exists('sg_load')){
                        echo '<td><span class="badge badge-success">可用</span></td>';
                        }else{
                        echo '<td><span class="badge badge-danger">禁用</span></td>';
                        }
                        ?>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>curl_exec</td>
                        <td>抓取网页</td>
                        <?php
                        if(function_exists('curl_exec')){
                        echo '<td><span class="badge badge-success">可用</span></td>';
                        }else{
                        echo '<td><span class="badge badge-danger">禁用</span></td>';
                        }
                        ?>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>php</td>
                        <td>PHP版本</td>
                        <?php
                        if((version_compare(PHP_VERSION, '5.6.0', '>'))){
                        echo '<td><span class="badge badge-success">'.PHP_VERSION.'</span></td>';
                        }else{
                        echo '<td><span class="badge badge-danger">'.PHP_VERSION.'</span></td>';
                        }
                        ?>
                      </tr>
                    </tbody>
                  </table>
                    </div>
      
                    <div class="nav-step-pane d-none" id="step-2" data-provide="validation">
                      <div class="form-group">
                        <label>数据库服务器</label>
                        <input class="form-control" type="text" id="host" value="localhost" required />
                      </div>
                      <div class="form-group">
                        <label>数据库用户名</label>
                        <input class="form-control" type="text" id="user" required />
                      </div>
                      <div class="form-group">
                        <label>数据库密码</label>
                        <input class="form-control" type="text" id="pwd" required />
                      </div>
                      <div class="form-group">
                        <label>数据库名</label>
                        <input class="form-control" type="text" id="dbname" required />
                      </div>
                      <div class="form-group">
                        <label>token</label>
                        <input class="form-control" type="text" id="token" required />
                      </div>
                    </div>
      
      
                    <div class="nav-step-pane d-none" id="step-3">
                    </div>
                  </div>
                  <!--End 对应内容-->
                  <hr>
                  <div class="d-flex justify-content-between">
                    <button class="btn btn-secondary disabled" data-wizard="prev" type="button">上一步</button>
                    <button class="btn btn-secondary" data-wizard="next" type="button">下一步</button>
                    <button class="btn btn-primary d-none" data-wizard="finish" type="button" onclick="confirm();">安装</button>
                  </div>
                </form>
       
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    
    <!--End 页面主要内容-->
  </div>
</div>
<script type="text/javascript" src="./js/jquery.min.js"></script>
<script type="text/javascript" src="./js/popper.min.js"></script>
<script type="text/javascript" src="./js/bootstrap.min.js"></script>
<script type="text/javascript" src="./js/perfect-scrollbar.min.js"></script>
<script type="text/javascript" src="./js/jquery.cookie.min.js"></script>
<script type="text/javascript" src="./js/jquery.bootstrap.wizard.min.js"></script>
<script type="text/javascript" src="./js/main.min.js"></script>
<script type="text/javascript">
function confirm() {
    var dbname = form.dbname.value;
    var user = form.user.value;
    var pwd = form.pwd.value;
    var host = form.host.value;
    var token = form.token.value;
    http_request = new XMLHttpRequest();
    http_request.onreadystatechange = handle;
    http_request.open("POST", "#!", true);
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.send('token=' + token + '&pwd=' + pwd + '&user=' + user + '&dbname=' + dbname + '&host=' + host);
}
function handle() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            var text = http_request.responseText;
            var content = JSON.parse(text);
            if (content.code == 200) {
              alert("安装完成！");
               window.location.href="/";
             } else {
              alert(content.msg);
            }
        } else {
        alert("安装失败");
        }
            $("#code").val('');
            $("#captcha").attr("src","/static/code/code.php?r="+Math.random());
    }
}
$(document).ready(function() {
    var guideObj = $('.guide-box');
    var nav_item = guideObj.find('.nav-item');
    var tab_pane = guideObj.find('.nav-step-pane');
    
    guideObj.bootstrapWizard({
        'tabClass': 'nav-step',
        'nextSelector': '[data-wizard="next"]',
        'previousSelector': '[data-wizard="prev"]',
        'finishSelector': '[data-wizard="finish"]',
        'onTabClick': function(e, t, i) {
            // data-navigateable='true'允许用户直接点击步骤项，false则只能通过按钮
            if ( !$('.guide-box').is('[data-navigateable="true"]') ) {
                return false;
            }
        },
        'onTabShow': function(e, t, i) {
            t.children(":gt(" + i + ").complete").removeClass("complete");
            t.children(":lt(" + i + "):not(.complete)").addClass("complete");
        },
        'onNext': function(tab, navigation, index){
            var current_index = guideObj.bootstrapWizard('currentIndex');
            var curr_tab      = tab_pane.eq(current_index);
            
            var validator_selector = '[data-provide="validation"]';
            var validator = curr_tab.find(validator_selector).addBack(validator_selector);
            if (validator.length) {
                var forms = validator.find('input, select, textarea');
                var validation = true;
                forms.each(function() {
                    if (this.checkValidity() === false) {
                        guideObj.addClass('was-validated');
                        validation = false;
                    } else {
                        guideObj.removeClass('was-validated');
                    }
                });
                if (!validation) {
                    guideObj.addClass('was-validated');
                    return false;
                }
            }
        },
        'onPrevious': function(){
        },
        'onFinish': function(e, t, i) {
            var nav = nav_item.eq(i);
            
            nav.addClass('complete').find('a.nav-link').removeClass('active');
            return false; // 这里为了演示效果，阻止其继续
        }
    });
});
</script>
</body>
</html>
<?php
function where_data($data_array) {
	foreach ($data_array as $key => $value) {
		if(empty($value) && $value !='0') {
			unset($data_array[$key]);
		}
	}
	return $data_array;
}

?>
