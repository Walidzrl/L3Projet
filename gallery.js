document.addEventListener("DOMContentLoaded", function () {
  const typeForm = document.getElementById("type-form");
  const type1Select = document.getElementById("type1-select");
  const type2Select = document.getElementById("type2-select");
  const legendaryFilter = document.getElementById("legendary-filter");
  const generationSelect = document.getElementById("generation-select");

  typeForm.addEventListener("change", applyFilters);
  legendaryFilter.addEventListener("change", applyFilters);
  generationSelect.addEventListener("change", applyFilters);

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

  async function applyFilters() {
      const type1 = type1Select.value;
      const type2 = type2Select.value;
      const legendary = legendaryFilter.checked;
      const generation = generationSelect.value;

      const pokemons = await fetchPokemons();

      const filteredPokemons = pokemons.filter((pokemon) => {
          return (
              (type1 === "" || pokemon.type1 === type1) &&
              (type2 === "" || pokemon.type2 === type2) &&
              (!legendary || pokemon.legendary === "True") &&
              (generation === "" || parseInt(pokemon.generation) === parseInt(generation))
          );
      });

      displayPokemons(filteredPokemons);
  }

  function normalizeName(name) {
      return name.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  // Affiche les pokemons au chargement de la page
  fetchPokemons().then((pokemons) => {
      displayPokemons(pokemons);
  });
});
