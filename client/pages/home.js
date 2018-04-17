const Tram = require('tram-one')
const html = Tram.html({
  'search-input': require('../search-card-components/search-input'),
  'search-options': require('../search-card-components/search-options'),
  'search-range': require('../search-card-components/search-range'),
  'search-dropdown': require('../search-card-components/search-dropdown'),
})

const queryToString = (queryObject) => {
  return Object.keys(queryObject).filter(key => queryObject[key]).map(key => `${key}=${queryObject[key]}`).join('&')
}

module.exports = (store, actions) => {
  const nav = () => {
    window.history.pushState({}, '', `/wineSearch/#wineResults?${queryToString(store.enabled)}`)
  }

  return html`
    <div style="max-width: 600px; margin:auto;">
      <search-input
        title="Wine Name" placeholder="Name"
        disabled=${!store.enabled["Wine Name"]}
        onenable=${actions.enable} ondisable=${actions.disable}
        onsetvalue=${actions.setSearchParam} value=${store.enabled["Wine Name"]}
      />
      <search-range
        title="Vintage" disabled=${!store.enabled["Vintage"]}
        onenable=${actions.enable} ondisable=${actions.disable}
      />
      <search-options
        title="Color" disabled=${!store.enabled["Color"]}
        onenable=${actions.enable} ondisable=${actions.disable}
        options=${['Red', 'White', 'Rose', 'Amber', 'Clear']}
        value=${store.enabled["Color"]} onsetvalue=${actions.setSearchParam}
      />
      <search-range
        title="Price" disabled=${!store.enabled["Price"]}
        onenable=${actions.enable} ondisable=${actions.disable}
      />
      <search-dropdown
        title="Country" disabled=${!store.enabled["Country"]}
        onenable=${actions.enable} ondisable=${actions.disable}
        onsetvalue=${actions.setSearchParam} value=${store.enabled["Country"]}
      >
        <option value="US" ${store.enabled['Country'] === 'US' ? 'selected' : ''}> United States </option>
        <option value="AR" ${store.enabled['Country'] === 'AR' ? 'selected' : ''}> Argentina </option>
        <option value="AU" ${store.enabled['Country'] === 'AU' ? 'selected' : ''}> Australia </option>
        <option value="AT" ${store.enabled['Country'] === 'AT' ? 'selected' : ''}> Austria </option>
        <option value="BE" ${store.enabled['Country'] === 'BE' ? 'selected' : ''}> Belgium </option>
        <option value="CA" ${store.enabled['Country'] === 'CA' ? 'selected' : ''}> Canada </option>
        <option value="DK" ${store.enabled['Country'] === 'DK' ? 'selected' : ''}> Denmark </option>
        <option value="SV" ${store.enabled['Country'] === 'SV' ? 'selected' : ''}> El Salvador </option>
        <option value="EE" ${store.enabled['Country'] === 'EE' ? 'selected' : ''}> Estonia </option>
        <option value="FR" ${store.enabled['Country'] === 'FR' ? 'selected' : ''}> France </option>
        <option value="DE" ${store.enabled['Country'] === 'DE' ? 'selected' : ''}> Germany </option>
        <option value="GB" ${store.enabled['Country'] === 'GB' ? 'selected' : ''}> Great Britain </option>
        <option value="HK" ${store.enabled['Country'] === 'HK' ? 'selected' : ''}> Hong Kong </option>
        <option value="HU" ${store.enabled['Country'] === 'HU' ? 'selected' : ''}> Hungary </option>
        <option value="IE" ${store.enabled['Country'] === 'IE' ? 'selected' : ''}> Ireland </option>
        <option value="IT" ${store.enabled['Country'] === 'IT' ? 'selected' : ''}> Italy </option>
        <option value="JP" ${store.enabled['Country'] === 'JP' ? 'selected' : ''}> Japan </option>
        <option value="MY" ${store.enabled['Country'] === 'MY' ? 'selected' : ''}> Malaysia </option>
        <option value="MT" ${store.enabled['Country'] === 'MT' ? 'selected' : ''}> Malta </option>
        <option value="NL" ${store.enabled['Country'] === 'NL' ? 'selected' : ''}> Netherlands </option>
        <option value="NZ" ${store.enabled['Country'] === 'NZ' ? 'selected' : ''}> New Zealand </option>
        <option value="NO" ${store.enabled['Country'] === 'NO' ? 'selected' : ''}> Norway </option>
        <option value="PL" ${store.enabled['Country'] === 'PL' ? 'selected' : ''}> Poland </option>
        <option value="PT" ${store.enabled['Country'] === 'PT' ? 'selected' : ''}> Portugal </option>
        <option value="PR" ${store.enabled['Country'] === 'PR' ? 'selected' : ''}> Puerto Rico </option>
        <option value="RU" ${store.enabled['Country'] === 'RU' ? 'selected' : ''}> Russia </option>
        <option value="SG" ${store.enabled['Country'] === 'SG' ? 'selected' : ''}> Singapore </option>
        <option value="ES" ${store.enabled['Country'] === 'ES' ? 'selected' : ''}> Spain </option>
        <option value="CH" ${store.enabled['Country'] === 'CH' ? 'selected' : ''}> Switzerland </option>
        <option value="UK" ${store.enabled['Country'] === 'UK' ? 'selected' : ''}> United Kingdom </option>
      </search-dropdown>
      <button onclick=${nav}>Search</button>
    </div>
  `
}
