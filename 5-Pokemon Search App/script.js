const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypes = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const speed = document.getElementById('speed');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const spriteContainer = document.getElementById('sprite-container');

const fetchPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await res.json();
    setPokemonInfo(data)
  }
  catch (err) {
    alert("Pokémon not found");
    console.log(err);
  }
};

const setPokemonInfo = (data) => {
    const { name, id, weight, height, types, stats, sprites } = data;
    pokemonName.textContent = `${name.toUpperCase()}`;
    pokemonId.textContent = `ID#${id}`;
    pokemonWeight.textContent = `Peso: ${weight}`;
    pokemonHeight.textContent = `Altura: ${height}`;

    hp.textContent = `Vida: ${stats[0].base_stat}`;
    attack.textContent = `Ataque: ${stats[1].base_stat}`;
    defense.textContent = `Defensa: ${stats[2].base_stat}`;
    specialAttack.textContent = `Ataque especial: ${stats[3].base_stat}`;
    specialDefense.textContent = `Defenca especial: ${stats[4].base_stat}`;
    speed.textContent = `Velocidad: ${stats[5].base_stat}`;

    pokemonTypes.innerHTML = types.map((type) => `<span class="type ${type.type.name}">${type.type.name.toUpperCase()}</span>`).join(', ');
    spriteContainer.innerHTML = `<img src="${sprites.front_default}" id="sprite" alt="${name}">`;
}

searchButton.addEventListener('click', e => {
    e.preventDefault();
    fetchPokemon();
});

searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        fetchPokemon();
    }
});