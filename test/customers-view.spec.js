const { expect } = require('chai')
const { clear, attr, notAllNull, notAllEmpty, allTrue } = require('../utils')
const { USERNAME, PASSWORD } = require('../constants/credentials')
const moment = require('moment')

describe.skip('Customers Management - View Details Functionality', async () => {
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

      it('Should display the `View details` item inside any results list menu item', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)
         const toggler = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-toggle'
         )
         await toggler.hover()
         const listItem = await page.waitFor(
            'tr:nth-child(2) .table-dropdown-menu-item:nth-child(1) > a'
         )

         expect(listItem).to.not.be.null
      })

      it('Should show the view details page when click the `View details` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)
         const toggler = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-toggle'
         )
         await toggler.hover()
         const listItem = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-item:nth-child(1) > a'
         )
         await listItem.click()
         await page.waitFor(5000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Xem thông tin khách hàng')
      })

      it('Should have essential elements for the view details page', async () => {
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

      it('Should disable all input fields on initial load', async () => {
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
         const notesElem = await page.waitFor(
            '.form-group:nth-child(7) > textarea'
         )

         expect(
            allTrue([
               idElem.getProperty('disabled'),
               nameElem.getProperty('disabled'),
               gendersElem.getProperty('disabled'),
               dobElem.getProperty('disabled'),
               phoneElem.getProperty('disabled'),
               addressElem.getProperty('disabled'),
               notesElem.getProperty('disabled')
            ])
         ).to.be.true
      })

      it('Should refresh when click the `Refresh` button', async () => {
         const refreshButton = await page.waitFor('.button:nth-child(1)')
         await refreshButton.click()
         await page.waitFor(3000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Xem thông tin khách hàng')
      })

      it('Should back to the list page when click the `Back` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const backButton = await page.waitFor('.button:nth-child(1)')
         await backButton.click()
         await page.waitFor(3000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Xem thông tin khách hàng')
      })

      it('Should show the exports reports dialog when click the `Export reports` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)
         const toggler = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-toggle'
         )
         await toggler.hover()
         const listItem = await page.waitFor(
            'tr:nth-child(1) .table-dropdown-menu-item:nth-child(1) > a'
         )
         await listItem.click()
         await page.waitFor(5000)

         const exportReportButton = await page.waitFor('.button:nth-child(2)')
         await exportReportButton.click()

         const dialog = await page.waitFor('.popup-wrapper')

         expect(dialog).to.not.be.null
      })
   })
})
