# Form Validator

a lightweight form validator that base on validator-core.

![Travis branch](https://travis-ci.org/SME-FE/forms-validator.svg?branch=master)
![coverage](https://img.shields.io/coveralls/github/SME-FE/forms-validator/master.svg)
![download](https://img.shields.io/npm/dm/forms-validator.svg)
![version](https://img.shields.io/npm/v/forms-validator.svg)
![license](https://img.shields.io/badge/license-mit-green.svg)

## Table of Content

- [Installation](#installation)
- [Example](#example)
- [API](#api)

## Installation

### install

```s
npm install --save forms-validator
```

### usage

```js
import FormValidator from 'forms-validator'
const ruleSet = [
  {
    name: 'ChinaName',
    rules: ['required', 'size:2-24', /^[\u4e00-\u9fa5]+$/],
    tips: ['不能为空', '长度为2到24', '不是中文']
  },
  {
    name: 'EnglishName',
    rules: ['required', 'size:2-24', /^[a-zA-Z\s]+$/],
    tips: ['Required...', 'Should have 2-24 letter', 'Not a valid English Name']
  }
]
// assume there are 5 fields need to check of the form
const formValidator = new FormValidation(5, ruleSet)
```

loaded as a standalone script

```html
<script src="forms-validator.min.js"></script>
<script type="text/javascript">
  const formValidator = new FormValidation()
</script>
```

## Example

- rule-set.factory.js

```js
export default ruleSetFactory (formType) {
  switch (formType) {
    case 'simpleForm':
      return simpleForm()
      break
    default:
      return simpleForm()
  }
}

function simpleForm () {
  return [
    {
      name: 'ChinaName',
      rules: ['required', 'size:2-24', /^[\u4e00-\u9fa5]+$/],
      tips: ['不能为空', '长度为2到24', '不是中文']
    },
    {
      name: 'EnglishName',
      rules: ['required', 'size:2-24', /^[a-zA-Z\s]+$/],
      tips: ['Required...', 'Should have 2-24 letter', 'Not a valid English Name']
    },
    {
      name: 'Age',
      optional: true,
      rules: ['gt:18'],
      tips: ['age should be large then 18']
    },
    {
      name: 'Email',
      rules: ['required', 'email', 'size:24'],
      tips: ['不能为空', '不是合法的 Email 地址', 'Email 地址过长']
    },
    {
      name: 'StartDate',
      rules: ['required', 'after:2017-10-03'],
      tips: ['需要', '2017-10-03号之后']
    },
    {
      name: 'Price',
      rules: ['required', 'lt:5000'],
      tips: ['错啦错啦']
    },
    {
      name: 'Color',
      rules: ['required', 'in:blue,red,orange']
    }
  ]
}
```

- test.js

```js
import FormValidator from 'forms-validator'
import ruleSetFactory from './rule-set.factory'

const simpleForm = ruleSetFactory('simpleForm')

simpleFormValidator = new FormValidator(3, simpleForm)
// assume there are 3 fields in this form
simpleFormValidator.changeTotalFields(3)
const result = simpleFormValidator.field('name').check('李狗蛋', 'ChinaName')

console.log(result)
// => {isError: false, isPass: true, name: 'ChinaName'}

/* because there are 3 fields of this form
 * but only the field 'name' is checked
 * so the status of this form is not passed
*/
console.log(simpleFormValidator.isPass)
// => false

const ageResult = simpleFormValidator.field('manAge').check(19, 'Age')
const emailResult = simpleFormValidator.field('iEmail').check('hwenleung@gmail.com', 'Email')

console.log(ageResult.isPass) // => true
console.log(emailResult.isPass) // => true
console.log(simpleFormValidator.isPass) // => true

// age should great then 18 (gt:18)
const ageResult2 = simpleFormValidator.field('manAge').check(17, 'Age')

console.log(ageResult2.isPass) // => false
console.log(simpleFormValidator.isPass) // => false
```

## API

### constructor(totalFields, ruleSet)

- `totalFields`, amount fileds of the form to check
- `ruleSet`, see the [validator-core](https://github.com/SME-FE/validator-core#use-with-ruleset) for detail

### isPass

properties, if all fields of the form are pass, return true.

### field(name)

- `name`, unique filed name for the form

### status()

return status of all fields

### changeTotalFields(total)

- `total`, if the total fields of the form dynamic changed, use this method to change the total fields of validator

### use 

see [validator-core](https://github.com/SME-FE/validator-core#api) for detail

### test 

see [validator-core](https://github.com/SME-FE/validator-core#api) for detail

### check 

see [validator-core](https://github.com/SME-FE/validator-core#api) for detail

### checkWithDiff 

see [validator-core](https://github.com/SME-FE/validator-core#api) for detail


## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, hwen <hwenleung@gmail.com>
