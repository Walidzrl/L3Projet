document.addEventListener("DOMContentLoaded", function () {
    const typeForm = document.getElementById("type-form");
    const type1Select = document.getElementById("type1-select");
    const type2Select = document.getElementById("type2-select");
  
    typeForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const type1 = type1Select.value;
      const type2 = type2Select.value;
  
      filterPokemonsByType(type1, type2);
    });
  
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
  
      pokemons.forEach((pokemon) => {
        const normalizedName = normalizeName(pokemon.name);
        html += `
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
      });
  
      pokemonGallery.innerHTML = html;
    }
  
    function filterPokemonsByType(type1, type2) {
      fetchPokemons().then((pokemons) => {
        const filteredPokemons = pokemons.filter((pokemon) => {
          return (
            (type1 === "" || pokemon.type1 === type1) &&
            (type2 === "" || pokemon.type2 === type2)
          );
        });
  
        displayPokemons(filteredPokemons);
      });
    }
  
    function sortPokemons(pokemons, sortBy) {
      return pokemons.sort((a, b) => {
        return parseInt(b[sortBy]) - parseInt(a[sortBy]);
      });
    }
  
    function normalizeName(name) {
      return name.toLowerCase().replace(/[^a-z0-9]/g, "");
    }
  
    // Affiche les pokemons au chargement de la page
    fetchPokemons().then((pokemons) => {
      displayPokemons(pokemons);
    });
  
    // Ajoutez un écouteur d'événements pour le menu déroulant "Trier par"
    const sortOptions = document.getElementById("sort-options");
    sortOptions.addEventListener("change", async function () {
      const sortBy = sortOptions.value;
      const pokemons = await fetchPokemons();
  
      if (!pokemons) {
        console.error("Erreur lors de la récupération des Pokémon");
      } else {
        const sortedPokemons = sortPokemons(pokemons, sortBy);
        displayPokemons(sortedPokemons);
      }
    });
});

  