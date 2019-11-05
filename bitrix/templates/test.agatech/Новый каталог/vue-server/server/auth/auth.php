<?php
require_once '../db.php';
$mail = trim($_POST['mail']);
$pass = trim($_POST['password']);

if(!empty($mail) && !empty($pass)){
  // check users

  $sql = 'SELECT mail, password, access FROM users WHERE mail = :mail';
  $params = [':mail' => $mail];

  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);

  $user = $stmt->fetch(PDO::FETCH_OBJ);

  if($user){
    if(password_verify($pass, $user->password)){
      echo 'Авторизация прошла успешно';
      $_COOKIE['auth'] = 1;
    }else{
      echo 'Неверный логин или пароль';
    }
  }else{
    echo 'Неверный логин или пароль';
  }



} else {
  echo 'Пожалуйста, заполните все поля';
}

?>