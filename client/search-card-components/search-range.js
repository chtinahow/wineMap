const Tram = require('tram-one')
const html = Tram.html({
  'search-card': require('./search-card')
})

module.exports = (attrs) => {
  const vintageValue = attrs.value === 'true' ? {min: '', max: ''} : attrs.value
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
      <input placeholder="Min ${attrs.title}" onblur=${minInput} value=${vintageValue.min}/>
      <input placeholder="Max ${attrs.title}" onblur=${maxInput} value=${vintageValue.max}/>
    </search-card>
  `
}
