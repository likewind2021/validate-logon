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
extend('confirmed', confirmed)
