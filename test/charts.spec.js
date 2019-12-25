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

      it('Should show statistics charts page when click on `Charts` item', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)

         const pageTitle = await page.evaluate(
            () => document.querySelector('.breadcrumb-active a').innerText
         )
         expect(pageTitle).to.equal('Biểu đồ thống kê')
      })

      it('Should highlight charts item after clicking on it', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const itemClassName = await attr(page, menuItem, 'className')

         expect(itemClassName).to.equal('main-nav__list-item--active')
      })

      it('Should have essential elements for the statistics charts page', async () => {
         dashboardRunBefore = true
         dashboardRunAfter = false

         expect(true).to.be.true
      })

      it('Should have already selected the `All time` tab on initial load', async () => {
         expect(true).to.be.true
      })

      it('Should refresh the page when click the `Refresh` button', async () => {
         expect(true).to.be.true
      })

      it('Should show the exports reports popup when click the `Export reports` button', async () => {
         expect(true).to.be.true
      })

      it('Should show the print dialog when select the `PDF` option inside the export reports popup', async () => {
         expect(true).to.be.true
      })

      it('Should close the export reports popup when click the `Close` button', async () => {
         expect(true).to.be.true
      })

      it('Should change the current date range to all time when click the `All time` tab', async () => {
         expect(true).to.be.true
      })

      it('Should hide the `Change date range` button when click the `All time` tab', async () => {
         expect(true).to.be.true
      })

      it("Should change the current date range to today's when click the `Today` tab", async () => {
         expect(true).to.be.true
      })

      it('Should hide the `Change date range` button when click the `Today` tab', async () => {
         expect(true).to.be.true
      })

      it("Should change the current date range to the current week's when click the `This week` tab", async () => {
         expect(true).to.be.true
      })

      it('Should hide the `Change date range` button when click the `This week` tab', async () => {
         expect(true).to.be.true
      })

      it("Should change the current date range to the current month's when click the `This month` tab", async () => {
         expect(true).to.be.true
      })

      it('Should hide the `Change date range` button when click the `This month` tab', async () => {
         expect(true).to.be.true
      })

      it("Should change the current date range to the current quarter's when click the `This quarter` tab", async () => {
         expect(true).to.be.true
      })

      it('Should hide the `Change date range` button when click the `This quarter` tab', async () => {
         expect(true).to.be.true
      })

      it("Should change the current date range to the current year's when click the `This year` tab", async () => {
         expect(true).to.be.true
      })

      it('Should hide the `Change date range` button when click the `This year` tab', async () => {
         expect(true).to.be.true
      })

      it("Should change the current date range to today's when click the `Optional` tab", async () => {
         expect(true).to.be.true
      })

      it('Should show the `Change date range` button when click the `Optional` tab', async () => {
         expect(true).to.be.true
      })

      it('Should show the date range picker popup when click the `Change date range` button', async () => {
         expect(true).to.be.true
      })

      it('Should show the dashboard homepage when click on the dashboard homepage breadcrumb item', async () => {
         expect(true).to.be.true
      })
   })
})
