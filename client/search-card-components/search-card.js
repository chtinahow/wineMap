const Tram = require('tram-one')
const html = Tram.html()

const box = `
  box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
  min-height: 100px;
  margin-bottom: 1em;
  padding: 1em;
`

const cardTitleStyle =`
  grid-area: title;
  font-size: 1.2em;
`
const contentStyle =`
  grid-area: content;
  text-align: center;
`

const disableButtonStyle =`
  grid-area: disable-button;
  margin: auto;
`

const disabledStyle =`
  opacity: 0.4;
`

const gridDisplay =`
  display: grid;
  grid-template-areas:
    "title"
    "content"
    "disable-button"
  ;
`

module.exports = (attrs, children) => {
  const enable = (event) => {
    attrs.onenable(attrs.title)
  }
  const disable = (event) => {
    attrs.ondisable(attrs.title)
    event.cancelBubble = true
  }

  if (attrs.disabled === 'true') {
    return html`
      <div onclick=${enable} style="${box} ${gridDisplay} ${disabledStyle}">
        <div style=${cardTitleStyle}>
          ${attrs.title}
        </div>
        <div style=${contentStyle}>
          Click to add option to search
        </div>
      </div>
    `
  }
  return html`
    <div style="${box} ${gridDisplay}">
      <div style=${cardTitleStyle}>
        ${attrs.title}
      </div>
      <div style=${contentStyle}>
        ${children}
      </div>
      <button style=${disableButtonStyle} onclick=${disable}> Disable </button>
    </div>
  `
}
