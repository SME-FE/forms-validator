import { simpleForm } from './../mock/simple-form'
import FormValidation from '@/index'
import chai from 'chai'
chai.should()

const info = console.info.bind(console)

describe('simple form', function () {
  let formValidator = null
  let count = 0
  beforeEach('new formValidator instance', () => {
    count++
    // both way is ok
    if (count % 2 === 0) {
      formValidator = new FormValidation(5)
      formValidator.use(simpleForm)
    } else {
      formValidator = new FormValidation(5, simpleForm)
    }
  })

  describe('just test', function () {
    // test will not affect the form status, just use the validator core
    it('form.test', () => {
      formValidator.test('2017-11-09', 'after:2017-11-08').should.be.equal(true)
    })
  })

  describe('', function () {
    it('single field form', () => {
      // this form only has one input field
      formValidator.changeTotalFields(1)
      const result = formValidator.field('name').check('李狗蛋', 'ChinaName')
  
      info(result)
      result.isError.should.be.equal(false)
      formValidator.isPass.should.be.equal(true)
      formValidator.status().name.should.be.equal(true)
    })

    it('3 fields form', () => {
      // input filed: 'name', 'manAge', 'iEmail'
      formValidator.changeTotalFields(3)
      const result = formValidator.field('name').check('李狗蛋', 'ChinaName')
  
      result.isPass.should.be.equal(true)
      formValidator.isPass.should.be.equal(false)

      const ageResult = formValidator.field('manAge').check(19, 'Age')
      const emailResult = formValidator.field('iEmail').check('hwenleung@gmail.com', 'Email')
      ageResult.isPass.should.be.equal(true)
      emailResult.isPass.should.be.equal(true)
      formValidator.isPass.should.be.equal(true)

      const ageResult2 = formValidator.field('manAge').check(17, 'Age')
      ageResult2.isPass.should.be.equal(false)
      formValidator.isPass.should.be.equal(false)
    })

    it('fields with diff check', () => {
      let formData = {
        name: 'Leon',
        age: 20,
        startDate: '2017-11-03',
        email: 'test@gmail.com'
      }

      let language = 'en'
      const checkNameByLanguage = () => {
        formValidator.field('name').checkWithDiff([language, formData.name], ['ChinaName', 'EnglishName'], [/zh/i, /en/i])
      }
      formValidator.changeTotalFields(4)
      checkNameByLanguage()
      formValidator.field('age').check(formData.age, 'Age').isPass.should.be.equal(true)
      formValidator.field('startDate').check(formData.startDate, 'StartDate').isPass.should.equal(true)
      formValidator.field('email').check(formData.email, 'Email').isPass.should.equal(true)
      formValidator.isPass.should.be.equal(true)

      language = 'zh'
      checkNameByLanguage()
      formValidator.isPass.should.be.equal(false)

      formData.name = '李狗蛋'
      checkNameByLanguage()
      formValidator.isPass.should.be.equal(true)
    })
  })
})
