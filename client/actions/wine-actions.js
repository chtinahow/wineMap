const apiKey = 'dm2umigp683o6ied149g1hdckyn0vyf9zpjkqqg4x7ny1qee'

module.exports = {
  init: () => ({wineResults: null, status: 'NOT_LOADED'}),
  fetchWineResults: (state, searchParameters, actions) => {
    const wineParams = Object.keys(searchParameters).reduce((stringParam, key) => {
      switch (key) {
        case 'Wine Name':
          return `${stringParam}&q=${searchParameters[key]}`
        case 'Color':
          return `${stringParam}&color=${searchParameters[key]}`
        case 'Price':
          return `${stringParam}&mp=${searchParameters[key].min}&xp=${searchParameters[key].max}`
        case 'Country':
          return `${stringParam}&c=${searchParameters[key]}`
        default :
          return stringParam
      }
    }, '')
    fetch(`http://api.snooth.com/wines/?akey=${apiKey}&${wineParams}`)
      .then(data => data.json())
      .then((data) => {
        let results = data.wines
        if (searchParameters['Vintage']) {
          results = data.wines.filter((wineResults) =>
            (searchParameters['Vintage'].min <= wineResults.vintage
            && searchParameters['Vintage'].max >= wineResults.vintage))
        }
        actions.setWineResults(results)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  },
  setWineResults: (state, data) => Object.assign({}, state, {wineResults: data, status: 'LOADED'})
}
