document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

    const pokemonContainer = document.getElementById('pokemon-container');
    const searchInput = document.getElementById('search');
    let pokemonList = [];

   async function fetchPokemon() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon data');
        }
        const data = await response.json();
        pokemonList = data.results;
        const pokemonDetailsPromises = pokemonList.map(pokemon => fetchPokemonDetails(pokemon.url));
        const allPokemonDetails = await Promise.all(pokemonDetailsPromises);
        allPokemonDetails.sort((a, b) => a.id - b.id);
        allPokemonDetails.forEach(createPokemonCard);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

    async function fetchPokemonDetails(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    function createPokemonCard(pokemon) {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
    
        const primaryType = pokemon.types[0].type.name;
        pokemonCard.classList.add(primaryType);
    
        pokemonCard.dataset.id = pokemon.id;
    
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.sprites.front_default;
    
        const pokemonNumber = document.createElement('h2');
        pokemonNumber.textContent = `#${pokemon.id} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
    
        const pokemonTypes = document.createElement('div');
        pokemonTypes.classList.add('types'); 
    
        while (pokemonTypes.firstChild) {
            pokemonTypes.removeChild(pokemonTypes.firstChild);
        }
    
        pokemon.types.forEach(typeInfo => {
            const type = document.createElement('p');
            type.classList.add('type', 'light-gray'); 
            type.textContent = typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1);
            pokemonTypes.appendChild(type);
        });
    
        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonNumber);
        pokemonCard.appendChild(pokemonTypes);
        pokemonContainer.appendChild(pokemonCard);
    
        pokemonCard.addEventListener('click', () => {
            window.location.href = `details.html?id=${pokemon.id}`;
        });
    }

    function filterPokemon() {
        const searchTerm = searchInput.value.toLowerCase();
        const pokemonCards = document.querySelectorAll('.pokemon-card');
        pokemonCards.forEach(card => {
            const name = card.querySelector('h2').textContent.toLowerCase();
            card.style.display = name.includes(searchTerm) ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('input', filterPokemon);

    fetchPokemon();
});
