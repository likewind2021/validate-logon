import { extend, configure } from 'vee-validate'
import { required, email, min, max, length, confirmed } from 'vee-validate/dist/rules'
import { i18n } from './i18n'

configure({
  defaultMessage: (field, values) => {
    // override the field name
    values._field_ = i18n.t(`fields.${field}`)
    return i18n.t(`validation.${values._rule_}`, values)
  }
})

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('length', length)
// extend('confirmed', confirmed)

// method 1
// extend('confirmed', {
//   ...confirmed,
//   // validate: confirmed.validate,
//   message: field => i18n.t(`validation.${field}`)
// })
// extend('nickname', {
//   validate (value) {
//     return !value.replace(/[^0-9]/g)
//   },
//   // message: (field) => i18n.t(`fields.${field}`) + i18n.t('validation.nickname')
//   message: field => i18n.t(`validation.${field}`)
// })

// method 1 优化
const messageFunc = field => i18n.t(`validation.${field}`)
extend('confirmed', {
  ...confirmed,
  // validate: confirmed.validate,
  message: messageFunc
})
extend('nickname', {
  validate (value) {
    const isNamuber = new RegExp(/[^0-9]/g)
    return isNamuber.test(value)
  },
  message: messageFunc
})

// method 2
// const messageFunc = (o, validate) => {
//   const v = {
//     message: field => i18n.t(`validation.${field}`)
//   }
//   if (o) {
//     return {
//       ...o,
//       ...v
//     }
//   } else if (validate) {
//     return {
//       validate,
//       ...v
//     }
//   }
// }
// extend('confirmed', messageFunc(confirmed))
// extend('nickname', messageFunc(undefined, value => {
//   const isNamuber = new RegExp(/[^0-9]/g)
//   return isNamuber.test(value)
// }))
