<?php
require_once '../db.php';

$query = $pdo->query("SELECT * from articles");
$query = $query->fetchAll();

echo json_encode($query);