document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const pokemonDetailsContainer = document.getElementById('pokemon-details');

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const pokemon = await response.json();

        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.sprites.front_default;

        const pokemonName = document.createElement('h1');
        pokemonName.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} #${pokemon.id.toString().padStart(3, '0')}`;

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

        const pokemonWeight = document.createElement('p');
        pokemonWeight.textContent = `Peso: ${pokemon.weight / 10} kg`;

        const pokemonHeight = document.createElement('p');
        pokemonHeight.textContent = `Altura: ${pokemon.height / 10} m`;

        const statsContainer = document.createElement('div');
        statsContainer.classList.add('stats');
        let maxStat = Math.max(...pokemon.stats.map(stat => stat.base_stat));
        pokemon.stats.forEach(statInfo => {
            const stat = document.createElement('div');
            stat.classList.add('stat');

            const statName = document.createElement('p');
            statName.textContent = statInfo.stat.name.toUpperCase();

            const statBar = document.createElement('div');
            statBar.classList.add('stat-bar');

            const statValue = document.createElement('span');
            statValue.style.width = `${(statInfo.base_stat / maxStat) * 100}%`;
            statBar.appendChild(statValue);

            const statNumber = document.createElement('p');
            statNumber.classList.add('stat-value');
            statNumber.textContent = statInfo.base_stat;

            stat.appendChild(statName);
            stat.appendChild(statBar);
            stat.appendChild(statNumber);
            statsContainer.appendChild(stat);
        });

        const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
        const totalStatElement = document.createElement('div');
        totalStatElement.classList.add('stat');
        const totalStatName = document.createElement('p');
        totalStatName.textContent = 'Total';
        const totalStatBar = document.createElement('div');
        totalStatBar.classList.add('stat-bar');
        const totalStatValue = document.createElement('span');
        const maxPossibleTotalStat = maxStat * pokemon.stats.length;
        totalStatValue.style.width = `${(totalStats / maxPossibleTotalStat) * 100}%`;
        totalStatBar.appendChild(totalStatValue);
        const totalStatNumber = document.createElement('p');
        totalStatNumber.classList.add('stat-value');
        totalStatNumber.textContent = totalStats;
        totalStatElement.appendChild(totalStatName);
        totalStatElement.appendChild(totalStatBar);
        totalStatElement.appendChild(totalStatNumber);
        statsContainer.appendChild(totalStatElement);

        pokemonDetailsContainer.appendChild(pokemonImage);
        pokemonDetailsContainer.appendChild(pokemonName);
        pokemonDetailsContainer.appendChild(pokemonTypes);
        pokemonDetailsContainer.appendChild(pokemonWeight);
        pokemonDetailsContainer.appendChild(pokemonHeight);
        pokemonDetailsContainer.appendChild(statsContainer);

        document.body.classList.add(pokemon.types[0].type.name);

    } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
    }
});
