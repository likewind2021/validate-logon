const DB_URL = 'mongodb://127.0.0.1'
const REDIS = {
  host: '127.0.0.1',
  port: 6379,
  password: 'requirepass'
}

const JWT_SECRET = 'a&*38QthAKuiRwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!'
module.exports = { DB_URL, REDIS, JWT_SECRET }

// export default {
//   DB_URL, REDIS, JWT_SECRET
// }

// const baseUrl = process.env.NODE_ENV === 'production' ? 'http://www.luckmiss.com' : 'http://localhost:3000'
// const uploadPath = process.env.NODE_ENV === 'production' ? '/app/public' : path.join(path.resolve(__dirname), '../../public')
// export default { DB_URL, REDIS, JWT_SECRET, baseUrl, uploadPath }
