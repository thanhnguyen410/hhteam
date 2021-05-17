import Request from '@/utils/request'
import Configs from '@/configs'
import Storage from '@/utils/storage'

const endpoint = `${Configs.API_URL}/api/v1`

const MainApi = Request.create({
  endpoint,
  handleToken: true
})

const myShopCurrent = Storage.get('MY_SHOP_CURRENT')

const ExternalApi = Request.create({
  endpoint: ''
})

export { MainApi, ExternalApi, myShopCurrent }
