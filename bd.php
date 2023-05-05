<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "pokestats";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT * FROM pokemon");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $e) {
    // Affichez le message d'erreur dans le fichier error_log de PHP
    error_log("Erreur lors de la récupération des données des Pokémon : " . $e->getMessage());
    // Renvoyez un JSON vide avec une clé "error" pour indiquer que quelque chose s'est mal passé
    echo json_encode(["error" => "Erreur lors de la récupération des données des Pokémon"]);
}
$conn = null;


function getPokemonByName($name) {
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "pokestats";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("SELECT * FROM pokemon WHERE name = :name");
        $stmt->bindParam(':name', $name);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result);

    } catch (PDOException $e) {
        error_log("Erreur lors de la récupération des données du Pokémon : " . $e->getMessage());
        echo json_encode(["error" => "Erreur lors de la récupération des données du Pokémon"]);
    }

    $conn = null;
}

function getPokemonById($id) {
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "pokestats";

    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $stmt = $conn->prepare("SELECT * FROM pokemon WHERE id = :id");
      $stmt->bindParam(':id', $id, PDO::PARAM_INT);
      $stmt->execute();

      return $stmt->fetch(PDO::FETCH_ASSOC);

    } catch (PDOException $e) {
      error_log("Erreur lors de la récupération des données du Pokémon : " . $e->getMessage());
      return null;
    }
  }
?>

