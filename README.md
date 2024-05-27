# Projeto Pokédex

![image](https://github.com/FilipeAmaral1/Pokedex/assets/109747832/a517efd8-4554-4699-9b2d-ac8c7bccc948)

## Descrição

Este projeto é uma Pokédex interativa desenvolvida utilizando Node.js no backend, com HTML, CSS e JavaScript no frontend. A aplicação exibe os primeiros 151 Pokémon da PokéAPI, permitindo buscar e visualizar detalhes individuais de cada Pokémon.

## Funcionalidades

- Listagem dos primeiros 151 Pokémon.
- Busca por nome de Pokémon.
- Visualização de detalhes de cada Pokémon, incluindo tipos, peso, altura e atributos base.

## Estrutura do Projeto

- **public**: Arquivos de frontend.
  - **index.html**: Página principal.
  - **details.html**: Página de detalhes do Pokémon.
  - **style.css**: Estilos da aplicação.
  - **script.js**: Lógica de interação para a página principal.
  - **detail.js**: Lógica de interação para a página de detalhes.
- **src**: Código-fonte do servidor.
  - **server.mjs**: Servidor Node.js com Express.
- **package.json**: Dependências e scripts do projeto.

## Pré-requisitos

- Node.js (versão LTS recomendada) https://nodejs.org/en
- Navegador web moderno

## Instalação

Navegue até o diretório do projeto:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuUsuario/projeto-pokedex.git
   ```
2.Navegue até o diretório do projeto:
  ```bash
   cd projeto-pokemon
  ```

3.Instale as dependências:
  ```bash
   npm install
  ```
  ## Uso
1. Inicie o servidor:
  ```bash
  node src/server.mjs
  ```

2.Abra seu navegador e acesse:
  ```bash
  http://localhost:3000
  ```

## Tecnologias Utilizadas

- Node.js: Plataforma de desenvolvimento.
- Express.js: Framework web para Node.js.
- HTML5: Estrutura do frontend.
- CSS3: Estilização do frontend.
- JavaScript: Lógica de frontend.
- PokéAPI: Fonte de dados dos Pokémon.
