// Affiche l'image du Pokémon en fonction de son nom
function setImage(pokemon, imgElementId, infoElementId) {
  const imgElement = document.getElementById(imgElementId);
  const infoElement = document.getElementById(infoElementId);

  if (pokemon) {
    const normalizedName = pokemon.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    imgElement.src = `images/${normalizedName}.png`;
    imgElement.alt = pokemon.name;

    // Ajoute le nom et les informations du Pokémon
    const pokemonInfoHtml = `
      <h3>${pokemon.name}</h3>
      <p><img src="images/${pokemon.type1}.png" alt="${pokemon.type1}" /></p>
      <p><img src="images/${pokemon.type2}.png" alt="${pokemon.type2}" /></p>
    `;

    infoElement.innerHTML = pokemonInfoHtml;
  } else {
    imgElement.src = 'images/default.png';
    imgElement.alt = 'Default Pokémon';
  }
}

  
  // Affiche le graphique de comparaison des statistiques des Pokémon
  function displayComparisonChart() {
    // Vérifie que les données Pokémon sont valides
    if (!pokemon1 || !pokemon2) {
      console.error('Erreur lors de la récupération des données des Pokémon');
      return;
    }
  
    // Appelle la fonction setImage pour chaque Pokémon
  setImage(pokemon1, 'pokemon1-img', 'pokemon1-info');
  setImage(pokemon2, 'pokemon2-img', 'pokemon2-info');
  
    // Crée des tableaux avec les statistiques de chaque Pokémon
    const pokemon1Stats = [
      pokemon1.hp,
      pokemon1.attack,
      pokemon1.defense,
      pokemon1.sp_atck,
      pokemon1.sp_def,
      pokemon1.speed,
    ];
  
    const pokemon2Stats = [
      pokemon2.hp,
      pokemon2.attack,
      pokemon2.defense,
      pokemon2.sp_atck,
      pokemon2.sp_def,
      pokemon2.speed,
    ];
  
    // Configuration du graphique radar
    const config = {
      type: 'radar',
      data: {
        labels: ['PV', 'Attaque', 'Défense', 'Attaque Spé.', 'Défense Spé.', 'Vitesse'],
        datasets: [
          {
            label: pokemon1.name,
            data: pokemon1Stats,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          },
          {
            label: pokemon2.name,
            data: pokemon2Stats,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 3
          }
        }
      }
    };
  
    // Crée et affiche le graphique
    const ctx = document.getElementById('pokemon-stats-chart').getContext('2d');
    new Chart(ctx, config);
  }
  
  // Affiche un graphique en anneau (donut) pour un Pokémon donné
  function displayDonutChart(pokemon, chartElementId) {
    if (!pokemon) {
      console.error("Erreur lors de la récupération des données du Pokémon");
      return;
    }
    const total = parseInt(pokemon.attack)**3 + parseInt(pokemon.sp_atck)**3 + parseInt(pokemon.speed)**3 + parseInt(pokemon.defense)**3 + parseInt(pokemon.sp_def)**3 + parseInt(pokemon.hp)**3;
    const attackSum = ((parseInt(pokemon.attack)**3 + parseInt(pokemon.sp_atck)**3 + parseInt(pokemon.speed)**3)/total)*100;
    const defenseSum = ((parseInt(pokemon.defense)**3 + parseInt(pokemon.sp_def)**3 + parseInt(pokemon.hp)**3)/total)*100;

    const data = {
      labels: ["Attaque", "Défense"],
      datasets: [
        {
          label: pokemon.name,
          data: [attackSum, defenseSum],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(153, 102, 255)",
          ],
          hoverOffset: 4,
        },
      ],
    };
  
    const config = {
      type: "doughnut",
      data: data,
    };
  
    const ctx = document.getElementById(chartElementId).getContext("2d");
    new Chart(ctx, config);
  }

  function displayTotalComparisonChart() {
    if (!pokemon1 || !pokemon2) {
      console.error("Erreur lors de la récupération des données des Pokémon");
      return;
    }
  
    const totalPokemon1 = pokemon1.total; // Utilisez le total du Pokémon 1
    const totalPokemon2 = pokemon2.total; // Utilisez le total du Pokémon 2
  
    const data = {
      labels: [pokemon1.name, pokemon2.name],
      datasets: [
        {
          label: "Total",
          data: [totalPokemon1, totalPokemon2],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          borderWidth: 1,
        },
      ],
    };
  
    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  
    const ctx = document.getElementById("totalComparisonChart").getContext("2d");
    const myChart = new Chart(ctx, config);
  }
  
  
  // Affiche les graphiques pour les Pokémon récupérés à partir du code PHP
  displayDonutChart(pokemon1, "pokemon1-donut-chart");
  displayDonutChart(pokemon2, "pokemon2-donut-chart");
  displayComparisonChart();
  displayTotalComparisonChart();

  
  