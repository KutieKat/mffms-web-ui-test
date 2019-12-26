const { expect } = require('chai')
const { clear, attr, notAllNull, notAllEmpty, allTrue } = require('../utils')
const { USERNAME, PASSWORD } = require('../constants/credentials')
const moment = require('moment')

describe('Customers Management - Update Functionality', async () => {
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

      it('Should display the `Update` item inside any results list menu item', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)
         const toggler = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-toggle'
         )
         await toggler.hover()
         const listItem = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-item:nth-child(2) > a'
         )

         expect(listItem).to.not.be.null
      })

      it('Should show the update customers information page when click the `Update` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)
         const toggler = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-toggle'
         )
         await toggler.hover()
         const listItem = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-item:nth-child(2) > a'
         )
         await listItem.click()
         await page.waitFor(5000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Cập nhật thông tin khách hàng')
      })

      it('Should have essential elements for the update page', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         const idElem = await page.waitFor('.form-group:nth-child(1) > input')
         const nameElem = await page.waitFor('.form-group:nth-child(2) > input')
         const gendersElem = await page.waitFor('.form-group:nth-child(3)')
         const dobElem = await page.waitFor('.form-group:nth-child(4) > input')
         const phoneElem = await page.waitFor(
            '.form-group:nth-child(5) > input'
         )
         const addressElem = await page.waitFor(
            '.form-group:nth-child(6) > textarea'
         )

         expect(
            notAllNull([
               idElem,
               nameElem,
               gendersElem,
               dobElem,
               phoneElem,
               addressElem
            ])
         ).to.be.true
      })

      it('Should already have information inside each required field on initial load', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         const idElem = await page.waitFor('.form-group:nth-child(1) > input')
         const nameElem = await page.waitFor('.form-group:nth-child(2) > input')
         const gendersElem = await page.waitFor('.form-group:nth-child(3)')
         const dobElem = await page.waitFor('.form-group:nth-child(4) > input')
         const phoneElem = await page.waitFor(
            '.form-group:nth-child(5) > input'
         )
         const addressElem = await page.waitFor(
            '.form-group:nth-child(6) > textarea'
         )

         expect(
            notAllEmpty([
               idElem.getProperty('id'),
               nameElem.getProperty('value'),
               gendersElem.getProperty('value'),
               dobElem.getProperty('value'),
               phoneElem.getProperty('value'),
               addressElem.getProperty('value')
            ])
         ).to.be.true
      })

      it('Should disable the customer id field on initial load', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         const idElem = await page.waitFor('.form-group:nth-child(1) > input')

         expect(allTrue([idElem.getProperty('disabled')])).to.be.true
      })

      describe('The name field', async () => {
         before(async () => {
            const nameElem = await page.waitFor(
               '.form-group:nth-child(2) > input'
            )
            const gendersElem = await page.waitFor('.form-group:nth-child(3)')
            const dobElem = await page.waitFor(
               '.form-group:nth-child(4) > input'
            )
            const phoneElem = await page.waitFor(
               '.form-group:nth-child(5) > input'
            )
            const addressElem = await page.waitFor(
               '.form-group:nth-child(6) > textarea'
            )

            await clear(nameElem)
            await clear(gendersElem)
            await clear(dobElem)
            await clear(phoneElem)
            await clear(addressElem)
         })

         it('Should show errors when provide an invalid value (blank) for the name field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            await clear(nameElem)
            await nameElem.type('')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(2) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (numeric) for the name field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            await nameElem.focus()
            await clear(nameElem)
            await nameElem.type('0902123456')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(2) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (special characters) for the name field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            await nameElem.focus()
            await clear(nameElem)
            await nameElem.type('~!@#$%^&*()')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(2) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should hide errors when provide a valid value for the name field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const alertedNameElem = await page.$(
               '.form-group:nth-child(2) > input'
            )
            await alertedNameElem.focus()

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            await clear(nameElem)
            await nameElem.type('Nguyễn Tiến Dũng')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(2) > input',
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

            const phoneElem = await page.$('.form-group:nth-child(5) > input')
            await clear(phoneElem)
            await phoneElem.type('')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(5) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (alpha) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(5) > input')
            await clear(phoneElem)
            await phoneElem.type('Nguyễn Tiến Dũng')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(5) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (special characters) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(5) > input')
            await clear(phoneElem)
            await phoneElem.type('~!@#$%^&*()')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(5) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (wrong initial code) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(5) > input')
            await clear(phoneElem)
            await phoneElem.type('0123456789')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(5) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an invalid value (not enough digits) for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(5) > input')
            await clear(phoneElem)
            await phoneElem.type('090212345')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(5) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should hide errors when provide a valid value for the phone field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            const phoneElem = await page.$('.form-group:nth-child(5) > input')
            await clear(phoneElem)
            await phoneElem.type('0902123456')

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(5) > input',
               'className'
            )

            expect(resultedClassName !== 'form-input-alert').to.be.true
         })
      })

      describe('The address field', async () => {
         it('Should show errors when provide an invalid value for the address field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            const addressElem = await page.$(
               '.form-group:nth-child(6) > textarea'
            )
            await clear(addressElem)
            await addressElem.type('')

            const submitButtonElem = await page.$('.button-primary')
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(6) > textarea',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide an valid value for the address field', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            const addressElem = await page.$(
               '.form-group:nth-child(6) > textarea'
            )
            await clear(addressElem)
            await addressElem.type('Thủ Đức, Thành phố Hồ Chí Minh')

            const submitButtonElem = await page.$('.button-primary')
            await submitButtonElem.click()

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(6) > textarea',
               'className'
            )

            expect(resultedClassName !== 'form-input-alert').to.be.true
         })
      })

      describe('The date of birth field', async () => {
         it('Should show errors when leave the date of birth field blank', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            await page.$eval(
               '.form-group:nth-child(4) > input',
               el => (el.value = '')
            )

            await page.evaluate(() => {
               document.querySelector(
                  '.form-group:nth-child(4) > input'
               ).value = '2019-12-28'
            })

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()
            await page.waitFor(3000)

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(4) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })

         it('Should show errors when provide the date of birth field with a date that is greater than today', async () => {
            dashboardRunBefore = false
            dashboardRunAfter = false

            const nameElem = await page.$('.form-group:nth-child(2) > input')
            nameElem.focus()

            await page.$eval(
               '.form-group:nth-child(4) > input',
               el => (el.value = '')
            )

            const submitButtonElem = await page.waitFor(
               '.section__footer-right .button-primary'
            )
            await submitButtonElem.click()
            await page.waitFor(3000)

            const resultedClassName = await attr(
               page,
               '.form-group:nth-child(4) > input',
               'className'
            )

            expect(resultedClassName === 'form-input-alert').to.be.true
         })
      })

      // it('Should back to the list page when click the `Back` button', async () => {
      //    dashboardRunBefore = false
      //    dashboardRunAfter = false

      //    const backButton = await page.waitFor('.button:nth-child(1)')
      //    await backButton.click()
      //    await page.waitFor(3000)

      //    const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
      //    expect(pageTitle).to.equal('Xem thông tin khách hàng')
      // })
   })
})
