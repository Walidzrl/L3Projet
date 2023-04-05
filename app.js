function normalizeName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, "");
  }
  
  document.addEventListener("DOMContentLoaded", function () {
  
    // Code pour le formulaire de recherche
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("results-container");
  
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        searchPokemon(searchTerm);
      }
    });
  
    async function searchPokemon(name) {
      try {
        const response = await fetch(`search_pokemon.php?name=${name}`);
        const data = await response.json();
  
        if (data) {
          displayResults(data);
        } else {
          resultsContainer.innerHTML = "<p>Aucun Pokémon trouvé.</p>";
        }
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    }
  
    function displayResults(pokemon) {
      const normalizedName = normalizeName(pokemon.name);
      resultsContainer.innerHTML = `
      <div class="card">
      <h3>${pokemon.name}</h3>
      <img src="images/${normalizedName}.png" alt="${pokemon.name}" />
      <p>ID: ${pokemon.id}</p>
      <p>Type 1: ${pokemon.type1}</p>
      <p>Type 2: ${pokemon.type2}</p>
      <p>Total: ${pokemon.total}</p>
      <p>HP: ${pokemon.hp}</p>
      <p>Attaque: ${pokemon.attack}</p>
      <p>Défense: ${pokemon.defense}</p>
      <p>Attaque spéciale: ${pokemon.sp_atck}</p>
      <p>Défense spéciale: ${pokemon.sp_def}</p>
      <p>Vitesse: ${pokemon.speed}</p>
      <p>Génération: ${pokemon.generation}</p>
      <p>Légendaire: ${pokemon.legendary === "True" ? "Oui" : "Non"}</p>
    </div>
      `;
    }
  
    // Fonction pour charger la galerie de Pokémon
    async function fetchPokemons() {
      try {
        const response = await fetch("bd.php");
        const pokemons = await response.json();
        displayPokemons(pokemons);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      }
    }
  
    function displayPokemons(pokemons) {
      const pokemonGallery = document.getElementById("pokemon-gallery");
      let html = "";
  
      pokemons.forEach((pokemon) => {
        const normalizedName = normalizeName(pokemon.name);
        html += `
        <div class="card">
          <h3>${pokemon.name}</h3>
          <img src="images/${normalizedName}.png" alt="${pokemon.name}" />
          <p>ID: ${pokemon.id}</p>
        </div>
      `;
      });
  
      pokemonGallery.innerHTML = html;
    }
  
    const pokemonGallery = document.getElementById("pokemon-gallery");
    if (pokemonGallery) {
      fetchPokemons();
    }
  
  });
  