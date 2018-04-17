const Tram = require('tram-one')
const html = Tram.html({
  'search-card': require('./search-card')
})

module.exports = (attrs) => {
  const input = (event) => {
    if (event.currentTarget.value) {
      attrs.onsetvalue({[attrs.title]: event.currentTarget.value})
    }
  }
  return html`
    <search-card
      title=${attrs.title} disabled=${attrs.disabled}
      onenable=${attrs.onenable} ondisable=${attrs.ondisable}
    >
      <input placeholder=${attrs.placeholder} onblur=${input} value=${attrs.value === 'true' ? '' : attrs.value}/>
    </search-card>
  `
}
