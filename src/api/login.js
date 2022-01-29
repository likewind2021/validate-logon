import axios from '../utils/request'

const getCode = (sid) => {
  console.log(sid)
  // axios.request({
  //    method: 'get',
  //    url: '/getCaptcha'
  // })
  return axios.get('/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

const forget = (option) => { // option 传递过来的一些用户数据
  return axios.post('/forget', {
    ...option
  })
}

export {
  getCode, forget
}
