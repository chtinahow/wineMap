const Tram = require('tram-one')
const html = Tram.html({
  'search-card': require('./search-card')
})

module.exports = (attrs) => {
  const change = event => {
    attrs.onsetvalue({[attrs.title]: event.currentTarget.value})
  }
  const options = attrs.options.map(option => html`
    <span>
      <input
        type="radio" name="Color" value="${option.toLowerCase()}" onchange=${change}
        ${attrs.value == option.toLowerCase() ? 'checked' : ''}/> ${option}
    </span>
  `)
  return html`
    <search-card title=${attrs.title} disabled=${attrs.disabled} onenable=${attrs.onenable} ondisable=${attrs.ondisable}>
      ${options}
    </search-card>
  `
}
