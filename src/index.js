console.log(POKEMON)

//*********** GET ELEMENTS ***********/
const input = document.querySelector("#pokemon-search-input")
const container = document.querySelector("#pokemon-container")
const noPokemon = container.querySelector("center")
const filters = document.querySelector(".search-filters")
let searchOption = "name"
let sortOption = "name"

const overlay = document.createElement("div")
overlay.id = "stats-overlay"
overlay.classList.add("hidden")

//*********** RENDER POKEMON **********/
const createPokemon = attributes => {
  let card = document.createElement("div")
  card.className = ("pokemon-card")
  card.dataset.id = attributes.id
  
  let frame = document.createElement("div")
  frame.className = ("pokemon-frame")
  card.append(frame)

  let pokemonName = document.createElement("h1")
  pokemonName.className = "center-text"
  pokemonName.textContent = attributes.name
  frame.append(pokemonName)

  let pokemonImage = document.createElement("div")
  pokemonImage.className = "pokemon-image"
  frame.append(pokemonImage)

  let pokemonSprite = document.createElement("img")
  pokemonSprite.dataset.id = attributes.id
  pokemonSprite.dataset.action = "flip"
  pokemonSprite.className = "toggle-sprite"
  pokemonSprite.src = attributes.sprites.front
  pokemonSprite.alt = attributes.name + '-front'
  pokemonImage.append(pokemonSprite)

  let statsButton = document.createElement("button")
  statsButton.className = "button-stats"
  statsButton.textContent = "Stats"
  frame.append(statsButton)

  container.append(card)
}

//********* SEARCH & FILTER ************/
const removeCurrentCards = _ => {
  let currentCards = container.querySelectorAll(".pokemon-card")
  Array.from(currentCards).forEach(card => card.remove())
}

const renderAllPokemon = (array = POKEMON) => {
  removeCurrentCards()
  if (array.length > 0) {
    noPokemon.remove()
    let sortedArray = sortPokemon(array)
    sortedArray.forEach(pokemon => createPokemon(pokemon))
  } else {
    container.insertBefore(noPokemon, container.querySelector("p:last-of-type"))
  }
}

const sortPokemon = (array, criteria = "name") => {
  switch(true){
    case (sortOption === "name"): 
      return array.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    case (sortOption === "id"):
      return array.sort((a, b) => {
        return a.id - b.id
      })
  }
}

  

const searchPokemon = _ => {
  let searchQuery = new RegExp(`${input.value}`, 'i')
  switch(true){
    case (searchOption === "name"):
      renderAllPokemon(POKEMON.filter(pokemon => pokemon.name.match(searchQuery)))
      break
    case (searchOption === "types"):
      // debugger
      renderAllPokemon(POKEMON.filter(pokemon => pokemon.types.some(e => searchQuery.test(e))))
      break
    case (searchOption === "abilities"):
      renderAllPokemon(POKEMON.filter(pokemon => pokemon.abilities.some(e => searchQuery.test(e))))
      break
  }
  
}

//************ FLIP SPRITE *************/

const toggleSprite = img => {
  let thisPokemon = POKEMON.find(a => a.id == img.dataset.id)
  img.src = img.src === thisPokemon.sprites.front ? img.src = thisPokemon.sprites.back : thisPokemon.sprites.front
}

//************ CREATE STATS FRAME  LINES 84 - 191   ***********/

const displayStats = id => {
  let thisPokemon = POKEMON.find(pokemon => pokemon.id == id)
  
  let statsFrame = document.createElement("div")
  statsFrame.className = "stats-frame"

  let topFrame = document.createElement("div")  // Top Row
  topFrame.className = "top-frame"

  let pId = document.createElement("p")
  pId.className = "center-text"
  pId.textContent = `ID: ${thisPokemon.id}`
  
  let pHeight = document.createElement("p")
  pHeight.className = "center-text"
  pHeight.textContent = `Height: ${thisPokemon.height}`
  
  let pWeight = document.createElement("p")
  pWeight.className = "center-text"
  pWeight.textContent = `Weight: ${thisPokemon.weight}`
  
  let bioStats = document.createElement("div")
  bioStats.className = "bio"
  bioStats.append(pId, pHeight, pWeight)
  topFrame.append(bioStats)

  let pokemonName = document.createElement("h1")
  pokemonName.classList.add("center-text", "large-text")
  pokemonName.textContent = thisPokemon.name.charAt(0).toUpperCase() + thisPokemon.name.slice(1)
  topFrame.append(pokemonName)

  let typeFrame = document.createElement("div")
  typeFrame.className = "type-frame"

  let pTypes = document.createElement("h3")
  pTypes.textContent = "Types"
  pTypes.className = "center-text"
  typeFrame.append(pTypes)
  thisPokemon.types.forEach(type => {
    let pType = document.createElement("p")
    pType.textContent = type
    pType.className = "center-text"
    typeFrame.append(pType)
  } )
  topFrame.append(typeFrame)

  statsFrame.append(topFrame)

  let pokemonImage = document.createElement("div")
  pokemonImage.classList.add("stats-image-frame")
  statsFrame.append(pokemonImage)

  let pokemonSprite = document.createElement("img")
  pokemonSprite.dataset.id = thisPokemon.id
  pokemonSprite.dataset.action = "flip"
  pokemonSprite.classList.add("toggle-sprite", "large-image")
  pokemonSprite.src = thisPokemon.sprites.front
  pokemonSprite.alt = thisPokemon.name + '-front'
  pokemonImage.append(pokemonSprite)

  let bottomFrame = document.createElement("div")
  bottomFrame.className = "bottom-frame"
  statsFrame.append(bottomFrame)

  let statTable = document.createElement("table")
  statTable.className = "stat-table"
  bottomFrame.append(statTable)

  thisPokemon.stats.forEach(stat => {
    let row = document.createElement("tr")
    let sHead = document.createElement("th")
    let sInfo = document.createElement("td")
    sHead.textContent = stat.name.charAt(0) + stat.name.slice(1)
    sInfo.textContent = stat.value
    row.append(sHead, sInfo)
    statTable.append(row)
  })

  let abilityFrame = document.createElement('div')
  abilityFrame.className = "ability-frame"
  let pAbilities = document.createElement("h3")
  pAbilities.className = "center-text"
  pAbilities.textContent = "Abilities"
  bottomFrame.append(pAbilities)

  thisPokemon.abilities.forEach(ability => {
    let pAbility = document.createElement('p')
    pAbility.textContent = ability
    pAbility.className = "center-text"
    abilityFrame.append(pAbility)
  })
  bottomFrame.append(abilityFrame)

  let moveFrame = document.createElement('div')
  moveFrame.className = "move-frame"
  let pMoves = document.createElement("h3")
  pMoves.className = "center-text"
  pMoves.textContent = "Moves"
  bottomFrame.append(pMoves)

  thisPokemon.moves.forEach(move => {
    let pMove = document.createElement('p')
    pMove.textContent = move
    pMove.className = "center-text"
    moveFrame.append(pMove)
  })



  let closeButton = document.createElement("button")
  closeButton.className = "button-close"
  closeButton.textContent = "X  Close"
  statsFrame.append(closeButton)


  overlay.append(statsFrame)
  document.body.prepend(overlay)

}

const closeOverlay = _ => {
  Array.from(overlay.children).forEach(child => child.remove())
  overlay.remove()
}

//************ LISTENERS *******************/
const handleClick = e => {
    switch(true) {
        case (e.target.className === "toggle-sprite"):
          toggleSprite(e.target)
          break
        case (e.target.className === "button-stats"):
          displayStats(e.target.closest(".pokemon-card").dataset.id)
          break
        case (e.target.id === "stats-overlay" || e.target.className === "button-close" ):
          closeOverlay()
          break
        case (e.target.name === "search-options"):
          searchOption = e.target.value
          searchPokemon()
          break
        case (e.target.name === "sort-options"):
          sortOption = e.target.value
          searchPokemon()
      }
    }
    

    
container.addEventListener('click', handleClick)
input.addEventListener('input', searchPokemon)
overlay.addEventListener('click', handleClick)
filters.addEventListener('click', handleClick)

renderAllPokemon()