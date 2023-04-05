<!DOCTYPE html>

<?php require('bd.php'); ?>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PokéStats - Accueil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Bienvenue sur PokéStats</h1>
        <p>Le site pour comparer les statistiques des Pokémon</p>
    </header>

    <nav>
        <ul>
            <li><a href="index.html">Accueil</a></li>
            <li><a href="recherche.html">Recherche</a></li>
            <li><a href="comparaison.html">Comparaison</a></li>
            <li><a href="apropos.html">À propos</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2>Présentation</h2>
            <p>Sur PokéStats, vous pouvez rechercher et comparer les statistiques de tous les Pokémon. Utilisez notre fonction de recherche pour trouver rapidement des informations sur un Pokémon spécifique, ou utilisez notre outil de comparaison pour comparer les statistiques de deux Pokémon ou plus côte à côte.</p>
        </section>

        <section>
            <h2>Comment ça marche ?</h2>
            <p>Pour commencer, utilisez notre barre de navigation ci-dessus pour accéder à la page de recherche ou de comparaison. Vous pouvez également cliquer sur les liens ci-dessous :</p>
            <ul>
                <li><a href="recherche.html">Recherche de Pokémon</a></li>
                <li><a href="comparaison.html">Comparaison de Pokémon</a></li>
            </ul>
            
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 PokéStats. Tous droits réservés.</p>
        <p><a href="contact.html">Contact</a> | <a href="mentionslegales.html">Mentions légales</a></p>
    </footer>
    <?php  echo getAllPokemon() ; ?>
    