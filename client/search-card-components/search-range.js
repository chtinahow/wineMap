const Tram = require('tram-one')
const html = Tram.html({
  'search-card': require('./search-card')
})

module.exports = (attrs) => {
  const vintageValue = attrs.value === 'true' ? {min: 0, max: 0} : attrs.value
  const minInput = (event) => {
    if (event.currentTarget.value) {
      attrs.onsetvalue({[attrs.title]: Object.assign({}, vintageValue,{min: event.currentTarget.value})})
    }
  }
  const maxInput = (event) => {
    if (event.currentTarget.value) {
      attrs.onsetvalue({[attrs.title]: Object.assign({}, vintageValue,{max: event.currentTarget.value})})
    }
  }
  return html`
    <search-card title=${attrs.title} disabled=${attrs.disabled} onenable=${attrs.onenable} ondisable=${attrs.ondisable}>
      Min: <input placeholder="Min ${attrs.title}" onblur=${minInput} value=${vintageValue.min}/>
      Max: <input placeholder="Max ${attrs.title}" onblur=${maxInput} value=${vintageValue.max}/>
    </search-card>
  `
}
