import { MainApi } from './endpoint'

export function shopLogin(payload) {
  return MainApi.post('/auth/users/login', payload)
}

export function getInitialData() {
  return MainApi.get('/current-user')
}

export function getUtilities() {
  return MainApi.get('/utilities')
}

export function getQuestionArea() {
  return MainApi.get('/questionnaire')
}

export function getArea() {
  return MainApi.get('/areas')
}
