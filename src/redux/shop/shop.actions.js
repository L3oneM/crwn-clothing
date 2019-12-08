import ShopActionTypes from './shop.types'

export const updateCollections = (colllectionsMap) => ({
  type: ShopActionTypes.UPDATE_COLECTIONS,
  payload: colllectionsMap
})