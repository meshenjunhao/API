<html>
<head><title><?php echo $title?$title:"404 Not Found"; ?></title></head>
<body>
<center><h1><?php echo $contents?$contents:"404 Not Found"; ?></h1></center>
<?php 
if($report){
?>
<center><?php echo $report; ?></center>
<?php } ?>
<hr><center>JieAdmin version：<?php echo $version; ?></center>
</body>
</html>
