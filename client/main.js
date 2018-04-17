const Tram = require('tram-one')

const app = new Tram()
app.addRoute('/wineSearch', require('./pages/home'))
app.addRoute('/wineSearch/#wineResults', require('./pages/results'))
app.addActions({
  enabled: require('./actions/enable-actions'),
  results: require('./actions/wine-actions')
})
const debug = (store, actions, actionName) => {
  console.log(actionName, 'was triggered!')
  console.log('NEW STATE:', store)
}

app.addListener(debug)
app.start('.main')
