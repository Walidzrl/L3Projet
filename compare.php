<!DOCTYPE html>
<html lang="en">
<head>
  <?php include 'get_pokemon.php'; ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <title>Comparaison des statistiques de Pokémon</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
</head>
<body>
<header>
  <h1>Comparateur de pokemons</h1>
</header>
<nav>
    <ul>
        <li><a href="index.html">Accueil</a></li>
        <li><a href="catalogue.html">Catalogue</a></li>
    </ul>
  </nav>
  <h1>Comparaison des statistiques de Pokémon</h1>

  <div class="container">
      <div class="box 1">
          <div class="card">
            
            
            <img id="pokemon1-img" src="images/default.png" alt="Pokémon 1" />
            <div id="pokemon1-info"></div>
            <canvas id="pokemon1-donut-chart"></canvas>
            
            
          </div>
      </div>
  
    <div class="box 2">
    <canvas id="pokemon-stats-chart" width="500" height="500"></canvas>
    <canvas id="totalComparisonChart"></canvas>
    
    </div>

    <div class="box 3">
          <div class="card">
            
            <img id="pokemon2-img" src="images/default.png" alt="Pokémon 2" />
            <div id="pokemon2-info"></div>
            <canvas id="pokemon2-donut-chart"></canvas>
            
            
          </div>
      </div>

<script>
  const pokemon1 = <?php echo $pokemon1Json; ?>;
  const pokemon2 = <?php echo $pokemon2Json; ?>;
</script>

<script src="app.js"></script> 

 
</body>
</html>
