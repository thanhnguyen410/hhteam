import { types } from 'mobx-state-tree'

import { Model } from '@/utils/mobx-model-helper'
import {
  shopLogin,
  getInitialData,
  getUtilities,
  getQuestionArea,
  getArea
} from '@/api/auth'

const TYPES = {
  SHOP_LOGIN: 1,
  GET_INITIAL_DATA: 2,
  GET_UTILS: 3,
  GET_QUESTION_AREA: 4,
  GET_AREA: 5
}

const InitialData = types.model('InitialData')
  .props({
    avatar: types.maybeNull(types.string),
    emailAddress: types.maybeNull(types.string),
    isShop: types.boolean,
    name: types.maybeNull(types.string),
    nameKata: types.maybeNull(types.string),
    phoneNumber: types.maybeNull(types.string),
    postalCode: types.maybeNull(types.string),
    beginTime: types.maybeNull(types.string),
    endTime: types.maybeNull(types.string),
    role: types.maybeNull(types.number),
    shopId: types.maybeNull(types.number),
    approve: types.maybeNull(types.boolean)
  })

const AuthStore = Model.named('AuthStore')
  .props({
    initialData: types.maybeNull(InitialData)
  })
  .actions((self) => ({
    shopLogin(payload) {
      return self.request({
        type: TYPES.SHOP_LOGIN,
        api: shopLogin,
        disabledErrorMessage: true,
        payload
      })
    },

    getInitialData(payload) {
      return self.request({
        type: TYPES.GET_INITIAL_DATA,
        api: getInitialData,
        payload,
        onSuccess: (result) => {
          self.initialData = result
        }
      })
    },

    getUtilities(payload) {
      return self.request({
        type: TYPES.GET_UTILS,
        api: getUtilities,
        payload
      })
    },

    getQuestionArea(payload) {
      return self.request({
        type: TYPES.GET_QUESTION_AREA,
        api: getQuestionArea,
        payload
      })
    },

    getArea(payload) {
      return self.request({
        type: TYPES.GET__AREA,
        api: getArea,
        payload
      })
    }
  }))

export {
  TYPES
}
export default AuthStore.create({})
