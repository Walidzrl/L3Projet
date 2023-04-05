document.addEventListener("DOMContentLoaded", function () {
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
    function sortPokemons(pokemons, sortBy) {
        return pokemons.sort((a, b) => {
          return parseInt(b[sortBy]) - parseInt(a[sortBy]);
        });
      }
  
    function normalizeName(name) {
      return name.toLowerCase().replace(/[^a-z0-9]/g, "");
    }
  
    fetchPokemons();

    // Ajoutez un écouteur d'événements pour le bouton "Trier par HP"
    const sortOptions = document.getElementById("sort-options");
    sortOptions.addEventListener("change", async function () {
      const sortBy = sortOptions.value;
      const response = await fetch("bd.php");
      const pokemons = await response.json();
  
      if (pokemons.error) {
        console.error("Erreur lors de la récupération des Pokémon :", pokemons.error);
      } else {
        const sortedPokemons = sortPokemons(pokemons, sortBy);
        displayPokemons(sortedPokemons);
    }
  });
});
  
  