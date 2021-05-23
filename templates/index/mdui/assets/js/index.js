window.onload = function() {
  new ClipboardJS('.clipboard_copy');
}
function switch_Themes() {
	var theme = getCookies('theme');
	if(theme == 'dark') {
		setCookies('theme','light',Infinity);
		setCnt('home_theme_btn','brightness_4');
  	 	delCls('body_content','mdui-theme-layout-dark');
	} else {
		setCookies('theme','dark',Infinity);
		setCnt('home_theme_btn','brightness_7');		
 	 	addCls('body_content','mdui-theme-layout-dark');
	}
}
function getCookies(name) {
var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if (arr = document.cookie.match(reg)) {
return unescape(arr[2]);
} else {
return null;
}
}
function setCookies(objName,objValue,objDays) {
var str = objName + "=" + escape(objValue);
if (objDays > 0) {
var date = new Date();
var ms = objDays * 24 * 3600 * 1000;
date.setTime(date.getTime() + ms);
str += "; expires=" + date.toGMTString();
}
function delCookies(name) {
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval = getCookie(name);
if (cval != null) {
document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
}
if(objDays===Infinity){
  str += "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}
str += "; path=/";
document.cookie = str;
}
function searchResult(value){
    $.ajax({
        url : "./assets/php/layout/livesearch.php",
        type: 'POST',
	    dataType: 'html',
        data: 'value=' + value,
        success :function (obj) {
           setCnt('livesearch',obj);
        },
        error: function(msg) {
        showSnackbar('获取失败');
        }
    })
}
function admin_install_step_1_btn() {
  hidCls('admin_install_step_1');
  shoCls('admin_install_step_2');
}
function admin_install_step_2_btn() {
  var database_url = getVue('admin_install_database_url');
  var database_name = getVue('admin_install_database_name');
  var db_login_name = getVue('admin_install_database_login_name');
  var db_login_pwd = getVue('admin_install_database_login_pwd');
  if (checkTxtK(database_url)) {
    showSnackbar('请填写数据库地址');
  } else if (checkTxtK(database_name)) {
    showSnackbar('请填写数据库名称');
  } else if (checkTxtK(db_login_name)) {
    showSnackbar('请填写数据库登录用户名');
  } else if (checkTxtK(db_login_pwd)) {
    showSnackbar('请填写数据库登录密码');
  } else {
    $.ajax({
      url: '../admin/install.php',
      type: 'POST',
	  dataType: 'text',
      data: 'action=instal&type=db&database=' + database_name + '&db_name=' + db_login_name + '&db_pwd=' + db_login_pwd + '&db_local=' + database_url,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          hidCls('admin_install_step_2');
          shoCls('admin_install_step_3');
        }
      },
      error: function(msg) {
        showSnackbar('配置失败');
      }
    });
  }
}
function admin_install_step_3_btn() {
  var favicon = getVue('admin_install_web_favicon');
  var web_tle = getVue('admin_install_web_title');
  var web_desc = getVue('admin_install_web_desc');
  var keyword = getVue('admin_install_web_keyword');
  var system_mail_host = getVue('admin_install_system_mail_host');
  var system_mail_name = getVue('admin_install_system_mail_name');
  var system_mail_pass = getVue('admin_install_system_mail_pass');
  if (checkTxtK(favicon)) {
    showSnackbar('请填写网站图标');
  } else if (checkTxtK(web_tle)) {
    showSnackbar('请填写网站名称');
  } else if (checkTxtK(web_desc)) {
    showSnackbar('请填写网站描述');
  } else if (checkTxtK(keyword)) {
    showSnackbar('请填写网站关键词');
  } else {
    hidCls('admin_install_step_3');
    shoCls('admin_install_step_4');
  }
}
function admin_install_step_4_btn(){
  var system_mail_host = getVue('admin_install_system_mail_host');
  var system_mail_name = getVue('admin_install_system_mail_name');
  var system_mail_pass = getVue('admin_install_system_mail_pass');
  var system_mail_port = getVue('admin_install_system_mail_port');
  var system_mail_secure = getVue('admin_install_system_mail_secure');
  if (checkTxtK(system_mail_host)) {
    showSnackbar('请填写系统邮箱服务器地址');
  } else if (checkTxtK(system_mail_name)) {
    showSnackbar('请填写系统邮箱账户名');
  } else if (checkTxtK(system_mail_pass)) {
    showSnackbar('请填写系统邮箱密码');
  } else if (checkTxtK(system_mail_port)) {
    showSnackbar('请填写系统邮箱端口号');
  }else {
	hidCls('admin_install_step_4');
    shoCls('admin_install_step_5');
  }
}
function admin_install_step_5_btn() {
  var favicon = getVue('admin_install_web_favicon');
  var web_tle = getVue('admin_install_web_title');
  var web_desc = getVue('admin_install_web_desc');
  var keyword = getVue('admin_install_web_keyword');
  var system_mail_host = getVue('admin_install_system_mail_host');
  var system_mail_name = getVue('admin_install_system_mail_name');
  var system_mail_pass = getVue('admin_install_system_mail_pass');
  var system_mail_port = getVue('admin_install_system_mail_port');
  var system_mail_secure = getVue('admin_install_system_mail_secure');
  var user_name = getVue('admin_install_web_user_name');
  var user_pwd = getVue('admin_install_web_user_pwd');
  var user_email = getVue('admin_install_web_user_email');
  var user_qq = getVue('admin_install_web_user_qq');
  if (checkTxtK(user_name)) {
    showSnackbar('请填写管理员名');
  } else if (checkTxtK(user_pwd)) {
    showSnackbar('请设置登录密码');
  } else if (checkTxtK(user_email)) {
    showSnackbar('请填写联系邮箱');
  } else if (checkTxtK(user_qq)) {
    showSnackbar('请填写联系QQ');
  } else {
    $.ajax({
      url: '../admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=instal&type=setup&favicon=' + encodeURIComponent(favicon) + '&web_tle=' + web_tle + '&web_desc=' + web_desc + '&keyword=' + keyword + '&system_mail_host=' + system_mail_host + '&system_mail_name=' + system_mail_name + '&system_mail_pass=' + system_mail_pass + '&system_mail_port=' + system_mail_port + '&system_mail_secure=' + system_mail_secure + '&user_name=' + user_name + '&user_pwd=' + user_pwd + '&user_email=' + user_email + '&user_qq=' + user_qq,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          hidCls('admin_install_step_5');
          shoCls('admin_install_step_6');
        }
      },
      error: function(msg) {
        showSnackbar('配置失败');
      }
    });
  }
}
function admin_system_mail_update_test(opt) {
  var system_mail_host;
  var system_mail_name;
  var system_mail_pass;
  var system_mail_por;
  var system_mail_secure;
  var post_url;
  if (opt == 1) {
  system_mail_host = getVue('admin_edit_dlg_system_mail_host');
  system_mail_name = getVue('admin_edit_dlg_system_mail_name');
  system_mail_pass = getVue('admin_edit_dlg_system_mail_pass');
  system_mail_port = getVue('admin_edit_dlg_system_mail_port');
  system_mail_secure = getVue('admin_edit_dlg_system_mail_secure');
  post_url = './admin/';
  } else {
  system_mail_host = getVue('admin_install_system_mail_host');
  system_mail_name = getVue('admin_install_system_mail_name');
  system_mail_pass = getVue('admin_install_system_mail_pass');
  system_mail_port = getVue('admin_install_system_mail_port');
  system_mail_secure = getVue('admin_install_system_mail_secure');
  post_url = '../admin/';
  }
	$.ajax({
      url: post_url,
      type: 'POST',
	  dataType: 'text',
      data: 'action=admin_test&type=update_system_mail&system_mail_host=' + system_mail_host + '&system_mail_name=' + system_mail_name + '&system_mail_pass=' + system_mail_pass + '&system_mail_port=' + system_mail_port + '&system_mail_secure=' + system_mail_secure + '&test_mail_opt=' + opt,
      success: function(obj) {
      },
      error: function(msg) {
      }
    });
}
function admin_system_mail_btn_test(opt) {
	if (opt == 0) {
	mdui.prompt('请填写接收邮箱',
	function(value){
	$.ajax({
      url: '../admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=admin_test&type=system_mail&test_email=' + value,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
        }
      },
      error: function(msg) {
        showSnackbar('申请发送失败');
      }
    });
	},function(value) {
	},{
		confirmText:'发送',
		cancelText:'取消',
		modal:true,
		history:false,
		closeOnEsc:false
	});
    } else {
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=admin_test&type=system_mail&test_email=',
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
        }
      },
      error: function(msg) {
        showSnackbar('申请发送失败');
      }
    });
	}
}
var search_api_dlg = new mdui.Dialog('#search_api_dlg', {
  history: false,
  modal: true,
  closeOnEsc: false
});
var dlg_admin_loginlog = new mdui.Dialog('#dlg_admin_loginlog', {
  history: false,
  modal: true,
  closeOnEsc: false
});
var dlg_admin_operlog = new mdui.Dialog('#dlg_admin_operlog', {
  history: false,
  modal: true,
  closeOnEsc: false
});
var api_add_dlg = new mdui.Dialog('#api_add_dlg', {
  history: false,
  modal: true,
  closeOnEsc: false
});
var dlg_suport_edituse = new mdui.Dialog('#dlg_suport_edituse', {
  history: false,
  modal: true,
  closeOnEsc: false
});
function api_edit_dlg(id, bolean) {
  var _var_name = 'api_edit_dlg_' + id;
  if (bolean) {
    window[_var_name] = new mdui.Dialog('#api_edit_dlg_' + id, {
      history: false,
      modal: true,
      closeOnEsc: false
    });
  }
  return window[_var_name];
}
var dialog_setting_edit = new mdui.Dialog('#dialog_setting_edit', {
  history: false,
  modal: true,
  closeOnEsc: false
});
var dialog_admin_editpwd = new mdui.Dialog('#dialog_admin_editpwd', {
  history: false,
  modal: true,
  closeOnEsc: false
});
var dialog_paymethod_edit = new mdui.Dialog('#dialog_paymethod_edit', {
  history: false,
  modal: true,
  closeOnEsc: false
});
var dialog_thankslist_add = new mdui.Dialog('#dialog_thankslist_add', {
  history: false,
  modal: true,
  closeOnEsc: false
});
var dlg_admin_feedback = new mdui.Dialog('#dlg_admin_feedback', {
  history: false,
  modal: true,
  closeOnEsc: false
});
function dialog_thankslist_edit(id, bolean) {
  var _var_name = 'dialog_thankslist_edit_' + id;
  if (bolean) {
    window[_var_name] = new mdui.Dialog('#dialog_thankslist_edit_' + id, {
      history: false,
      modal: true,
      closeOnEsc: false
    });
  }
  return window[_var_name];
}
var dialog_friendlink_add = new mdui.Dialog('#dialog_friendlink_add', {
  history: false,
  modal: true,
  closeOnEsc: false
});
function dialog_friendlink_edit(id, bolean) {
  var _var_name = 'dialog_friendlink_edit_' + id;
  if (bolean) {
    window[_var_name] = new mdui.Dialog('#dialog_friendlink_edit_' + id, {
      history: false,
      modal: true,
      closeOnEsc: false
    });
  }
  return window[_var_name];
}
function api_admin_login() {
  var login_dialog = mdui.prompt('请输入管理密码', '登录后台',
  function(value) {
    if (!checkTxtK(value)) {
      $.ajax({
        url: './admin/',
        type: 'POST',
	  dataType: 'text',
        data: 'action=login&type=admin&pwd=' + value,
        success: function(obj) {
          var json = JSON.parse(obj);
          var code = json['code'];
          var msg = json['msg'];
          showSnackbar(msg);
          if (code == 200) {
            login_dialog.close();
            setTimeout(function() {
              reLoad();
            },
            2000);
          } else if (code == 202) {
			  login_dialog.close();
		  }
        },
        error: function(msg) {
          showSnackbar('登录失败');
        }
      });
    } else {
      showSnackbar('请填写密码');
    }
  },
  function(value) {

},
  {
    confirmText: '登录',
    cancelText: '取消',
    history: false,
    closeOnConfirm: false,
    modal: true,
    closeOnEsc: false
  });
}
function api_admin_logout() {
  var logout_snackbar = mdui.snackbar({
    message: '是否确定退出？',
    buttonText: '退出',
    position: positions,
    onButtonClick: function() {
      $.ajax({
        url: './admin/',
        type: 'POST',
	  dataType: 'text',
        data: 'action=logut&type=admin',
        success: function(obj) {
          var json = JSON.parse(obj);
          var code = json['code'];
          var msg = json['msg'];
          showSnackbar(msg);
          if (code == 200) {
            logout_snackbar.close();
            setTimeout(function() {
              if (window.location.href.indexOf('action=setting') != -1) {
                locaUrl('./');
              } else {
                reLoad();
              }
            },
            2000);
          }
        },
        error: function(msg) {
          logout_snackbar.close();
          showSnackbar('退出失败');
        }
      });
    }
  });
}
function show_admin_feedback(){
	mdui.snackbar({
    message: '当前存在反馈，请尽快处理',
    buttonText: '查看',
    position: positions,
    onButtonClick: function() {
	  dlg_admin_feedback.open();
    }
  });
}
function delete_feedback() {
	var indexStr = $('.mdui-table-row-selected').map(function(){
		return this.id
	}).get().join();
	var indexStr = indexStr.replace(/fedbacks_id_/g,'')
	if(indexStr == '' || indexStr == undefined){
		showSnackbar('请先选择反馈记录');
	} else {
	mdui.snackbar({
    message: '已选择的反馈记录：' + indexStr,
    buttonText: '确定解决',
    position: positions,
    onButtonClick: function() {
	  $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=delete&type=feedback&feedback_id=' + indexStr,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
		  var arr = indexStr.split(',');
		  for (let i = 0; i < arr.length; i++) {
			delDiv('fedbacks_id_' + arr[i]);
          }
        }
      },
      error: function(msg) {
        showSnackbar('提交失败');
      }
     });
    }
    });
	}
}
function api_admin_feed(id,name) {
  var fedback_dialog = mdui.prompt('请填写反馈内容', '反馈该接口',
  function(value) {
     $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=add&type=feedback&feedback_apiid=' + id + '&feedback_apiname=' + name + '&feedback_content=' + value + '&id=' + id,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          fedback_dialog.close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('提交失败');
      }
    });
  },
  function(value) {
},
  {
    type: 'textarea',
    confirmText: '提交反馈',
    cancelText: '取消',
    history: false,
    closeOnConfirm: false,
    closeOnEsc: false
  });
}
function api_admin_edit_pwd() {
  var old_pwd = getVue('admin_edit_dlg_old_pwd');
  var new_pwd = getVue('admin_edit_dlg_new_pwd');
  if (checkTxtK(old_pwd)) {
    showSnackbar('请填写原旧密码');
  } else if (checkTxtK(new_pwd)) {
    showSnackbar('请填写新的密码');
  } else {
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=edit&old_pwd=' + old_pwd + '&new_pwd=' + new_pwd + '&type=pwd',
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          dialog_admin_editpwd.close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('请求失败');
      }
    });
  }
}
function api_user_edit_icon() {
  var edit_use_ico = getVue('dlg_suport_edituse_icon');
  var edit_use_back = getVue('dlg_suport_edituse_background');
  if (checkTxtK(edit_use_ico)) {
    showSnackbar('请填写头像地址');
  } else if (checkTxtK(edit_use_back)) {
    showSnackbar('请填写背景图地址');
  } else {
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=edit&new_icn=' + encodeURIComponent(edit_use_ico) + '&new_bag=' + encodeURIComponent(edit_use_back) + '&type=edit_icon',
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          dialog_admin_editpwd.close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('请求失败');
      }
    });
  }
}
function api_admin_show_admin() {
  $.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=edit&type=show_admin',
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
      }
    },
    error: function(msg) {
      showSnackbar('请求失败');
    }
  });
}
function api_admin_open_egis() {
  $.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=edit&type=open_egis',
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
      }
    },
    error: function(msg) {
      showSnackbar('请求失败');
    }
  });
}
function admin_turn_restricted(isrestrict,loginip) {
	if(isrestrict != 1) {
	mdui.confirm('开启限制登陆后，将会仅允许为' + loginip + '的IP进行登录！','重要提示',function(){
	$.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=edit&type=restrict',
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
		  setTimeout(function() {
            reLoad();
          },
          2000);
      }
    },
    error: function(msg) {
      showSnackbar('请求失败');
    }
    });
	},function() {
		setChk('admin_id_restrict',false);
	},{
		confirmText:'确定并继续',
		cancelText:'我再想想',
		modal:true,
		history:false,
		closeOnEsc:false
	});
	} else {
		$.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=edit&type=restrict',
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
		  setTimeout(function() {
            reLoad();
          },
          2000);
      }
    },
    error: function(msg) {
      showSnackbar('请求失败');
    }
    });
	}
}
function friend_link_shows(id,name,statu) {
  $.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=edit&type=show_friend&id=' + id + '&name=' + name + '&status=' + statu,
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
		  setTimeout(function() {
            reLoad();
          },
          2000);
      }
    },
    error: function(msg) {
      showSnackbar('请求失败');
    }
  });
}
function admin_edit_dlg_ok_btn() {
  var favicon = getVue('admin_edit_dlg_web_favicon');
  var web_tle = getVue('admin_edit_dlg_web_title');
  var web_desc = getVue('admin_edit_dlg_web_desc');
  var keyword = getVue('admin_edit_dlg_web_keyword');
  var web_beian = getVue('admin_edit_dlg_web_beian');
  var system_mail_host = getVue('admin_edit_dlg_system_mail_host');
  var system_mail_name = getVue('admin_edit_dlg_system_mail_name');
  var system_mail_pass = getVue('admin_edit_dlg_system_mail_pass');
  var system_mail_port = getVue('admin_edit_dlg_system_mail_port');
  var system_mail_secure = getVue('admin_edit_dlg_system_mail_secure');
  var user_name = getVue('admin_edit_dlg_web_user_name');
  var user_email = getVue('admin_edit_dlg_web_user_email');
  var user_qq = getVue('admin_edit_dlg_web_user_qq');
  var user_qun = getVue('admin_edit_dlg_web_user_qun');
  if (checkTxtK(favicon)) {
    showSnackbar('请填写网站图标');
  } else if (checkTxtK(web_tle)) {
    showSnackbar('请填写网站名称');
  } else if (checkTxtK(system_mail_host)) {
    showSnackbar('请填写系统邮箱服务器地址');
  } else if (checkTxtK(system_mail_name)) {
    showSnackbar('请填写系统邮箱账户名');
  } else if (checkTxtK(system_mail_pass)) {
    showSnackbar('请填写系统邮箱登录密码');
  } else if (checkTxtK(system_mail_port)) {
    showSnackbar('请填写系统邮箱端口');
  } else if (checkTxtK(user_name)) {
    showSnackbar('请填写管理员名');
  } else if (checkTxtK(user_email)) {
    showSnackbar('请填写联系邮箱');
  } else if (checkTxtK(user_qq)) {
    showSnackbar('请填写联系QQ');
  } else if (checkTxtK(user_qun)) {
    showSnackbar('请填写官方QQ');
  } else {
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=edit&type=setting&favicon=' + encodeURIComponent(favicon) + '&web_tle=' + web_tle + '&web_desc=' + web_desc + '&keyword=' + keyword + '&web_beian=' + web_beian + '&system_mail_host=' + system_mail_host + '&system_mail_name=' + system_mail_name + '&system_mail_pass=' + system_mail_pass + '&system_mail_port=' + system_mail_port + '&system_mail_secure=' + system_mail_secure + '&user_name=' + user_name + '&user_email=' + user_email + '&user_qq=' + user_qq + '&user_qun=' + user_qun,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          dialog_setting_edit.close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('提交失败');
      }
    });
  }
}
function api_add_dlg_next_btn() {
  var api_name = getVue('api_add_dlg_api_name');
  var api_info = getVue('api_add_dlg_api_info');
  var api_url = getVue('api_add_dlg_api_url');
  var api_parm = getVue('api_add_dlg_rest_parm');
  var api_get = getChk('api_add_dlg_rest_type_get');
  var api_post = getChk('api_add_dlg_rest_type_post');
  var api_retn_type = getVue('api_add_dlg_retn_type');
  if (api_get && !api_post) {
    api_type = 1;
  } else if (!api_get && api_post) {
    api_type = 2;
  }
  if (checkTxtK(api_name)) {
    showSnackbar('请填写接口名称');
  } else if (checkTxtK(api_url)) {
    showSnackbar('请填写接口介绍');
  } else if (checkTxtK(api_url)) {
    showSnackbar('请填写接口地址');
  } else if (!api_get && !api_post) {
    showSnackbar('请选择请求方式');
  } else {
    if (api_get || (api_get && api_post)) {
      $.ajax({
        url: api_url + '?' + api_parm,
        type: 'GET',
	    dataType: 'text',
        success: function(obj) {
          if (checkTxtK(obj)) {
            showSnackbar('接口返回数据为空，请检查重试');
          } else {
			if (!checkTxtK(api_parm)) {
			showSnackbar('接口信息获取成功');
            var rest_parm = '';
            api_parm.split('&').forEach(function(itm) {    
              var arr = itm.split('=');
              rest_parm += '<div class="mdui-valign"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_' + arr[0] + '\').attr(\'name\',$(this).val());$(\'#checkbox_' + arr[0] + '\').attr(\'name\',$(this).val() + \'_must\')" value="' + arr[0] + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_' + arr[0] + '" name="' + arr[0] + '" class="mdui-textfield-input" type="text" value="参数' + arr[0] + '的说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><label class="mdui-checkbox mdui-float-right" style="width:10%"><input id="checkbox_' + arr[0] + '" name="' + arr[0] + '_must" type="checkbox"/><i class="mdui-checkbox-icon"></i><font style="margin-left:-12px">必需</font></label><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>';
            });
		    }
			if (api_retn_type == 0) {
			shoCls('api_add_dlg_save_cnt_json');
            var json = JSON.parse(obj);
            var retn_parm = '';
            for (var key in json) {
              var type_str;
              var type_int;
              if (typeof(json[key]) == 'string') {
                type_str = ' selected';
                type_int = '';
              } else if (typeof(json[key]) == 'number') {
                type_str = '';
                type_int = ' selected';
              }
              retn_parm += '<div class="mdui-valign" style="overflow:visible"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_' + key + '\').attr(\'name\',$(this).val());$(\'#select_' + key + '\').attr(\'name\',$(this).val() + \'_type\')" value="' + key + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_' + key + '" name="' + key + '" class="mdui-textfield-input" type="text" value="参数' + key + '的说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><div class="mdui-textfield mdui-float-right" style="padding-bottom:28px;width:100px;overflow:visible"><label class="mdui-textfield-label">类型</label><select class="mdui-select" id="select_' + key + '" name="' + key + '_type" mdui-select="{position:\'bottom\'}"><option value="string"' + type_str + '>string</option><option value="integer"' + type_int + '>integer</option></select></div><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>';
            }
		    } else if (api_retn_type == 1) {
			  setCnt('api_add_dlg_save_cnt_text', obj);
			  shoCls('api_add_dlg_save_cnt_text');
			  shoCls('api_add_dlg_save_cnt_defat');
			} else if (api_retn_type == 2) {
			  setSrc('api_add_dlg_save_cnt_image', api_url + '?' + api_parm);
			  shoCls('api_add_dlg_save_cnt_image');
			  shoCls('api_add_dlg_save_cnt_defat');
			} else if (api_retn_type == 3) {
			  setSrc('api_add_dlg_save_cnt_audio', api_url + '?' + api_parm);
			  shoCls('api_add_dlg_save_cnt_audio');
			  shoCls('api_add_dlg_save_cnt_defat');
			} else if (api_retn_type == 4) {
			  setSrc('api_add_dlg_save_cnt_video_src', api_url + '?' + api_parm);
			  shoCls('api_add_dlg_save_cnt_video');
			  shoCls('api_add_dlg_save_cnt_defat');
			}
            setCnt('api_add_dlg_title', '完善参数信息');
            if (!checkTxtK(api_parm)) {
              setCnt('api_add_dlg_save_cnt_rest_parm', rest_parm);
            }
            setCnt('api_add_dlg_save_cnt_retn_parm', retn_parm);
            mdui.mutation();
            hidCls('api_add_dlg_test_cnt');
            shoCls('api_add_dlg_save_cnt');
          }
        },
        error: function(msg) {
          showSnackbar('接口访问失败，请检查链接');
        }
      });
    } else if (api_post) {
      api_type = 2;
      $.ajax({
        url: api_url,
        type: 'POST',
	  dataType: 'text',
        data: api_parm,
        success: function(obj) {
          if (checkTxtK(obj)) {
            showSnackbar('接口返回数据为空，请检查重试');
          } else {
            showSnackbar('接口信息获取成功');
            var rest_parm = '';
            api_parm.split('&').forEach(function(itm) {    
              var arr = itm.split('=');
              rest_parm += '<div class="mdui-valign"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_' + arr[0] + '\').attr(\'name\',$(this).val());$(\'#checkbox_' + arr[0] + '\').attr(\'name\',$(this).val() + \'_must\')" value="' + arr[0] + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_' + arr[0] + '" name="' + arr[0] + '" class="mdui-textfield-input" type="text" value="参数' + arr[0] + '的说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><label class="mdui-checkbox mdui-float-right" style="width:10%"><input id="checkbox_' + arr[0] + '" name="' + arr[0] + '_must" type="checkbox"/><i class="mdui-checkbox-icon"></i><font style="margin-left:-12px">必需</font></label><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>';
            });
            var json = JSON.parse(obj);
            var retn_parm = '';
            for (var key in json) {
              var type_str;
              var type_int;
              if (typeof(json[key]) == 'string') {
                type_str = ' selected';
                type_int = '';
              } else if (typeof(json[key]) == 'number') {
                type_str = '';
                type_int = ' selected';
              }
              retn_parm += '<div class="mdui-valign" style="overflow:visible"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_' + key + '\').attr(\'name\',$(this).val());$(\'#select_' + key + '\').attr(\'name\',$(this).val() + \'_type\')" value="' + key + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_' + key + '" name="' + key + '" class="mdui-textfield-input" type="text" value="参数' + key + '的说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><div class="mdui-textfield mdui-float-right" style="padding-bottom:28px;width:100px;overflow:visible"><label class="mdui-textfield-label">类型</label><select class="mdui-select" id="select_' + key + '" name="' + key + '_type" mdui-select="{position:\'bottom\'}"><option value="string"' + type_str + '>string</option><option value="integer"' + type_int + '>integer</option></select></div><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>';
            }
            setCnt('api_add_dlg_title', '完善参数信息');
            if (!checkTxtK(api_parm)) {
              setCnt('api_add_dlg_save_cnt_rest_parm', rest_parm);
            }
            setCnt('api_add_dlg_save_cnt_retn_parm', retn_parm);
            mdui.mutation();
            hidCls('api_add_dlg_test_cnt');
            shoCls('api_add_dlg_save_cnt');
          }
        },
        error: function(msg) {
          showSnackbar('接口访问失败，请检查链接');
        }
      });
    }
  }
}
var api_add_dlg_next_cnt_add_parm_rest = 0;
var api_add_dlg_next_cnt_add_parm_retn = 0;
var api_add_dlg_next_cnt_add_parm_code = 199;
function api_add_dlg_next_cnt_append(type) {
  if (type == 0) {
    api_add_dlg_next_cnt_add_parm_rest = api_add_dlg_next_cnt_add_parm_rest + 1;
    $("#api_add_dlg_save_cnt_rest_parm").append('<div class="mdui-valign" style="overflow: hidden"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_api_add_dlg_next_cnt_add_new_parm_rest' + api_add_dlg_next_cnt_add_parm_rest + '\').attr(\'name\',$(this).val());$(\'#checkbox_id_api_add_dlg_next_cnt_add_new_parm_rest' + api_add_dlg_next_cnt_add_parm_rest + '\').attr(\'name\',$(this).val() + \'_must\')" value="参数' + api_add_dlg_next_cnt_add_parm_rest + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_api_add_dlg_next_cnt_add_new_parm_rest' + api_add_dlg_next_cnt_add_parm_rest + '" name="api_add_dlg_next_cnt_add_new_parm_rest' + api_add_dlg_next_cnt_add_parm_rest + '" class="mdui-textfield-input" type="text" value="请填写参数说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><label class="mdui-checkbox mdui-float-right" style="width:10%"><input id="checkbox_id_api_add_dlg_next_cnt_add_new_parm_rest' + api_add_dlg_next_cnt_add_parm_rest + '" name="api_add_dlg_next_cnt_add_new_parm_rest' + api_add_dlg_next_cnt_add_parm_rest + '_must" type="checkbox"/><i class="mdui-checkbox-icon"></i><font style="margin-left:-12px">必需</font></label><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>');
    mdui.mutation();
  } else if (type == 1) {
    api_add_dlg_next_cnt_add_parm_retn = api_add_dlg_next_cnt_add_parm_retn + 1;
    $("#api_add_dlg_save_cnt_retn_parm").append('<div class="mdui-valign" style="overflow:visible"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_api_add_dlg_next_cnt_add_new_parm_retn' + api_add_dlg_next_cnt_add_parm_retn + '\').attr(\'name\',$(this).val());$(\'#select_id_api_add_dlg_next_cnt_add_new_parm_retn' + api_add_dlg_next_cnt_add_parm_retn + '\').attr(\'name\',$(this).val() + \'_type\')" value="参数' + api_add_dlg_next_cnt_add_parm_retn + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_api_add_dlg_next_cnt_add_new_parm_retn' + api_add_dlg_next_cnt_add_parm_retn + '" name="api_add_dlg_next_cnt_add_new_parm_retn' + api_add_dlg_next_cnt_add_parm_retn + '" class="mdui-textfield-input" type="text"  value="请填写参数说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><div class="mdui-textfield mdui-float-right" style="padding-bottom:28px;width:100px;overflow:visible"><label class="mdui-textfield-label">类型</label><select class="mdui-select" id="select_id_api_add_dlg_next_cnt_add_new_parm_retn' + api_add_dlg_next_cnt_add_parm_retn + '" name="api_add_dlg_next_cnt_add_new_parm_retn' + api_add_dlg_next_cnt_add_parm_retn + '_type" mdui-select="{position:\'bottom\'}"><option value="string" selected>string</option><option value="integer">integer</option></select></div><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>');
    mdui.mutation();
  } else if (type == 2) {
    api_add_dlg_next_cnt_add_parm_code = api_add_dlg_next_cnt_add_parm_code + 1;
    $("#api_add_dlg_save_cnt_stau_code").append(' <div class="mdui-valign" style="overflow:visible"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">状态码</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_api_add_dlg_next_cnt_add_new_parm_code' + api_add_dlg_next_cnt_add_parm_code + '\').attr(\'name\',$(this).val());" value="' + api_add_dlg_next_cnt_add_parm_code + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="width:100%"><label class="mdui-textfield-label">状态说明</label><input id="id_api_add_dlg_next_cnt_add_new_parm_code' + api_add_dlg_next_cnt_add_parm_code + '" name="' + api_add_dlg_next_cnt_add_parm_code + '" class="mdui-textfield-input" type="text" value="请填写状态码说明" required/><div class="mdui-textfield-error">请填写状态码介绍</div></div><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>');
    mdui.mutation();
  }
}
var api_edit_dlg_add_parm_rest = 0;
var api_edit_dlg_add_parm_retn = 0;
var api_edit_dlg_add_parm_code = 199;
function api_edit_dlg_append(id,type) {
  if (type == 0) {
    api_edit_dlg_add_parm_rest = api_edit_dlg_add_parm_rest + 1;
    $("#api_edit_dlg_rest_parm_" + id).append('<div class="mdui-valign" style="overflow: hidden"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_api_edit_dlg_add_new_parm_rest' + api_edit_dlg_add_parm_rest + id + '\').attr(\'name\',$(this).val());$(\'#checkbox_id_api_edit_dlg_add_new_parm_rest' + api_edit_dlg_add_parm_rest + id + '\').attr(\'name\',$(this).val() + \'_must\')" value="参数' + api_edit_dlg_add_parm_rest + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_api_edit_dlg_add_new_parm_rest' + api_edit_dlg_add_parm_rest + id + '" name="api_edit_dlg_add_new_parm_rest' + api_edit_dlg_add_parm_rest + id + '" class="mdui-textfield-input" type="text" value="请填写参数说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><label class="mdui-checkbox mdui-float-right" style="width:10%"><input id="checkbox_id_api_edit_dlg_add_new_parm_rest' + api_edit_dlg_add_parm_rest + id + '" name="api_edit_dlg_add_parm_rest' + api_edit_dlg_add_parm_rest + id + '_must" type="checkbox"/><i class="mdui-checkbox-icon"></i><font style="margin-left:-12px">必需</font></label><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>');
    mdui.mutation();
  } else if (type == 1) {
    api_edit_dlg_add_parm_retn = api_edit_dlg_add_parm_retn + 1;
    $("#api_edit_dlg_retn_parm_" + id).append('<div class="mdui-valign" style="overflow:visible"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_api_edit_dlg_add_new_parm_retn' + api_edit_dlg_add_parm_retn + id + '\').attr(\'name\',$(this).val());$(\'#select_id_api_edit_dlg_add_new_parm_retn' + api_edit_dlg_add_parm_retn + id + '\').attr(\'name\',$(this).val() + \'_type\')" value="参数' + api_edit_dlg_add_parm_retn + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_api_edit_dlg_add_new_parm_retn' + api_edit_dlg_add_parm_retn + id + '" name="api_edit_dlg_add_new_parm_retn' + api_edit_dlg_add_parm_retn + id + '" class="mdui-textfield-input" type="text"  value="请填写参数说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><div class="mdui-textfield mdui-float-right" style="padding-bottom:28px;width:100px;overflow:visible"><label class="mdui-textfield-label">类型</label><select class="mdui-select" id="select_id_api_edit_dlg_add_new_parm_retn' + api_edit_dlg_add_parm_retn + id + '" name="api_edit_dlg_add_new_parm_retn' + api_edit_dlg_add_parm_retn + id + '_type" mdui-select="{position:\'bottom\'}"><option value="string" selected>string</option><option value="integer">integer</option></select></div><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>');
    mdui.mutation();
  } else if (type == 2) {
    api_edit_dlg_add_parm_code = api_edit_dlg_add_parm_code + 1;
    $("#api_edit_dlg_stau_code_" + id).append(' <div class="mdui-valign" style="overflow:visible"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">状态码</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_api_edit_dlg_add_new_parm_code' + api_edit_dlg_add_parm_code + id + '\').attr(\'name\',$(this).val());" value="' + api_edit_dlg_add_parm_code + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="width:100%"><label class="mdui-textfield-label">状态说明</label><input id="id_api_edit_dlg_add_new_parm_code' + api_edit_dlg_add_parm_code + id + '" name="' + api_edit_dlg_add_parm_code + '" class="mdui-textfield-input" type="text" value="请填写状态码说明" required/><div class="mdui-textfield-error">请填写状态码介绍</div></div><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>');
    mdui.mutation();
  }
}

var api_edit_change_dlg_add_parm_rest = 0;
function api_edit_change_dlg_append(id,value) {
    value.split('&').forEach(function(itm) {    
    var arr = itm.split('=');
    api_edit_change_dlg_add_parm_rest = api_edit_change_dlg_add_parm_rest + 1;
    $("#api_edit_dlg_rest_parm_" + id).append('<div class="mdui-valign"><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:30%"><label class="mdui-textfield-label">参数</label><input class="mdui-textfield-input" type="text" oninput="$(\'#id_' + arr[0] + '\').attr(\'name\',$(this).val());$(\'#checkbox_' + arr[0] + '\').attr(\'name\',$(this).val() + \'_must\')" value="' + arr[0] + '" required/><div class="mdui-textfield-error">不能为空</div></div><div class="mdui-textfield mdui-float-left" style="padding-right:10px;width:100%"><label class="mdui-textfield-label">参数说明</label><input id="id_' + arr[0] + '" name="' + arr[0] + '" class="mdui-textfield-input" type="text" value="参数' + arr[0] + '的说明" required/><div class="mdui-textfield-error">请填写参数的介绍</div></div><label class="mdui-checkbox mdui-float-right" style="width:10%"><input id="checkbox_' + arr[0] + '" name="' + arr[0] + '_must" type="checkbox"/><i class="mdui-checkbox-icon"></i><font style="margin-left:-12px">必需</font></label><button class="mdui-btn mdui-btn-icon mdui-btn-dense" style="border-radius:100px;margin-left:5px;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"><i class="mdui-icon material-icons">delete</i></button></div>');
	});
    mdui.mutation();
}
function api_add_dlg_save_btn() {
	var api_name = getVue('api_add_dlg_api_name');
  var api_info = getVue('api_add_dlg_api_info');
  var api_url = getVue('api_add_dlg_api_url');
  var api_parm = getVue('api_add_dlg_rest_parm');
  var api_get = getChk('api_add_dlg_rest_type_get');
  var api_post = getChk('api_add_dlg_rest_type_post');
  var api_retn_type = getVue('api_add_dlg_retn_type');
  var api_type = 0;
  if (api_get && !api_post) {
    api_type = 1;
  } else if (!api_get && api_post) {
    api_type = 2;
  }
	/*if (api_retn_type != 0 && api_retn_type != 1) {
	var rest_formData = $('#api_add_dlg_save_cnt_rest_parm').serializeArray();
	var rest_json;
	if (!checkTxtK(rest_formData)) {
		var rest_parm = {}
		for (var i in rest_formData) {
          rest_parm[rest_formData[i].name] = rest_formData[i]['value'];
        }
		var str1s = "";
        for (var key in rest_parm) {
        if (!checkTxtK(key) && key.indexOf("_must") == -1 && key.indexOf("api_add_dlg_next_cnt_add_new_parm_rest") == -1) {
        var api_must = 0;
        if (rest_parm[key + "_must"] == "on") {
          api_must = 1;
        }
        str1s += "\"" + key + "\":{\"details\":{\"info\":\"" + rest_parm[key] + "\",\"must\":" + api_must + "}},";
       }
      }
	  rest_json = "{" + str1s.substr(0, str1s.length - 1) + "}";
	} else {
	  rest_json = "{}";
	}
	$.ajax({
    url: './admin/',
    type: 'POST',
	dataType: 'text',
    data: 'action=add&type=api&api_name=' + api_name + '&api_info=' + api_info + '&api_url=' + encodeURIComponent(api_url) + '&api_parm=' + api_parm.replace(/&/g,';').replace(/=/g,',') + '&api_type=' + api_type + '&api_rest=' + rest_json + '&api_retn=' + encodeURIComponent(api_url + '?' + api_parm) + '&api_sta_code={}&api_retn_type=' + api_retn_type,
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
        api_add_dlg.close();
        setTimeout(function() {
          reLoad();
        },
        2000);
      }
    },
    error: function(msg) {
      showSnackbar('提交失败');
    }
  });
	  } else {*/
  var rest_formData = $('#api_add_dlg_save_cnt_rest_parm').serializeArray();
  var retn_formData = $('#api_add_dlg_save_cnt_retn_parm').serializeArray();
  var code_formData = $('#api_add_dlg_save_cnt_stau_code').serializeArray();
  var rest_parm = {}
  var retn_parm = {}
  var stau_code = {}
  for (var i in rest_formData) {
    rest_parm[rest_formData[i].name] = rest_formData[i]['value'];
  }
  for (var i in retn_formData) {
    retn_parm[retn_formData[i].name] = retn_formData[i]['value'];
  }
  for (var i in code_formData) {
    stau_code[code_formData[i].name] = code_formData[i]['value'];
  }
  var str1 = "";
  var str2 = "";
  for (var key in rest_parm) {
    if (!checkTxtK(key) && key.indexOf("_must") == -1 && key.indexOf("api_add_dlg_next_cnt_add_new_parm_rest") == -1) {
      var api_must = 0;
      if (rest_parm[key + "_must"] == "on") {
        api_must = 1;
      }
      str1 += "\"" + key + "\":{\"details\":{\"info\":\"" + rest_parm[key] + "\",\"must\":" + api_must + "}},";
    }
  }
  var rest_json = "{" + str1.substr(0, str1.length - 1) + "}";
  for (var key in retn_parm) {
    if (!checkTxtK(key) && key.indexOf("_type") == -1 && key.indexOf("api_add_dlg_next_cnt_add_new_parm_retn") == -1) {
      str2 += "\"" + key + "\":{\"details\":{\"info\":\"" + retn_parm[key] + "\",\"type\":\"" + retn_parm[key + "_type"] + "\"}},";
    }
  }
  var retn_json = "{" + str2.substr(0, str2.length - 1) + "}";
  var code_json = JSON.stringify(stau_code);
  $.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=add&type=api&api_name=' + api_name + '&api_info=' + api_info + '&api_url=' + encodeURIComponent(api_url) + '&api_parm=' + api_parm.replace(/&/g,';').replace(/=/g,',') + '&api_type=' + api_type + '&api_rest=' + rest_json + '&api_retn=' + retn_json + '&api_sta_code=' + code_json + '&api_retn_type=' + api_retn_type,
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
        api_add_dlg.close();
        setTimeout(function() {
          reLoad();
        },
        2000);
      }
    },
    error: function(msg) {
      showSnackbar('提交失败');
    }
  });
  //}
}

function api_edit_dlg_save_btn(id) {
  var rest_formData = $('#api_edit_dlg_rest_parm_' + id).serializeArray();
  var retn_formData = $('#api_edit_dlg_retn_parm_' + id).serializeArray();
  var code_formData = $('#api_edit_dlg_stau_code_' + id).serializeArray();
  var rest_parm = {}
  var retn_parm = {}
  var stau_code = {}
  for (var i in rest_formData) {
    rest_parm[rest_formData[i].name] = rest_formData[i]['value'];
  }
  for (var i in retn_formData) {
    retn_parm[retn_formData[i].name] = retn_formData[i]['value'];
  }
  for (var i in code_formData) {
    stau_code[code_formData[i].name] = code_formData[i]['value'];
  }
  var str1 = "";
  var str2 = "";
  for (var key in rest_parm) {
    if (!checkTxtK(key) && key.indexOf("_must") == -1 && key.indexOf("api_edit_dlg_add_new_parm_rest") == -1) {
      var api_must = 0;
      if (rest_parm[key + "_must"] == "on") {
        api_must = 1;
      }
      str1 += "\"" + key + "\":{\"details\":{\"info\":\"" + rest_parm[key] + "\",\"must\":" + api_must + "}},";
    }
  }
  var rest_json = "{" + str1.substr(0, str1.length - 1) + "}";
  for (var key in retn_parm) {
    if (!checkTxtK(key) && key.indexOf("_type") == -1 && key.indexOf("api_edit_dlg_add_new_parm_retn") == -1) {
      str2 += "\"" + key + "\":{\"details\":{\"info\":\"" + retn_parm[key] + "\",\"type\":\"" + retn_parm[key + "_type"] + "\"}},";
    }
  }
  var retn_json = "{" + str2.substr(0, str2.length - 1) + "}";
  var code_json = JSON.stringify(stau_code);
  var api_name = getVue('api_edit_dlg_api_name_' + id);
  var api_info = getVue('api_edit_dlg_api_info_' + id);
  var api_url = getVue('api_edit_dlg_api_url_' + id);
  var api_parm = getVue('api_edit_dlg_api_rest_parm_' + id);
  var api_get = getChk('api_edit_dlg_rest_type_get_' + id);
  var api_post = getChk('api_edit_dlg_rest_type_post_' + id);
  var api_type = 0;
  if (api_get && !api_post) {
    api_type = 1;
  } else if (!api_get && api_post) {
    api_type = 2;
  }
  $.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=edit&type=api&api_id=' + id + '&api_name=' + api_name + '&api_info=' + api_info + '&api_url=' + encodeURIComponent(api_url) + '&api_parm=' + api_parm.replace(/&/g,';').replace(/=/g,',') + '&api_type=' + api_type + '&api_rest=' + rest_json + '&api_retn=' + retn_json + '&api_sta_code=' + code_json,
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
        api_edit_dlg(id, false).close();
        setTimeout(function() {
          reLoad();
        },
        2000);
      }
    },
    error: function(msg) {
      showSnackbar('提交失败');
    }
  });
}
function api_add_dlg_api_url_check(url) {
  if (url.indexOf('?') != -1 && url.indexOf('=') != -1) {
  var result = /(?<=\?)(.*)=(.*)/.exec(url);
  setVue('api_add_dlg_api_url', url.replace('?'+result[0],''));
  setVue('api_add_dlg_rest_parm', result[0]);
  }
}
function dialog_thankslist_add_btn() {
  var thank_name = getVue('dialog_thankslist_add_name');
  var thank_price = getVue('dialog_thankslist_add_price');
  var thank_time = getVue('dialog_thankslist_add_time');
  var thank_qq = getVue('dialog_thankslist_add_qq');
  if (checkTxtK(thank_name)) {
    showSnackbar('请填写老板的大名');
  } else if (checkTxtK(thank_price)) {
    showSnackbar('给了多少软妹币？');
  } else if (checkTxtK(thank_time)) {
    showSnackbar('请填写赞助时间');
  } else if (checkTxtK(thank_qq)) {
    showSnackbar('请填写老板的联系QQ');
  } else {
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=add&type=thanks&name=' + thank_name + '&price=' + thank_price + '&time=' + thank_time + '&qq=' + thank_qq,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          dialog_thankslist_add.close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('提交失败');
      }
    });
  }
}
function dialog_thankslist_delete_btn(id) {
  $.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=delete&type=thanks&thanks_id=' + id,
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
        dialog_thankslist_edit(id, false).close();
        delDiv('dialog_thankslist_item_' + id);
      }
    },
    error: function(msg) {
      showSnackbar('提交失败');
    }
  });
}
function dialog_friendlink_add_btn(opt) {
  var friend_icon = getVue('dialog_friendlink_add_icon');
  var friend_name = getVue('dialog_friendlink_add_name');
  var friend_info = getVue('dialog_friendlink_add_info');
  var friend_url = getVue('dialog_friendlink_add_url');
  if (checkTxtK(friend_icon)) {
    showSnackbar('请填写友链图标');
  } else if (checkTxtK(friend_name)) {
    showSnackbar('请填写友链名称');
  } else if (checkTxtK(friend_info)) {
    showSnackbar('请填写友链介绍');
  } else if (checkTxtK(friend_url)) {
    showSnackbar('请填写友情链接');
  } else {
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=add&type=friend&name=' + friend_name + '&icon=' + encodeURIComponent(friend_icon) + '&info=' + friend_info + '&url=' + encodeURIComponent(friend_url) + '&isapply=' + opt,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          dialog_friendlink_add.close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('提交失败');
      }
    });
  }
}
function dialog_friendlink_delete_btn(id,name) {
  $.ajax({
    url: './admin/',
    type: 'POST',
	  dataType: 'text',
    data: 'action=delete&type=friend&friend_id=' + id + '&friend_name=' +name,
    success: function(obj) {
      var json = JSON.parse(obj);
      var code = json['code'];
      var msg = json['msg'];
      showSnackbar(msg);
      if (code == 200) {
        dialog_friendlink_edit(id, false).close();
        delDiv('dialog_friendlink_item_' + id);
      }
    },
    error: function(msg) {
      showSnackbar('提交失败');
    }
  });
}

function dialog_friendlink_edit_btn(id) {
  var friend_icon = getVue('dialog_friendlink_edit_' + id + '_icon');
  var friend_name = getVue('dialog_friendlink_edit_' + id + '_name');
  var friend_info = getVue('dialog_friendlink_edit_' + id + '_info');
  var friend_url = getVue('dialog_friendlink_edit_' + id + '_url');
  if (checkTxtK(friend_icon)) {
    showSnackbar('请填写友链图标');
  } else if (checkTxtK(friend_name)) {
    showSnackbar('请填写友链名称');
  } else if (checkTxtK(friend_info)) {
    showSnackbar('请填写友链介绍');
  } else if (checkTxtK(friend_url)) {
    showSnackbar('请填写友情链接');
  } else {
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=edit&type=friend&id=' + id + '&name=' + friend_name + '&icon=' + encodeURIComponent(friend_icon) + '&info=' + friend_info + '&url=' + encodeURIComponent(friend_url),
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          dialog_friendlink_edit(id, false).close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('提交失败');
      }
    });
  }
}
function dialog_thankslist_edit_btn(id) {
  var thank_name = getVue('dialog_thankslist_edit_' + id + '_name');
  var thank_price = getVue('dialog_thankslist_edit_' + id + '_price');
  var thank_time = getVue('dialog_thankslist_edit_' + id + '_time');
  var thank_qq = getVue('dialog_thankslist_edit_' + id + '_qq');
  if (checkTxtK(thank_name)) {
    showSnackbar('请填写老板的大名');
  } else if (checkTxtK(thank_price)) {
    showSnackbar('给了多少软妹币？');
  } else if (checkTxtK(thank_time)) {
    showSnackbar('请填写赞助时间');
  } else if (checkTxtK(thank_qq)) {
    showSnackbar('请填写老板的联系QQ');
  } else {
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=edit&type=thanks&id=' + id + '&name=' + thank_name + '&price=' + thank_price + '&time=' + thank_time + '&qq=' + thank_qq,
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          dialog_thankslist_edit(id, false).close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('提交失败');
      }
    });
  }
}
function dialog_paymethod_edit_btn(isnull) {
  var paymethod_qq = getVue('dialog_paymethod_edit_qq');
  var paymethod_wx = getVue('dialog_paymethod_edit_wx');
  var paymethod_ali = getVue('dialog_paymethod_edit_ali');
  if (checkTxtK(paymethod_qq) && checkTxtK(paymethod_wx) && checkTxtK(paymethod_ali)) {
    showSnackbar('请务必填写一个');
  } else {
    var action;
    if (isnull == 0) {
      action = 'add';
    } else {
      action = 'edit';
    }
    $.ajax({
      url: './admin/',
      type: 'POST',
	  dataType: 'text',
      data: 'action=' + action + '&type=paymethod&qqpay=' + encodeURIComponent(paymethod_qq) + '&wxpay=' + encodeURIComponent(paymethod_wx) + '&alipay=' + encodeURIComponent(paymethod_ali),
      success: function(obj) {
        var json = JSON.parse(obj);
        var code = json['code'];
        var msg = json['msg'];
        showSnackbar(msg);
        if (code == 200) {
          dialog_paymethod_edit.close();
          setTimeout(function() {
            reLoad();
          },
          2000);
        }
      },
      error: function(msg) {
        showSnackbar('提交失败');
      }
    });
  }
}
function api_admin_settop(api_id, api_name, istop) {
  /*var str;
  if (istop == 0) {
    str = '置顶';
  } else if (istop == 1) {
    str = '取消置顶';
  }
  var api_settop_snackbar = mdui.snackbar({
    message: '确定' + str + api_name + '？',
    buttonText: '确定',
    position: positions,
    onButtonClick: function() {*/
      $.ajax({
        url: './admin/',
        type: 'POST',
	  dataType: 'text',
        data: 'action=setop&type=api&id=' + api_id + '&istop=' + istop + '&api_name=' + api_name,
        success: function(obj) {
          var json = JSON.parse(obj);
          var code = json['code'];
          var msg = json['msg'];
          showSnackbar(msg);
          if (code == 200) {
            //api_settop_snackbar.close();
            setTimeout(function() {
              reLoad();
            },
            2000);
          }
        },
        error: function(msg) {
          //api_settop_snackbar.close();
          showSnackbar('置顶失败');
        }
      });
    /*}
  });*/
}
function api_admin_dis_ena(api_id, api_name, statu) {
  var str;
  if (statu == 0) {
    str = '停用';
  } else if (statu == 1) {
    str = '启用';
  }
  var api_disable_snackbar = mdui.snackbar({
    message: '确定' + str + api_name + '？',
    buttonText: '确定',
    position: positions,
    onButtonClick: function() {
      $.ajax({
        url: './admin/',
        type: 'POST',
	  dataType: 'text',
        data: 'action=en_dis&type=api&id=' + api_id + '&statu=' + statu + '&api_name=' + api_name,
        success: function(obj) {
          var json = JSON.parse(obj);
          var code = json['code'];
          var msg = json['msg'];
          showSnackbar(msg);
          if (code == 200) {
            api_disable_snackbar.close();
            setTimeout(function() {
              reLoad();
            },
            2000);
          }
        },
        error: function(msg) {
          api_disable_snackbar.close();
          showSnackbar(str + '失败');
        }
      });
    }
  });
}
function api_admin_delete(api_id, api_name) {
  var api_delete_snackbar = mdui.snackbar({
    message: '确定删除' + api_name + '？',
    buttonText: '确定',
    position: positions,
    onButtonClick: function() {
      $.ajax({
        url: './admin/',
        type: 'POST',
	  dataType: 'text',
        data: 'action=delete&type=api&id=' + api_id + '&api_name=' + api_name,
        success: function(obj) {
          var json = JSON.parse(obj);
          var code = json['code'];
          var msg = json['msg'];
          showSnackbar(msg);
          if (code == 200) {
            api_delete_snackbar.close();
            delDiv('api_card_' + api_id);
          }
        },
        error: function(msg) {
          api_delete_snackbar.close();
          showSnackbar('删除失败');
        }
      });
    }
  });
}