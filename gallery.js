// Attend que le document soit chargé pour exécuter le code
document.addEventListener("DOMContentLoaded", function () {
  const typeForm = document.getElementById("type-form");
  const type1Select = document.getElementById("type1-select");
  const type2Select = document.getElementById("type2-select");
  const legendaryFilter = document.getElementById("legendary-filter");
  const generationSelect = document.getElementById("generation-select");
  const nameFilter = document.getElementById("name-filter");

  // Ajoute des écouteurs d'événements pour chaque élément HTML
  type1Select.addEventListener("change", applyFilters);
  type2Select.addEventListener("change", applyFilters);
  legendaryFilter.addEventListener("change", applyFilters);
  generationSelect.addEventListener("change", applyFilters);
  nameFilter.addEventListener("input", applyFilters);

  // Déclare un tableau pour stocker les identifiants des Pokémon sélectionnés

  const selectedPokemonIds = [];
  
  // Fonction asynchrone pour récupérer les données des Pokémon à partir d'un fichier PHP

  async function fetchPokemons() {
      try {
          const response = await fetch("bd.php");
          const pokemons = await response.json();
          return pokemons;
      } catch (error) {
          console.error("Erreur lors de la récupération des Pokémon :", error);
      }
  }

  function displayPokemons(pokemons) {
      const pokemonGallery = document.getElementById("pokemon-gallery");
      let html = "";
  // Boucle sur chaque Pokémon et ajoute ses informations à la variable HTML

      pokemons.forEach((pokemon) => {
          const normalizedName = normalizeName(pokemon.name);
          html += `
          <div class="card">
          <h3>${pokemon.name}</h3>
          <img src="images/${normalizedName}.png" alt="${pokemon.name}" />
          <p><img src="images/${pokemon.type1}.png" alt="${pokemon.type1}" /> </p>
          <p><img src="images/${pokemon.type2}.png" alt="${pokemon.type2}" /> </p>


          <button data-pokemon-id="${pokemon.id}" class="select-pokemon-btn" onclick="changeButtonColor(this)">Sélectionner</button>
        </div>
          `;
      });

      // Ajoute la variable HTML à l'élément HTML de la galerie de Pokémon

      pokemonGallery.innerHTML = html;
    
      // Ajoute des écouteurs d'événements aux boutons de sélection des Pokémon

      addSelectPokemonListeners();
  }
  // Fonction pour filtrer les Pokémon en fonction des sélections de l'utilisateur

  async function applyFilters() {
  // Récupère les valeurs des différents éléments HTML

    const type1 = type1Select.value;
    const type2 = type2Select.value;
    const legendary = legendaryFilter.checked;
    const generation = generationSelect.value;
    const nameSearch = nameFilter.value.toLowerCase();

    // Récupère les données des Pokémon
    const pokemons = await fetchPokemons();

    // Filtre les Pokémon en fonction des sélections de l'utilisateur

    const filteredPokemons = pokemons.filter((pokemon) => {
      const isNameMatch = pokemon.name.toLowerCase().includes(nameSearch);
      return (
        isNameMatch &&
        (type1 === "" || pokemon.type1 === type1) &&
        (type2 === "" || pokemon.type2 === type2) &&
        (!legendary || pokemon.legendary === "True") &&
        (generation === "" || parseInt(pokemon.generation) === parseInt(generation))
      );
    });
// Trie les Pokémon en fonction du nom ou de l'ID

    filteredPokemons.sort((a, b) => {
      if (nameSearch) {
        const aStartsWith = a.name.toLowerCase().startsWith(nameSearch);
        const bStartsWith = b.name.toLowerCase().startsWith(nameSearch);

        if (aStartsWith && !bStartsWith) {
          return -1;
        } else if (!aStartsWith && bStartsWith) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      } else {
        return a.id - b.id;
      }
    });
    // Affiche les Pokémon filtrés à l'écran
    displayPokemons(filteredPokemons);}
    // Fonction pour normaliser le nom d'un Pokémon pour qu'il corresponde au nom de son image
    function normalizeName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, "");
    }
    
    // Fonction pour ajouter des écouteurs d'événements aux boutons de sélection des Pokémon
    function addSelectPokemonListeners() {
    const selectPokemonBtns = document.querySelectorAll(".select-pokemon-btn");
    selectPokemonBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
    const pokemonId = this.dataset.pokemonId;
    togglePokemonSelection(pokemonId);
    });
    });
    }
    // Fonction pour permettre à l'utilisateur de sélectionner deux Pokémon à comparer 
    function togglePokemonSelection(pokemonId) {
    const index = selectedPokemonIds.indexOf(pokemonId);
    if (index >= 0) {
    selectedPokemonIds.splice(index, 1);
    } else {
    selectedPokemonIds.push(pokemonId);
    // Si deux Pokémon ont été sélectionnés, redirige vers la page de comparaison
    }if (selectedPokemonIds.length === 2) {
      window.location.href = `compare.php?id1=${selectedPokemonIds[0]}&id2=${selectedPokemonIds[1]}`;
    }
  }

  // Affiche les pokemons au chargement de la page
  fetchPokemons().then((pokemons) => {
  displayPokemons(pokemons);
  });
});
      