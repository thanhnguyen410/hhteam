import { Model } from '@/utils/mobx-model-helper'
import {
  uploadFiles,
  registerShop,
  registerFullInfoShop
} from '@/api/assets'

const TYPES = {
  UPLOAD_FILES: 1,
  REGISTER_SHOP: 2,
  REGISTER_FULL_INFO_SHOP: 3
}

const AssetsStore = Model.named('AssetsStore')
  .actions((self) => ({
    uploadFiles(payload) {
      return self.request({
        type: TYPES.UPLOAD_FILES,
        api: uploadFiles,
        payload
      })
    },

    registerShop(payload) {
      return self.request({
        type: TYPES.REGISTER_SHOP,
        api: registerShop,
        payload
      })
    },

    registerFullInfoShop(payload) {
      return self.request({
        type: TYPES.REGISTER_FULL_INFO_SHOP,
        api: registerFullInfoShop,
        payload
      })
    }
  }))

export {
  TYPES
}
export default AssetsStore.create()
