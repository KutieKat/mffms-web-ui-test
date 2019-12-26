const { expect } = require('chai')
const { clear, attr, notAllNull, notAllEmpty } = require('../utils')
const { USERNAME, PASSWORD } = require('../constants/credentials')

describe.skip('Customers Management - List Functionality', async () => {
   let page

   before(async () => {
      page = await browser.newPage()
      await page.goto('http://localhost:3000')
      await page.setViewport({ width: 720, height: 480 })
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
         }
      })

      it('Should show customers list page when click on `Customer Management` item', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Quản lý khách hàng')
      })

      it('Should display correctly when the number of search results is empty', async () => {
         const searchInput = await page.waitFor('th:nth-child(2) > input')
         await searchInput.type('XXX')
         await page.waitFor(3000)

         const results = await attr(
            page,
            '.section__body table tbody > tr > td',
            'innerText'
         )
         const resultStatus = await attr(
            page,
            '.table-pagination__left > p',
            'innerText'
         )

         expect(
            results === 'Trống' &&
               resultStatus === 'Không có kết quả nào trong danh sách'
         ).to.be.true
      })

      it('Should display correctly when the number of search results is not empty', async () => {
         const searchInput = await page.waitFor('th:nth-child(2) > input')
         await clear(searchInput)
         await page.waitFor(3000)

         const results = await attr(
            page,
            '.section__body table tbody > tr > td',
            'innerText'
         )
         const resultStatus = await attr(
            page,
            '.table-pagination__left > p',
            'innerText'
         )

         expect(
            results !== 'Trống' &&
               resultStatus !== 'Không có kết quả nào trong danh sách'
         ).to.be.true
      })

      it('Should refresh when click the `Refresh` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const refreshButton = await page.waitFor('.button:nth-child(1)')
         await refreshButton.click()
         await page.waitFor(3000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Quản lý khách hàng')
      })

      it('Should show the exports reports dialog when click the `Export reports` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const exportReportButton = await page.waitFor('.button:nth-child(3)')
         await exportReportButton.click()

         const dialog = await page.waitFor('.popup-wrapper')

         expect(dialog).to.not.be.null
      })
   })
})
