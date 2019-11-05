<?php

$driver = 'mysql';
$host = 'localhost';
$db_name = 'report';
$db_user = 'root';
$db_pass = '';
$charset = 'utf8';
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

try{
  $pdo = new PDO("$driver:host=$host;dbname=$db_name;charset=$charset", $db_user, $db_pass, $options);

  if(isset($_COOKIE['page_visit'])){
    setcookie('page_visit', ++$_COOKIE['page_visit'], time() + 5);
  } else {
    setcookie('page_visit', 1, time()+5);
    $_COOKIE['page_visit'] = 1;
  }

}catch(PDOException $e){
  die('Подключение не удалось');
}

?>
