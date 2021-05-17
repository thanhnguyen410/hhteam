import lodash from 'lodash'
import Configs from '@/configs'
import { STATUS_OF_BOOKING } from '@/constants/common'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

function isFetchError(error) {
  return !!error && lodash.hasIn(error, 'status') && lodash.isFunction(error.json)
}

async function getFetchError(error) {
  try {
    return await error.json()
  } catch (e) {
    return null
  }
}

export default class Misc {
  static IS_MOBILE = isMobile

  static trimObjectProperties = (obj, properties) => {
    const data = lodash.cloneDeep(obj)

    if (lodash.isArray(properties)) {
      properties.forEach((property) => {
        data[property] = data[property]?.trim()
      })
    } else {
      lodash.keys(obj).forEach((key) => {
        data[key] = data[key]?.trim()
      })
    }

    return data
  }

  static getImageURL = (name) => name && `${Configs.API_URL}/${name}`

  static getUrlVars() {
    const vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value
    })
    return vars
  }

  static getErrorJsonBody = async (error) => {
    if (isFetchError(error)) {
      error = await getFetchError(error)
    }

    return error?.error || error
  }

  static removeNullPropsFromObj = (obj) => lodash.pickBy(obj, (field) => field ?? false)

  static scrollTo = (element, offset = 200) => {
    const page = document.getElementById('scrollable-page')

    if (element) {
      const { y } = element.getBoundingClientRect()

      page.scroll({
        top: page.scrollTop + y - offset,
        behavior: 'smooth'
      })
    }
  }
}
