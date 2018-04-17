const Tram = require('tram-one')
const html = Tram.html({
  'wine-card' : require('../elements/wine-card')
})

const getOrFetchDrinkDOM = (store, actions, params) => {
  switch (store.results.status) {
    case 'NOT_LOADED':
      actions.fetchWineResults(params)
      return 'fetching...'
    case 'LOADING':
      return 'loading...'
    case 'LOADED':
      // If we have results, check if they're for the same search params
      // if (store.results.drink.id !== params.drinkId) {
      //   actions.fetchWineResults(params.drinkId)
      //   return 'fetching...'
      // }
      return store.results.wineResults.map(wineResult =>
        html`
            <wine-card name=${wineResult.name}
              image=${wineResult.image} price=${wineResult.price}
              vintage=${wineResult.vintage} href=${wineResult.link}/>
        `
      )
    default:
      return 'Error...'
  }
}

module.exports = (store, actions, params) => {
  const drinkDOM = getOrFetchDrinkDOM(store, actions, params)
  return html`
    <div>
      ${drinkDOM}
    </div>
  `
}
