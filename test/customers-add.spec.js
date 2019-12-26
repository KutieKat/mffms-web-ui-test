const { expect } = require('chai')
const { clear, attr, notAllNull, notAllEmpty } = require('../utils')
const { USERNAME, PASSWORD } = require('../constants/credentials')
const moment = require('moment')

describe.skip('Customers Management - Add Functionality', async () => {
   let page

   before(async () => {
      page = await browser.newPage()
      await page.goto('http://localhost:3000')
      await page.setViewport({ width: 1200, height: 860 })
   })

   after(async () => {
      await page.close()
   })

   describe('Sign In Page', async () => {
      // Elements
      let usernameElem
      let passwordElem
      let signInButtonElem

      before(async () => {
         const username = '.form-group:nth-child(2) > .form-input-outline'
         const password = '.form-group:nth-child(3) > .form-input-outline'
         const signInButton = '.login-button'

         usernameElem = await page.waitFor(username, { visible: true })
         passwordElem = await page.waitFor(password, { visible: true })
         signInButtonElem = await page.waitFor(signInButton, {
            visible: true
         })
      })

      it('Should show dashboard when provide username and password fields with the ones that exist', async () => {
         await usernameElem.type(USERNAME)
         await passwordElem.type(PASSWORD)
         await signInButtonElem.click()
         await page.waitFor(3000)

         const pageTitleElem = await attr(
            page,
            '.main-header__title',
            'innerText'
         )
         expect(pageTitleElem).to.equal('MFFMS')
      })
   })

   describe('Dashboard', async () => {
      // Flags
      let dashboardRunBefore = false
      let dashboardRunAfter = false

      // Selectors
      const menuItem =
         '.main-nav__list:nth-child(4) > .main-nav__list-item:nth-child(1) > a'

      // Elements
      let menuItemElem

      before(async () => {
         menuItemElem = await page.$(menuItem)
      })

      beforeEach(async () => {
         if (dashboardRunBefore) {
         }
      })

      afterEach(async () => {
         if (dashboardRunAfter) {
            const nameElem = await page.waitFor(
               '.form-group:nth-child(1) > input'
            )
            await nameElem.focus()
         }
      })

      it('Should display the `Add new` button on the list page', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)

         const addButton = '.button:nth-child(2)'
         const addButtonElem = await page.$(addButton)

         expect(addButtonElem).to.not.be.null
      })

      it('Should show the add new customers page when click the `Add new` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const addButton = '.button:nth-child(2)'
         const addButtonElem = await page.$(addButton)
         await addButtonElem.click()
         await page.waitFor(3000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Thêm khách hàng mới')
      })

      it('Should back to the list page when click the `Back` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const backButton = await page.waitFor('.button:nth-child(1)')
         await backButton.click()
         await page.waitFor(3000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Quản lý khách hàng')
      })

      describe('The name field', async () => {
         before(async () => {
            const addButton = '.button:nth-child(2)'
            const addButtonElem = await page.$(addButton)
            await addButtonElem.click()
            await page.waitFor(3000)
         })

         it('Should show errors when provide an invalid value (blank) for the name field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            await nameElem.type('')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(1) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (numeric) for the name field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            await nameElem.focus()
            await clear(nameElem)
            await nameElem.type('0902123456')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(1) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (special characters) for the name field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            await nameElem.focus()
            await clear(nameElem)
            await nameElem.type('~!@#$%^&*()')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(1) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should hide errors when provide a valid value for the name field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const alertedNameElem = await page.$(
               '.form-group:nth-child(1) > input'
            )
            await alertedNameElem.focus()

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            await clear(nameElem)
            await nameElem.type('Nguyễn Tiến Dũng')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(1) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })
      })

      describe('The phone field', async () => {
         it('Should show errors when provide an invalid value (blank) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(4) > input')
            await phoneElem.type('')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(4) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (alpha) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(4) > input')
            await phoneElem.type('Nguyễn Tiến Dũng')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(4) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (special characters) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(4) > input')
            await clear(phoneElem)
            await phoneElem.type('~!@#$%^&*()')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(4) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (wrong initial code) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(4) > input')
            await clear(phoneElem)
            await phoneElem.type('0123456789')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(4) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (not enough digits) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(4) > input')
            await clear(phoneElem)
            await phoneElem.type('090212345')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(4) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should hide errors when provide a valid value for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(4) > input')
            await clear(phoneElem)
            await phoneElem.type('0902123456')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(4) > input',
               'className'
            )

            expect(resultedClassName !== 'form-input-alert').to.be.true
         })
      })

      describe('The address field', async () => {
         it('Should show errors when provide an invalid value for the address field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            const phoneElem = await page.$(
               '.form-group:nth-child(5) > textarea'
            )
            await phoneElem.type('')

            const submitButtonElem = await page.$('.button-primary')
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(5) > textarea',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an valid value for the address field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            const phoneElem = await page.$(
               '.form-group:nth-child(5) > textarea'
            )
            await phoneElem.type('Thủ Đức, Thành phố Hồ Chí Minh')

            const submitButtonElem = await page.$('.button-primary')
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(5) > textarea',
               'className'
            )

            expect(resultedClassName !== 'form-input-alert').to.be.true
         })
      })

      describe('The date of birth field', async () => {
         it('Should show errors when leave the date of birth field blank', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            await page.$eval(
               '.form-group:nth-child(3) > input',
               el => (el.value = '')
            )

            await page.evaluate(() => {
               document.querySelector(
                  '.form-group:nth-child(3) > input'
               ).value = ''
            })

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()
            await page.waitFor(3000)

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(3) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide the date of birth field with a date that is greater than today', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(1) > input')
            nameElem.focus()

            await page.$eval(
               '.form-group:nth-child(3) > input',
               el =>
                  (el.value = moment(new Date())
                     .add(1, 'days')
                     .format('YYYY-MM-DD'))
            )

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()
            await page.waitFor(3000)

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(3) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })
      })

      it('Should back to the list page on success', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const submitButton = await page.waitFor('.button:nth-child(2)')
         await submitButton.click()
         await page.waitFor(5000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Quản lý khách hàng')
      })
   })
})
