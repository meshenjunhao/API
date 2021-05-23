var positions;
if (isPC() != false) {
  positions = 'right-top'
} else {
  positions = 'bottom';
}
var mdui_drawer = new mdui.Drawer('#left-drawer', {
  swipe: true
});
/*window.alert = function(msg){
  mdui.alert(msg, '提示',
    function(){
   
    },
    {
      confirmText: '确定',
      history: false,
      modal: true,
      closeOnEsc: false
    }
  );
}*/
function open_drawer() {
  mdui_drawer.open();
}
function close_drawer() {
  mdui_drawer.close();
}
function toggle_drawer() {
  mdui_drawer.toggle();
}
function scrolTop(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
function scrolCnt(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
}
function scrolBom(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  })
}
//自动设置年份
$('.copyright_year').html(new Date().getFullYear());
//返回顶部
$(window).scroll(function() {
  if ($(window).scrollTop() > 100) {
    $('#fab_up').removeClass('mdui-fab-hide');
  } else {
    $('#fab_up').addClass('mdui-fab-hide');
  }
});
//平缓滚动到顶部
function scrolTop(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
};
//打开图片预览
function imgbig(obj) {
  $('#bigimg').html("<img id='imgview' style='width:100%;height:100%;margin:0px;padding:0px;' src=" + obj.src + " style='display:none;'/>");
  $('#bigimg').fadeIn();
  document.body.style.width = '100%';
  document.body.style.height = '100%';
  document.body.style.position = 'fixed';
};
//关闭图片预览
function closeimg() {
  $('#bigimg').fadeOut();
  document.body.style.width = '';
  document.body.style.height = '';
  document.body.style.position = '';
};
//设置图片资源
function setImgsrc(obj) {
  return objUrl = getObjectURL(obj.files[0]);
};
//获取图片资源
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};
//获取链接参数
function getParam(name, noDecode) {
  var re = new RegExp("(?:\\?|#|&)" + name + "=([^&]*)(?:$|&|#)", "i"),
  m = re.exec(window.location.href);
  var ret = m ? m[1] : "";
  return ! noDecode ? decodeURIComponent(ret) : ret
};
//
function requestGET(url) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', url, true);
  httpRequest.send();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var json = httpRequest.responseText;
      return json;
    }
  }
}
//判断内容是否为空
function checkTxtK(value) {
  if (value == '' || value == 'undefined' || value == null) {
    return true;
  }
  return false;
};
//判断内容是否相同
function checkTxtD(value1, value2) {
  if (value1 == value2) {
    return true;
  }
  if ("'" + value1 + "'" == "'" + value2 + "'") {
    return true;
  }
  return false;
};
function checkTxtB(value, value2) {
  if (value.indexOf(value2) != -1) {
    return true;
  }
  return false;
}
//判断是否为电脑
function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};
//转换大小数值
function convSize(limit) {
  if (limit >= 1073741824) {
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  } else if (limit >= 1048576) {
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else if (limit >= 1024) {
    size = (limit / 1024).toFixed(2) + "KB";
  } else {
    size = limit.toFixed(2) + "B";
  }
  var sizestr = size + "";
  return sizestr;
};
//设置网页图标
function changeFavicon(link) {
  let $favicon = document.querySelector('link[rel="shortcut icon"]');
  if ($favicon !== null) {
    $favicon.href = link;
  } else {
    $favicon = document.createElement('link');
    $favicon.rel = 'shortcut icon';
    $favicon.href = link;
    document.head.appendChild($favicon);
  }
};
//修改head标签
function changeMeta(tga, value) {
  document.querySelector('meta[name="' + tga + '"]').setAttribute('content', value);
};
//返回上一页
function goBack() {
  window.history.go( - 1);
};
//刷新当前页
function reLoad() {
  location.reload();
};
//打开QQ
function openQQ(qs, is) {
  if (is == 'qq') {
    openUrl('http://api.0047ol.com/qq/index.php?num=' + qs + '&type=qq&add=true');
  } else if (is == 'qun') {
    openUrl('http://api.0047ol.com/qq/index.php?num=' + qs + '&type=qun&add=true');
  }
};
//打开邮箱
function sendMail(email) {
  openUrl('mailto:' + email);
};
function openCoolapk(uid) {
  openUrl('coolmarket://u/' + uid);
};
//打开网页
function openUrl(url) {
  //setTimeout( function(){
  window.open(url);
  //},1000);
};
//打开网页
function locaUrl(url) {
  //setTimeout( function(){
  window.location.href = url;
  //},1000);
};
//
function delCls(id, cls) {
  document.getElementById(id).classList.remove(cls);
};
function delDiv(id) {
  var the = document.getElementById(id);
  the.parentNode.removeChild(the);
};
//
function addCls(id, cls) {
  document.getElementById(id).classList.add(cls);
};
//
function repCls(id, cls1, cls2) {
  var DomClass = document.getElementById(id).className;
  DomClass = DomClass.replace(cls1, cls2);
  document.getElementById(id).className = DomClass;
};
//
function shoCls(id) {
  document.getElementById(id).style.display = '';
};
//
function hidCls(id) {
  document.getElementById(id).style.display = 'none';
};
//
function getVue(id) {
  return $('#' + id).val();
};
function setVue(id, value) {
  document.getElementById(id).value = value;
};
//
function setSrc(id, value) {
  document.getElementById(id).src = value;
};
function setAtt(id, key, value) {
  document.getElementById(id).setAttribute(key, value);
};
//
function getSrc(id) {
  return document.getElementById(id).src;
};
//
function setCnt(id, value) {
  document.getElementById(id).innerHTML = value;
};
//
function getCnt(id) {
  return document.getElementById(id).innerHTML;
};
//
function getChk(id) {
  if (document.getElementById(id).checked) {
    return true;
  }
  return false;
};
//
function setChk(id, value) {
  document.getElementById(id).checked = value;
};
function isWxQq() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger\/[0-9]/i)) {
    return "weixin";
  }
  if (ua.match(/QQ\/[0-9]/i)) {
    return "qq";
  }
  return false;
}
function Initialization() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
function showSnackbar(message) {
  mdui.snackbar({
    message: message,
    position: positions,
    timeout: 1500
  });
}
//将Ansi编码的字符串进行Base64编码
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encode64(input) {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while ( i < input . length );
  return output;
}
//将Base64编码字符串转换成Ansi编码的字符串
function decode64(input) {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  if (input.length % 4 != 0) {
    return "";
  }
  var base64test = /[^A-Za-z0-9\+\/\=]/g;
  if (base64test.exec(input)) {
    return "";
  }
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output += String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output += String.fromCharCode(chr3);
    }
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while ( i < input . length );
  return output;
}

function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
}

function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      // 0xxxxxxx
      out += str.charAt(i - 1);
      break;
    case 12:
    case 13:
      // 110x xxxx   10xx xxxx
      char2 = str.charCodeAt(i++);
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
    case 14:
      // 1110 xxxx  10xx xxxx  10xx xxxx
      char2 = str.charCodeAt(i++);
      char3 = str.charCodeAt(i++);
      out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
      break;
    }
  }
  return out;
}