const form = document.getElementById("pokemon-form");
const input = document.getElementById("pokemon-name");
const pokemonInfoDiv = document.getElementById("pokemon-info");

async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        if (!response.ok) {
            throw new Error("Pokémon no encontrado");
        }

        const data = await response.json();
        displayPokemonData(data);
    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
        pokemonInfoDiv.style.display = "block";
    }
    
    function displayPokemonData(pokemon){
        const { sprites, name, types, abilities } = pokemon;
        pokemonInfoDiv.innerHTML = `
        <img src = "${sprites.front_default}" alt = "${name}"/>
        <h3>${name}</h3>
        <p>Tipos: ${types}</p>
        <p>Habilidades: ${abilities}</p>
        `;

        pokemonInfoDiv.style.display = "block";
    }

    form.addEventListener("submit", function(event){
        event.preventDefault();
        const pokemonName = input.value.trim();
        if (pokemonName) {
            fetchPokemonData(pokemonName);
        }
    });
}
