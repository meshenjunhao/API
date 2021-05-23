<?php
header("Content-Type: application/xml");
$apilist=$db->query("api",false,false,true);
$date=date("Y-m-d");
$map.=<<<XML
<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet type="text/xsl" href="//{$_SERVER["HTTP_HOST"]}/sitemap.xsl" ?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
 <loc>{$_SERVER["REQUEST_SCHEME"]}://{$_SERVER["HTTP_HOST"]}/</loc>
</url>
XML;
foreach($apilist as $k=>$v){
$Y=date('Y',$v['add_time']);
$m=date('m',$v['add_time']);
$d=date('d',$v['add_time']);
$map.=<<<XML
<url>
 <loc>{$_SERVER["REQUEST_SCHEME"]}://{$_SERVER["HTTP_HOST"]}/{$Y}/{$m}/{$d}/{$v["appid"]}.html</loc>
</url>

XML;
}
$map.=<<<XML
</urlset>
XML;
echo $map;