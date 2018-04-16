const Tram = require('tram-one')
const html = Tram.html({
  'search-card': require('./search-card')
})

module.exports = (attrs) => {
  return html`
    <search-card title=${attrs.title} disabled=${attrs.disabled} onenable=${attrs.onenable} ondisable=${attrs.ondisable}>
      Search options
    </search-card>
  `
}
