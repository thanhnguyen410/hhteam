import { MainApi, ExternalApi } from './endpoint'

// eslint-disable-next-line no-async-promise-executor
export const uploadFiles = ({ files }) => new Promise(async (resolve, reject) => {
  try {
    const signedPayload = Array.from(files)
      .map((file) => {
        const fileNamePaths = file.name.split('.')
        return ({
          filename: fileNamePaths[0],
          filetype: (fileNamePaths[fileNamePaths.length - 1]).toLowerCase()
        })
      })

    const signedResult = await MainApi.post('/presign', { files: signedPayload })

    const promiseArray = []
    signedResult.data.forEach(async (item, index) => {
      promiseArray.push(ExternalApi.put(item.presign_url, files[index]))
    })
    await Promise.all(promiseArray)

    resolve({
      data: signedResult.data.map((item) => item.url)
    })
  } catch (e) {
    reject(e)
  }
})

// eslint-disable-next-line no-async-promise-executor
export const registerShop = ({ dataSubmit }) => new Promise(async (resolve, reject) => {
  try {
    let { avatar, shopImages, certificateImages } = dataSubmit
    certificateImages = certificateImages.map((item) => item.image_url)
    shopImages = shopImages.map((item) => item.image_url)
    shopImages = shopImages.filter((item) => item !== '')
    // process signed avatar

    const avatarPath = avatar.image_url.name?.split('.')
    let avatarSignedPayload = null
    if (avatarPath) {
      avatarSignedPayload = [{
        filename: avatarPath[0],
        filetype: (avatarPath[avatarPath.length - 1]).toLowerCase()
      }]
    }

    // process signed certificateImages
    const certificateImagesSignedPayload = certificateImages
      .map((file) => {
        const fileNamePaths = file?.name.split('.')

        return ({
          filename: fileNamePaths[0],
          filetype: (fileNamePaths[fileNamePaths.length - 1]).toLowerCase()
        })
      })

    // process signed shopImages
    const shopImagesSignedPayload = shopImages
      .map((file) => {
        const fileNamePaths = file === '' ? null : file?.name.split('.')

        if (fileNamePaths) {
          return ({
            filename: fileNamePaths[0],
            filetype: (fileNamePaths[fileNamePaths.length - 1]).toLowerCase()
          })
        }
        return false
      })

    // get data signed
    const avatarSignedResult = avatarSignedPayload
      ? await MainApi.post('/presign', { files: avatarSignedPayload })
      : null
    const certificateImagesSignedResult = await MainApi.post('/presign', { files: certificateImagesSignedPayload })
    const shopImagesResult = await MainApi.post('/presign', { files: shopImagesSignedPayload })

    // create promise process
    const avatarPromiseArray = []

    if (avatarSignedResult) {
      avatarPromiseArray.push(ExternalApi.put(avatarSignedResult.data[0].presign_url, avatar.image_url))
    }

    // create promise process
    const certificateImagesPromiseArray = []
    certificateImagesSignedResult.data.forEach(async (item, index) => {
      certificateImagesPromiseArray.push(ExternalApi.put(item.presign_url, certificateImages[index]))
    })

    // create promise process
    const shopImagesPromiseArray = []
    shopImagesResult.data.forEach(async (item, index) => {
      shopImagesPromiseArray.push(ExternalApi.put(item.presign_url, shopImages[index]))
    })

    // await all process success
    await Promise.all(avatarPromiseArray, certificateImagesPromiseArray, shopImagesPromiseArray)

    // return data when success
    resolve({
      data: {
        avatar: avatarSignedResult ? avatarSignedResult.data[0].url : null,
        shopImages: certificateImagesSignedResult.data.map((item) => item.url),
        certificateImages: certificateImagesSignedResult.data.map((item) => item.url)
      }
    })
  } catch (e) {
    reject(e)
  }
})

export function registerFullInfoShop(payload) {
  return MainApi.post('/shops/register', payload)
}
