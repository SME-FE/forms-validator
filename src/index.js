
import Validator from 'validator-core'

export default class FormValidator {
  constructor (totalFields, ruleList) {
    this._fieldsStatus = {}
    this._currentField = '__default'
    this.totalFields = totalFields

    this.validator = new Validator(ruleList)
  }

  get isPass () {
    let count = 0
    for (let key in this._fieldsStatus) {
      if (!this._fieldsStatus[key]) return false
      count++
    }
    return this.totalFields === count
  }

  use (ruleList) {
    this.validator.use(ruleList)
  }

  test (value, rule) {
    return this.validator.test(value, rule)
  }

  field (name) {
    this._currentField = name
    return this
  }

  changeTotalFields (total) {
    this.totalFields = total
  }

  check (value, name) {
    const result = this.validator.check(value, name)
    this._fieldsStatus[this._currentField] = !result.isError
    return result
  }

  checkWithDiff (values, names, diffs) {
    const result = this.validator.checkWithDiff(values, names, diffs)
    this._fieldsStatus[this._currentField] = !result.isError
    return result
  }

  status () {
    return this._fieldsStatus
  }
} 
