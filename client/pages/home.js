const Tram = require('tram-one')
const html = Tram.html({
  'search-input': require('../search-card-components/search-input'),
  'search-options': require('../search-card-components/search-options'),
  'search-range': require('../search-card-components/search-range'),
  'search-dropdown': require('../search-card-components/search-dropdown'),
})

module.exports = (store, actions) => {
  return html`
    <div style="max-width: 600px; margin:auto;">
      <search-input
        title="Wine Name" placeholder="Name"
        disabled=${!store.enabled["Wine Name"]}
        onenable=${actions.enable} ondisable=${actions.disable}
      />
      <search-range
        title="Vintage" disabled=${!store.enabled["Vintage"]}
        onenable=${actions.enable} ondisable=${actions.disable}
      />
      <search-options
        title="Color" disabled=${!store.enabled["Color"]}
        onenable=${actions.enable} ondisable=${actions.disable}
      />
      <search-range
        title="Price" disabled=${!store.enabled["Price"]}
        onenable=${actions.enable} ondisable=${actions.disable}
      />
      <search-dropdown
        title="Country" disabled=${!store.enabled["Country"]}
        onenable=${actions.enable} ondisable=${actions.disable}
      />
    </div>
  `
}
