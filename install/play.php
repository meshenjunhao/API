<?php
$source=$_REQUEST['source'];
if($source!='kangle'&&$source!='bt'){
die('404');
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>

    <body>
        <video id="video" src="./mp4/<?php echo $source; ?>.mp4" controls="controls" autoplay height="100%" width="100%">您的浏览器不支持。</video>
        <button type="button" style="text-align: center;" onclick="launchFullScreen(document.getElementById('video'))">全屏</button>
    </body>

    <script type="text/javascript">
    //全屏幕播放
    function launchFullScreen(element) {
      if(element.requestFullScreen) {
        element.requestFullScreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      }
    }
    </script>
</html>