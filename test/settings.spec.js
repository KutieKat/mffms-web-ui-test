const { expect } = require('chai')
const { clear, attr, notAllNull, notAllEmpty } = require('../utils')
const { USERNAME, PASSWORD } = require('../constants/credentials')

describe('Settings Management Functionality', async () => {
   let page

   before(async () => {
      page = await browser.newPage()
      await page.goto('http://localhost:3000')
      await page.setViewport({ width: 640, height: 480 })
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

         const pageTitleElem = await page.evaluate(
            () => document.querySelector('.main-header__title').innerText
         )
         expect(pageTitleElem).to.equal('MFFMS')
      })
   })

   describe('Dashboard', async () => {
      // Flags
      let dashboardRunBefore = false
      let dashboardRunAfter = false

      // Selectors
      const name = '.form-group:nth-child(1) > .form-input-outline'
      const address = '.form-group:nth-child(2) > .form-input-outline'
      const addressOnPage = '.form-group:nth-child(3) > .form-input-outline'
      const phone = '.form-group:nth-child(4) > .form-input-outline'
      const fax = '.form-group:nth-child(5) > .form-input-outline'
      const restoreButton = '.button:nth-child(1)'
      const saveButton = '.button:nth-child(2)'
      const settingsManagementItem =
         '.main-nav__list:nth-child(8) > .main-nav__list-item:nth-child(2) > a'
      const errors = '.section__alert'

      // Elements
      let nameElem
      let addressElem
      let addressOnPageElem
      let phoneElem
      let faxElem
      let restoreButtonElem
      let saveButtonElem
      let settingsManagementItemElem

      before(async () => {
         settingsManagementItemElem = await page.$(settingsManagementItem)
      })

      beforeEach(async () => {
         if (dashboardRunBefore) {
            nameElem = await page.waitFor(name, { visible: true })
            addressElem = await page.waitFor(address, { visible: true })
            addressOnPageElem = await page.waitFor(addressOnPage, {
               visible: true
            })
            phoneElem = await page.waitFor(phone, { visible: true })
            faxElem = await page.waitFor(fax, { visible: true })
            restoreButtonElem = await page.waitFor(restoreButton, {
               visible: true
            })
            saveButtonElem = await page.waitFor(saveButton, {
               visible: true
            })
         }
      })

      afterEach(async () => {
         if (dashboardRunAfter) {
            await nameElem.focus()
            await restoreButtonElem.click()
         }
      })

      it('Should show settings management page when click on `Settings management` item', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await settingsManagementItemElem.click()
         await page.waitFor(3000)

         const pageTitle = await page.evaluate(
            () => document.querySelector('.breadcrumb-active a').innerText
         )
         expect(pageTitle).to.equal('Quản lý cài đặt')
      })

      it('Should highlight settings management item after clicking on it', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const itemClassName = await attr(
            page,
            settingsManagementItem,
            'className'
         )

         expect(itemClassName).to.equal('main-nav__list-item--active')
      })

      it('Should have essential elements for the settings management page', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         expect(
            notAllNull([
               nameElem,
               addressElem,
               addressOnPageElem,
               phoneElem,
               faxElem
            ])
         ).to.not.be.null
      })

      it.skip('Should limit a minimum of 4 characters for the name field', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const minChars = await attr(page, name, 'minLength')
         expect(minChars).to.equal(4)
      })

      it.skip('Should limit a maximum of 255 characters for the name field', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         const maxChars = await attr(page, name, 'maxLength')
         expect(maxChars).to.equal(255)
      })

      it.skip('Should limit a minimum of 4 characters for the address field', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const minChars = await attr(page, adress, 'minLength')
         expect(minChars).to.equal(4)
      })

      it.skip('Should limit a maximum of 255 characters for the address field', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         const maxChars = await attr(page, address, 'maxLength')
         expect(maxChars).to.equal(255)
      })

      it.skip('Should limit a minimum of 4 characters for the address on page field', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const minChars = await attr(page, addressOnPage, 'minLength')
         expect(minChars).to.equal(4)
      })

      it.skip('Should limit a maximum of 255 characters for the address on page field', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         const maxChars = await attr(page, addressOnPage, 'maxLength')
         expect(maxChars).to.equal(255)
      })

      it.skip('Should already have information inside each input on initial load', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         expect(
            notAllEmpty([
               nameElem.getProperty('value'),
               addressElem.getProperty('value'),
               addressOnPageElem.getProperty('value'),
               phoneElem.getProperty('value'),
               faxElem.getProperty('value')
            ])
         ).to.be.true
      })

      it.skip('Should show errors when leave all required fields blank', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(nameElem)
         await clear(addressElem)
         await clear(addressOnPageElem)
         await clear(phoneElem)
         await clear(faxElem)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should hide errors when focus on any highlighted fields', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(nameElem)
         await clear(addressElem)
         await clear(addressOnPageElem)
         await clear(phoneElem)
         await clear(faxElem)
         await nameElem.focus()

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.be.null
      })

      it.skip('Should show errors when leave name field blank', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(nameElem)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should show errors when provide name field with a less-than-4-character value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(nameElem)
         await nameElem.type('aaa')
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should restore name field to its previous value after resetting it', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const previousValue = await nameElem.getProperty('value')

         await clear(nameElem)
         await restoreButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await nameElem.getProperty('value')
         expect(updatedValueToCompare).to.equal(previousValue)
      })

      it.skip('Should have updated value inside name field after providing it with a valid value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const updatedValue = 'Sân bóng mini Năm Nhỏ'

         await clear(nameElem)
         await nameElem.type(updatedValue)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await nameElem.getProperty('value')
         expect(updatedValueToCompare).to.equal(updatedValue)
      })

      it.skip('Should show errors when leave address field blank', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(addressElem)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should show errors when provide address field with a less-than-4-character value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(addressElem)
         await addressElem.type('aaa')
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should restore address field to its previous value after resetting it', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const previousValue = await addressElem.getProperty('value')

         await clear(addressElem)
         await restoreButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await addressElem.getProperty('value')
         expect(updatedValueToCompare).to.equal(previousValue)
      })

      it.skip('Should have updated value inside address field after providing it with a valid value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const updatedValue = 'Thủ Đức, Thành phố Hồ Chí Minh'

         await clear(addressElem)
         await addressElem.type(updatedValue)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await addressElem.getProperty('value')
         expect(updatedValueToCompare).to.equal(updatedValue)
      })

      it.skip('Should show errors when leave address on page field blank', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(addressOnPageElem)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should show errors when provide address on page field with a less-than-4-character value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(addressOnPageElem)
         await addressOnPageElem.type('aaa')
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should restore address on page field to its previous value after resetting it', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const previousValue = await addressOnPageElem.getProperty('value')

         await clear(addressOnPageElem)
         await restoreButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await addressOnPageElem.getProperty(
            'value'
         )
         expect(updatedValueToCompare).to.equal(previousValue)
      })

      it.skip('Should have updated value inside address on page field after providing it with a valid value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const updatedValue = 'Thành phố Hồ Chí Minh'

         await clear(addressOnPageElem)
         await addressOnPageElem.type(updatedValue)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await addressOnPageElem.getProperty(
            'value'
         )
         expect(updatedValueToCompare).to.equal(updatedValue)
      })

      it.skip('Should show errors when leave phone field blank', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(phoneElem)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should show errors when provide phone field with an invalid value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(phoneElem)
         await phoneElem.type('abc')
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should restore phone field to its previous value after resetting it', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const previousValue = await phoneElem.getProperty('value')

         await clear(phoneElem)
         await restoreButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await phoneElem.getProperty('value')
         expect(updatedValueToCompare).to.equal(previousValue)
      })

      it.skip('Should have updated value inside phone field after providing it with a valid value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const updatedValue = '0902123456'

         await clear(phoneElem)
         await phoneElem.type(updatedValue)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await phoneElem.getProperty('value')
         expect(updatedValueToCompare).to.equal(updatedValue)
      })

      it.skip('Should show errors when leave fax field blank', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(faxElem)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should show errors when provide fax field with an invalid value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         await clear(faxElem)
         await faxElem.type('abc')
         await saveButtonElem.click()
         await page.waitFor(3000)

         const errorsElem = await page.$(errors)
         expect(errorsElem).to.not.be.null
      })

      it.skip('Should restore fax field to its previous value after resetting it', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const previousValue = await faxElem.getProperty('value')

         await clear(faxElem)
         await restoreButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await faxElem.getProperty('value')
         expect(updatedValueToCompare).to.equal(previousValue)
      })

      it.skip('Should have updated value inside fax field after providing it with a valid value', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = true

         const updatedValue = '0902123456'

         await clear(faxElem)
         await faxElem.type(updatedValue)
         await saveButtonElem.click()
         await page.waitFor(3000)

         const updatedValueToCompare = await faxElem.getProperty('value')
         expect(updatedValueToCompare).to.equal(updatedValue)
      })
   })
})
