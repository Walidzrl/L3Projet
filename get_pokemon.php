<?php 
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
  $id1 = isset($_GET['id1']) ? $_GET['id1'] : null;  /* $id1 =   */
  $id2 = isset($_GET['id2']) ? $_GET['id2'] : null;

  $pokemon1 = $id1 ? getPokemonById($id1) : null;  
  $pokemon2 = $id2 ? getPokemonById($id2) : null;

  $pokemon1Json = $pokemon1 ? json_encode($pokemon1) : "null";
  $pokemon2Json = $pokemon2 ? json_encode($pokemon2) : "null"; ?>