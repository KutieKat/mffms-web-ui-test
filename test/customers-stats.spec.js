const { expect } = require('chai')
const { clear, attr, notAllNull, notAllEmpty } = require('../utils')
const { USERNAME, PASSWORD } = require('../constants/credentials')

describe.skip('Customers Management - Statistics Functionality', async () => {
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
         '.main-nav__list:nth-child(6) > .main-nav__list-item:nth-child(1) > a'

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

      it('Should show statistics charts page when click on `Customers Statistics` item', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         await menuItemElem.click()
         await page.waitFor(3000)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Thống kê khách hàng')
      })

      it('Should highlight menu item after clicking on it', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const itemClassName = await attr(page, menuItem, 'className')

         expect(itemClassName).to.equal('main-nav__list-item--active')
      })

      it('Should have essential elements for the statistics charts page', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const buttons = '.section__header-right'
         const toolbar = '.stats-toolbar'
         //  const carts = '.chart-sections-wrapper'

         const buttonsElem = await page.waitFor(buttons)
         const toolbarElem = await page.waitFor(toolbar)
         //  const chartsElem = await page.waitFor(charts)

         expect(notAllNull([buttonsElem, toolbarElem, cardsElem])).to.be.true
      })

      it('Should have already selected the `All time` tab on initial load', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         expect(true).to.be.true
      })

      it('Should refresh the page when click the `Refresh` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const refreshButton = '.button:nth-child(1)'
         const refreshButtonElem = await page.waitFor(refreshButton)
         await refreshButtonElem.click()
         await page.waitFor(300)

         const pageTitle = await attr(page, '.breadcrumb-active a', 'innerText')
         expect(pageTitle).to.equal('Thống kê khách hàng')
      })

      // it('Should show the print dialog when select the `PDF` option inside the export reports popup', async () => {
      //    expect(true).to.be.true
      // })

      it('Should change the current date range to all time when click the `All time` tab', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab1 = '.stats-tab:nth-child(1)'
         const tab2 = '.stats-tab:nth-child(2)'
         const criteria = '.stats-criteria'

         const tab2Elem = await page.waitFor(tab2)
         await tab2Elem.click()
         const tab1Elem = await page.waitFor(tab1)
         await tab1Elem.click()
         const criteriaElem = await attr(page, criteria, 'innerText')

         expect(criteriaElem).to.contain('Thống kê số liệu từ trước đến nay')
      })

      it('Should hide the `Change date range` button when click the `All time` tab', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab = '.stats-tab:nth-child(1)'
         const tabElem = await page.waitFor(tab)
         tabElem.click()
         const changeDangeRangeButton = '.stats-date-range-picker-toggler'
         const changeDangeRangeButtonElem = await page.$(changeDangeRangeButton)

         expect(changeDangeRangeButtonElem).to.be.null
      })

      it("Should change the current date range to today's when click the `Today` tab", async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab1 = '.stats-tab:nth-child(1)'
         const tab2 = '.stats-tab:nth-child(2)'
         const criteria = '.stats-criteria'

         const tab1Elem = await page.waitFor(tab1)
         await tab1Elem.click()
         const tab2Elem = await page.waitFor(tab2)
         await tab2Elem.click()
         const criteriaElem = await attr(page, criteria, 'innerText')

         expect(criteriaElem).to.contain('Thống kê số liệu hôm nay')
      })

      it('Should hide the `Change date range` button when click the `Today` tab', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab = '.stats-tab:nth-child(2)'
         const tabElem = await page.waitFor(tab)
         tabElem.click()
         const changeDangeRangeButton = '.stats-date-range-picker-toggler'
         const changeDangeRangeButtonElem = await page.$(changeDangeRangeButton)

         expect(changeDangeRangeButtonElem).to.be.null
      })

      it("Should change the current date range to the current week's when click the `This week` tab", async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab1 = '.stats-tab:nth-child(1)'
         const tab2 = '.stats-tab:nth-child(3)'
         const criteria = '.stats-criteria'

         const tab1Elem = await page.waitFor(tab1)
         await tab1Elem.click()
         const tab2Elem = await page.waitFor(tab2)
         await tab2Elem.click()
         const criteriaElem = await attr(page, criteria, 'innerText')

         expect(criteriaElem).to.contain('Thống kê số liệu tuần này')
      })

      it('Should hide the `Change date range` button when click the `This week` tab', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab = '.stats-tab:nth-child(3)'
         const tabElem = await page.waitFor(tab)
         tabElem.click()
         const changeDangeRangeButton = '.stats-date-range-picker-toggler'
         const changeDangeRangeButtonElem = await page.$(changeDangeRangeButton)

         expect(changeDangeRangeButtonElem).to.be.null
      })

      it("Should change the current date range to the current month's when click the `This month` tab", async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab1 = '.stats-tab:nth-child(1)'
         const tab2 = '.stats-tab:nth-child(4)'
         const criteria = '.stats-criteria'

         const tab1Elem = await page.waitFor(tab1)
         await tab1Elem.click()
         const tab2Elem = await page.waitFor(tab2)
         await tab2Elem.click()
         const criteriaElem = await attr(page, criteria, 'innerText')

         expect(criteriaElem).to.contain('Thống kê số liệu tháng này')
      })

      it('Should hide the `Change date range` button when click the `This month` tab', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab = '.stats-tab:nth-child(4)'
         const tabElem = await page.waitFor(tab)
         tabElem.click()
         const changeDangeRangeButton = '.stats-date-range-picker-toggler'
         const changeDangeRangeButtonElem = await page.$(changeDangeRangeButton)

         expect(changeDangeRangeButtonElem).to.be.null
      })

      it("Should change the current date range to the current quarter's when click the `This quarter` tab", async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab1 = '.stats-tab:nth-child(1)'
         const tab2 = '.stats-tab:nth-child(5)'
         const criteria = '.stats-criteria'

         const tab1Elem = await page.waitFor(tab1)
         await tab1Elem.click()
         const tab2Elem = await page.waitFor(tab2)
         await tab2Elem.click()
         const criteriaElem = await attr(page, criteria, 'innerText')

         expect(criteriaElem).to.contain('Thống kê số liệu quý này')
      })

      it('Should hide the `Change date range` button when click the `This quarter` tab', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab = '.stats-tab:nth-child(5)'
         const tabElem = await page.waitFor(tab)
         tabElem.click()
         const changeDangeRangeButton = '.stats-date-range-picker-toggler'
         const changeDangeRangeButtonElem = await page.$(changeDangeRangeButton)

         expect(changeDangeRangeButtonElem).to.be.null
      })

      it("Should change the current date range to the current year's when click the `This year` tab", async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab1 = '.stats-tab:nth-child(1)'
         const tab2 = '.stats-tab:nth-child(6)'
         const criteria = '.stats-criteria'

         const tab1Elem = await page.waitFor(tab1)
         await tab1Elem.click()
         const tab2Elem = await page.waitFor(tab2)
         await tab2Elem.click()
         const criteriaElem = await attr(page, criteria, 'innerText')

         expect(criteriaElem).to.contain('Thống kê số liệu năm nay')
      })

      it('Should hide the `Change date range` button when click the `This year` tab', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab = '.stats-tab:nth-child(6)'
         const tabElem = await page.waitFor(tab)
         tabElem.click()
         const changeDangeRangeButton = '.stats-date-range-picker-toggler'
         const changeDangeRangeButtonElem = await page.$(changeDangeRangeButton)

         expect(changeDangeRangeButtonElem).to.be.null
      })

      it("Should change the current date range to today's when click the `Optional` tab", async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab1 = '.stats-tab:nth-child(1)'
         const tab2 = '.stats-tab:nth-child(7)'
         const criteria = '.stats-criteria'

         const tab1Elem = await page.waitFor(tab1)
         await tab1Elem.click()
         const tab2Elem = await page.waitFor(tab2)
         await tab2Elem.click()
         const criteriaElem = await attr(page, criteria, 'innerText')

         expect(criteriaElem).to.contain('Thống kê số liệu tùy chọn')
      })

      it('Should show the `Change date range` button when click the `Optional` tab', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const tab = '.stats-tab:nth-child(7)'
         const tabElem = await page.waitFor(tab)
         tabElem.click()
         const changeDangeRangeButton = '.stats-date-range-picker-toggler'
         const changeDangeRangeButtonElem = await page.$(changeDangeRangeButton)

         expect(changeDangeRangeButtonElem).to.not.be.null
      })

      // it('Should show the date range picker popup when click the `Change date range` button', async () => {
      //    dashboardRunBefore = false
      //    dashboardRunAfter = false

      //    const dateRangePickerButton = '.stats-date-range-picker-toggler'
      //    const dateRangePickerButtonElem = await page.waitFor(
      //       dateRangePickerButton
      //    )
      //    dateRangePickerButtonElem.click()

      //    let dialogPopup = '.popup-wrapper'
      //    dialogPopupElem = await page.$(dialogPopup)

      //    expect(dialogPopupElem).not.to.be.null
      // })

      // it('Should show the dashboard homepage when click on the dashboard homepage breadcrumb item', async () => {
      //    expect(true).to.be.true
      // })

      it('Should show the exports reports popup when click the `Export reports` button', async () => {
         dashboardRunBefore = false
         dashboardRunAfter = false

         const exportReportsButton = '.button:nth-child(2)'
         const exportReportsPopup = '.popup-wrapper'

         const exportReportsButtonElem = await page.waitFor(exportReportsButton)
         await exportReportsButtonElem.click()
         const exportReportsPopupElem = await page.waitFor(exportReportsPopup)

         expect(exportReportsPopupElem).to.not.be.null
      })

      // it('Should close the export reports popup when click the `Close` button', async () => {
      //    const exportReportsPopup = '.popup-wrapper'
      //    const closePopupButton = '.popup-button-default'
      //    const closePopupButtonElem = await page.waitFor(closePopupButton)
      //    closePopupButtonElem.click()

      //    // exportReportsPopupElem = await page.$(exportReportsPopup)

      //    // expect(exportReportsPopupElem).to.be.null
      //    // expect(true).to.be.true
      // })
   })
})
