import request from '../utils/request'

export function login(data: { authCode: string }) {
  return request({
    url: '/v2/api/jd/login',
    method: 'GET',
    data
  })
}


export function setPhoneNumber(data: { accessToken: string; force: boolean }) {
  return request({
    url: '/v2/api/jd/setPhone',
    method: 'POST',
    data
  })
}
