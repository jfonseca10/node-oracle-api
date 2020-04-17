module.exports = function setupRegion (RegionModel, CountryModel) {
  function regionList () {
    return RegionModel.findAll()
  }

  function countryListByRegion (regionID) {
    return CountryModel.findAll({ where: { regionID } })
  }

  return { regionList, countryListByRegion }
}