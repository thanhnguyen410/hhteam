import { types, flow, getSnapshot, applySnapshot, destroy } from 'mobx-state-tree'

import Toast from '@/components/toast'
import Misc from '@/utils/misc'
import Request from '@/utils/request'
import ERROR_MESSAGE from '@/constants/error-messages'
import { routingStore } from '@/store'
import Storage from './storage'

const Model = types.model('MobxModelHelper', {
  type: types.maybeNull(types.number),
  error: types.frozen()
})
  .actions((self) => ({
    afterCreate() {
      self.INIT_VALUES = getSnapshot(self)
    },

    clear() {
      applySnapshot(self, self.INIT_VALUES)
    },

    remove(item) {
      destroy(item)
    },

    request: flow(function* ({
      type,
      api,
      payload,
      onSuccess,
      onError,
      handleError,
      disabledErrorMessage,
      successMessage
    }) {
      if (type) {
        self.type = type
      }
      self.error = null

      let data = null
      let success = false

      try {
        if (api) {
          const result = yield api(payload)

          if (onSuccess) onSuccess(result.data)

          if (successMessage) {
            Toast.show(successMessage)
          }

          success = true
          data = result.data
        }
      } catch (e) {
        const error = (yield Misc.getErrorJsonBody(e)) || e
        self.error = error
        data = error
        // eslint-disable-next-line no-console
        console.warn(error)

        if ((error.code === 401) || ['PERMISSION_DENIED', 'TOKEN_INVALID', 'TOKEN_EXPIRED'].includes(error.message)) {
          Request.removeAccessToken()
          Storage.remove('ACCESS_TOKEN')
          routingStore.replace('/login')

          return { success: false }
        }

        if (onError) onError(e)

        if (!disabledErrorMessage) {
          if (handleError) {
            const handledError = handleError(error)

            if (handledError) {
              Toast.error(ERROR_MESSAGE[handledError] || handledError)
            }
          } else {
            Toast.error(
              (ERROR_MESSAGE[error?.message] || error?.message)
              || error?.message
            )
          }
        }
      }

      self.type = null

      return { success, data, payload }
    })
  }))

export {
  Model
}
