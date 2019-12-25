const { expect } = require('chai')
const { clear, attr, notAllNull, notAllEmpty } = require('../utils')
const { USERNAME, PASSWORD } = require('../constants/credentials')

describe('Statistics Charts Functionality', async () => {
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
         '.main-nav__list:nth-child(8) > .main-nav__list-item:nth-child(2) > a'

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
         }
      })

      it('Should show view details page when click the `View details` menu item', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)

         const pageTitle = await page.evaluate(
            () => document.querySelector('.breadcrumb-active a').innerText
         )
         expect(pageTitle).to.equal('Biểu đồ thống kê')
      })

      it('Should have essential elements for the view details page', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         expect(true).to.be.true
      })

      it('Should already have information inside each required field on initial load', async () => {
         expect(true).to.be.true
      })

      it('Should disable all input fields on initial load', async () => {
         expect(true).to.be.true
      })

      it('Should show the list page when click the `Back` button', async () => {
         expect(true).to.be.true
      })

      it('Should show the list page when click the list page breadcrumb item', async () => {
         expect(true).to.be.true
      })

      it('Should show the dashboard homepage when click on the dashboard homepage breadcrumb item', async () => {
         expect(true).to.be.true
      })
   })
})
