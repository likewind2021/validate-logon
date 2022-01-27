import axios from 'axios'

const getCode = async () => {
  let result = ''
  try {
    result = await axios.get('/getCaptcha')
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
  return result
}

const forget = async (option) => { // option 传递过来的一些用户数据
  let result = ''
  try {
    result = await axios.post('api/forget', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
  return result
}

export {
  getCode, forget
}
