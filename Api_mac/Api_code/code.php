<?php
class Vcode {
	private $width;
	//宽
	private $height;
	//高
	private $num;
	//数量
	private $code;
	//验证码
	private $img;
	//图像的资源
	//构造方法， 三个参数
	function __construct($width=80, $height=20, $num=4) {
		$this->width = $width;
		$this->height = $height;
		$this->num = $num;
     $this->code = $this->createcode();
		//调用自己的方法
	}
	//获取字符的验证码， 用于保存在服务器中
	function getcode() {
		return $this->ret;
	}
	//输出图像
	function outimg() {
		//创建背景 (颜色， 大小， 边框)
		$this->createback();
		//画字 (大小， 字体颜色)
		$this->outstring();
		//干扰元素(点， 线条)
		$this->setdisturbcolor();
		//输出图像
		$this->printimg();
	}
	//创建背景
	private function createback() {
		//创建资源
		$this->img = imagecreatetruecolor($this->width, $this->height);
		//设置随机的背景颜色
		$bgcolor = imagecolorallocate($this->img, rand(225, 255), rand(225, 255), rand(225, 255));
		//设置背景填充
		imagefill($this->img, 0, 0, $bgcolor);
		//画边框
		$bordercolor = imagecolorallocate($this->img, 0, 0, 0);
		imagerectangle($this->img, 0, 0, $this->width-1, $this->height-1, $bordercolor);
	}
	//画字
	private function outstring() {
		for ($i=0; $i<$this->num; $i++) {
			$rgb=$this->hex2rgb($this->randrgb());
			$color = imagecolorallocate($this->img, $rgb["r"], $rgb["g"], $rgb["b"]);
			$fontsize=rand(3,5);
			//字体大小
			$x = 3+($this->width/$this->num)*$i;
			//水平位置
			$y = rand(0, imagefontheight($fontsize)-3);
			//画出每个字符
			imagechar($this->img, $fontsize, $x, $y, $this->code {
				$i
			}
			, $color);
		}
	}
	//设置干扰元素
	private function setdisturbcolor() {
		//加上点数
		for ($i=0; $i<rand(30,60); $i++) {
			$color= imagecolorallocate($this->img, rand(0, 255), rand(0, 255), rand(0, 255));
			imagesetpixel($this->img, rand(1, $this->width-2), rand(1, $this->height-2), $color);
		}
				//加线条
		for ($i=0; $i<rand(1,3); $i++) {
			$color= imagecolorallocate($this->img, rand(0, 255), rand(0, 128), rand(0, 255));
			imagearc($this->img,rand(-10, $this->width+10), rand(-10, $this->height+10), rand(30, 300), rand(30, 300), 55,44, $color);
		}
		
	}
	//输出图像
	private function printimg() {
		if (imagetypes() & IMG_GIF) {
			header("Content-type: image/gif");
			imagegif($this->img);
		} elseif (function_exists("imagejpeg")) {
			header("Content-type: image/jpeg");
			imagegif($this->img);
		} elseif (imagetypes() & IMG_PNG) {
			header("Content-type: image/png");
			imagegif($this->img);
		} else {
			die("No image support in this PHP server");
		}
	}
	//生成验证码字符串
	private function createcode() {
		$rand=rand(1,3);
		switch($rand) {
			case 1:
			$one=rand(1,9);
			$two=rand(1,9);
			$this->ret=$one+$two;
			return $one."+".$two."=？";
			break;
			case 2:
			$code=$this->keys(4);
			$this->ret=$code;
			return $code;
			break;
			case 3:
			$one=rand(1,9);
			$two=rand(1,8);
			if($one==$two) {
				$one=$one+1;
				$two=$two;
			}else if($one>$two) {
				$one=$one;
				$two=$two;
			}  else if($one<$two) {
				$one=$two+1;
				$two=$one;
			} else {
				$one=$one+1;
				$two=$two;
			}
			$this->ret=$one-$two;
			return $one."-".$two."=？";
			break;
		}
	}
	private function keys($length=6) {
		$pattern = str_shuffle('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ');
		for ($i=0;$i<$length;$i++) {
			$key .= $pattern[mt_rand(0,35)];
			//生成php随机数
		}
		return $key;
	}
	private function randrgb() {
		$str='0123456789ABCDEF';
		$estr='#';
		$len=strlen($str);
		for ($i=1;$i<=6;$i++) {
			$num=rand(0,$len-1);
			$estr=$estr.$str[$num];
		}
		return $estr;
	}
	private function hex2rgb($hexColor) {
		$color=str_replace('#','',$hexColor);
		if (strlen($color)> 3) {
			$rgb=array(
						  'r'=>hexdec(substr($color,0,2)),
						  'g'=>hexdec(substr($color,2,2)),
						  'b'=>hexdec(substr($color,4,2))
						 );
		} else {
			$r=substr($color,0,1). substr($color,0,1);
			$g=substr($color,1,1). substr($color,1,1);
			$b=substr($color,2,1). substr($color,2,1);
			$rgb=array( 
						  'r'=>hexdec($r),
						  'g'=>hexdec($g),
						  'b'=>hexdec($b)
						 );
		}
		return $rgb;
	}
	//用于自动销毁图像资源
	function __destruct() {
		imagedestroy($this->img);
	}
}
session_start();
$vcode = new Vcode(80, 30, 4);
//将验证码放到服务器自己的空间保存一份
$_SESSION['code'] = $vcode->getcode();
//将验证码图片输出
$vcode->outimg();