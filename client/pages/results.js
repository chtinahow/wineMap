const Tram = require('tram-one')
const html = Tram.html({
})

const getOrFetchDrinkDOM = (store, actions, params) => {
  switch (store.results.status) {
    case 'NOT_LOADED':
      actions.fetchWineResults({Vintage: {min: '2009', max: '2018'}, Color: 'White'})
      return 'fetching...'
    case 'LOADING':
      return 'loading...'
    case 'LOADED':
      // If we have results, check if they're for the same search params
      // if (store.results.drink.id !== params.drinkId) {
      //   actions.fetchWineResults(params.drinkId)
      //   return 'fetching...'
      // }
      return JSON.stringify(store.results.wineResults)
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
