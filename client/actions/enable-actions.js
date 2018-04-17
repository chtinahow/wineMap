
module.exports = ({
  init: () => ({
    'Wine Name': true,
    'Vintage': false,
    'Color': false,
    'Price': false,
    'Country': false
  }),
  disable: (options, optionToDisable) => {
    return Object.assign({},options, {[optionToDisable]: false})
  },
  enable: (options, optionToEnable) => {
    return Object.assign({},options, {[optionToEnable]: true})
  },
  setSearchParam: (options, newSearchObject) => {
    return Object.assign({}, options, newSearchObject)
  }
})
