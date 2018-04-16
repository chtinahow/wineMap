const Tram = require('tram-one')

const app = new Tram()
app.addRoute('/', require('./pages/home'))
app.addRoute('/404', require('./pages/404'))
app.addActions({ enabled: require('./actions/enable-actions') })
const debug = (store, actions, actionName) => {
  console.log(actionName, 'was triggered!')
  console.log('NEW STATE:', store)
}

app.addListener(debug)
app.start('.main')
