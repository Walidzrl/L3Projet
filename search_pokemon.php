
<?php
header("Content-Type: application/json");

require_once "bd.php"; // Assurez-vous que votre fichier de fonctions est correctement importé

if (isset($_GET["name"])) {
    $name = $_GET["name"];
    $pokemon = getPokemonByName($name);

    if ($pokemon) {
        echo json_encode($pokemon);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Pokemon not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}
?>
