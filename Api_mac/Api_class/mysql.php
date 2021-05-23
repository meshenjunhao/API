<?php
class mysql {
	public function __construct() {
		global $config;
		$this->connect($config);
		//连接数据库
	}
	public function connect($config) {
		$this->conn = new mysqli();
		$this->conn ->connect($config["host"],$config["user"],$config["pwd"],$config["dbname"]);
		mysqli_query($this->conn,'set names utf8');
		if ($this->conn -> connect_errno) {
			//数据库链接失败
			$this->mysql_error = $this->conn->connect_error;
		}
	}
	public function perform($sql) {
		if(empty($sql)) {
			//指令为空
			$this->mysql_error = "Sql execution failed, reason: directive is empty！";
			return false;
		}
		$query = mysqli_query($this->conn,$sql);
		if($this->conn->errno) {
			//执行失败
			$this->mysql_error = "Sql execution failed, reason: ".mysqli_error($this->conn);
			return false;
		}
		return $query;
	}
	public function Add($name,$array=false) {
		if(!is_array($array)) {
			$this->mysql_error = "Record add failed, reason: not an array！";
			return false;
		}
		$perform=get_array_end($array);
		foreach ($array as $key => $value) {
			if($key===$perform["key"]) {
				$table .=$key;
				$values .= "'" . $value."'";
			} else {
				$table .= $key . ",";
				$values .= "'" . $value . "',";
			}
		}
		$sql = "INSERT INTO $name($table) VALUES($values)";
		return $this->perform($sql);
	}
	public function query($name,$table=false,$key=false,$all=false) {
		if($table) {
			$query=$this->perform("SELECT * FROM ".$name." WHERE ".$table."= '".$key."'");
		} else {
			$query=$this->perform("SELECT * FROM ".$name);
		}
		if(!$query) {
			die($this->mysql_error);
		}
		while($row = mysqli_fetch_array($query)) {
			foreach($row as $key=>$value) {
				if(!preg_match("/[0-9]+/",$key)) {
					$data[$key]=$value;
				}
			}
			$array[]=$data;
		}
		if($all) {
			return $array;
		}
		if(is_array($array)) {
			$end=end($array);
			if(!$end!==$array) {
				$array=$array[0];
			}
		}
		return $array;
	}
	public function update($name,$array=false,$where='') {
		if(!is_array($array)) {
			$this->mysql_error = "Record add failed, reason: not an array！";
			return false;
		}
		$perform=get_array_end($array);
		$values="";
		foreach ($array as $key => $value) {
			if($key===$perform["key"]) {
				$values .= $key . "='" . $value . "'";
			} else {
				$values .= $key . "='" . $value . "',";
			}
		}
		$sql = "UPDATE ".$name." SET ".$values;
		$sql .= $where ? " WHERE $where" : null;
		return $this->perform($sql);
	}
	public function delete($name, $where = "") {
		$sql = "DELETE FROM $name";
		$sql .= $where ? " WHERE $where" : null;
		return $this->perform($sql);
	}
	public function pagination($name,$start,$end) {
		$sql = "SELECT * FROM ".$name." limit ".$start.",".$end;
		$query=$this->perform($sql);
		if(!$query) {
			die($this->mysql_error);
		}
		while($row = mysqli_fetch_array($query)) {
			foreach($row as $key=>$value) {
				if(!preg_match("/[0-9]+/",$key)) {
					$data[$key]=$value;
				}
			}
			$array[]=$data;
		}
		return $array;
	}
}
?>