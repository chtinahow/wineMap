module.exports = {
  init: () => ({wineResults: null, searchParams: {}, status: 'NOT_LOADED'}),
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
    fetch(`https://us-central1-winesearch-140f6.cloudfunctions.net/wineSearch?${wineParams.slice(1)}`)
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
    return Object.assign({}, state, {status: 'LOADING', searchParams: searchParameters})
  },
  setWineResults: (state, data) => Object.assign({}, state, {wineResults: data, status: 'LOADED'})
}
