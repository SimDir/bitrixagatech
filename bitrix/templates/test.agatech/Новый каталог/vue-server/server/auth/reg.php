<?php
require_once '../db.php';
$mail = trim($_POST['mail']);
$pass = trim($_POST['password']);

if(!empty($mail) && !empty($pass)){
  // check users
  $sql_check = 'SELECT EXISTS( SELECT mail FROM users WHERE mail = :mail )';
  $stmt_check = $pdo->prepare($sql_check);
  $stmt_check->execute( [':mail' => $mail] );

  if($stmt_check->fetchColumn()){
    die('Пользователь с таким E-mail уже существует');
  }


  $pass = password_hash($pass, PASSWORD_DEFAULT);

  $sql = 'INSERT INTO users(mail, password, access) VALUES(:mail, :password, "")';
  $params = [':mail' => $mail, ':password' => $pass];

  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);

  echo 'Регистрация прошла успешно';

} else {
  echo 'Пожалуйста, заполните все поля';
}

?>