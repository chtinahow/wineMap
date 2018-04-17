const Tram = require('tram-one')
const html = Tram.html()

const box = `
  box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
  min-height: 100px;
  margin-bottom: 1em;
  padding: 1em;
  cursor: pointer;
  max-width: 600px;
  margin: auto;
`

const cardTitleStyle =`
  grid-area: title;
  font-size: 1.2em;
  text-align: center;
`
const contentStyle =`
  grid-area: content;
  text-align: center;
`

const infoStyle =`
  grid-area: info;
  text-align: center;
`

const disabledStyle =`
  opacity: 0.4;
`

const gridDisplay =`
  display: grid;
  grid-template-areas:
    "title"
    "content"
    "info"
  ;
`

module.exports = (attrs) => {
  const nav = () => {
    window.location.href = attrs.href
  }
  const price = attrs.price > 0 ? `Price: $${attrs.price}` : ''
  const vintage = attrs.vintage ? `Vintage: ${attrs.vintage}` : ''
  return html`
    <div style='${box} ${gridDisplay}' onclick=${nav}>
      <h2 style=${cardTitleStyle}>${attrs.name} </h2>
      <div style=${contentStyle}>
        <img src=${attrs.image} />
      </div>
      <div style=${infoStyle}>
        ${price}
        ${vintage}
      </div>
    </div>
  `
}
