const { expect } = require('chai')

describe('Profile Menu Functionality', async () => {
   let page

   before(async () => {
      page = await browser.newPage()
      await page.goto('http://localhost:3000')
      await page.setViewport({ width: 640, height: 480 })
   })

   after(async function() {
      await page.close()
   })

   describe('Sign In Page', async => {
      let usernameElem, passwordElem, signInButtonElem
      let runAfter = true
      let runBefore = true

      beforeEach(async () => {
         if (runBefore) {
            const username = '.form-group:nth-child(2) > .form-input-outline'
            const password = '.form-group:nth-child(3) > .form-input-outline'
            const signInButton = '.login-button'

            usernameElem = await page.waitFor(username, { visible: true })
            passwordElem = await page.waitFor(password, { visible: true })
            signInButtonElem = await page.waitFor(signInButton, {
               visible: true
            })
         }
      })

      afterEach(async () => {
         if (runAfter) {
            await usernameElem.focus()
            await usernameElem.click({ clickCount: 3 })
            await usernameElem.press('Backspace')
            await passwordElem.click({ clickCount: 3 })
            await passwordElem.press('Backspace')
         }
      })

      it('Should show homepage when provide username and password fields with the ones that exist', async () => {
         runBefore = true
         runAfter = false

         await usernameElem.type('dungnt')
         await passwordElem.type('123456')
         await signInButtonElem.click()
         await page.waitFor(3000)

         const pageTitleElem = await page.evaluate(
            () => document.querySelector('.main-header__title').innerText
         )
         expect(pageTitleElem).to.equal('MFFMS')
      })
   })

   describe('Homepage', async () => {
      let updateInformationItemElem, changePasswordItemElem, signOutItemElem

      before(async () => {
         const updateInformationItem =
            '.main-nav__list:nth-child(1) > .main-nav__list-item:nth-child(1) > a'
         const changePasswordItem =
            '.main-nav__list:nth-child(1) > .main-nav__list-item:nth-child(2) > a'
         const signOutItem =
            '.main-nav__list:nth-child(1) > .main-nav__list-item:nth-child(3) > a'

         await page.hover('.main-header__right')
         updateInformationItemElem = await page.$(updateInformationItem)
         changePasswordItemElem = await page.$(changePasswordItem)
         signOutItemElem = await page.$(signOutItem)
      })

      it('Should show update user information page when click on `Update information` item', async () => {
         await updateInformationItemElem.click()
         await page.waitFor(3000)

         const pageTitle = await page.evaluate(
            () => document.querySelector('.breadcrumb-active a').innerText
         )
         expect(pageTitle).to.equal('Cập nhật thông tin tài khoản')
      })

      it('Should show change password page when click on `Change password` item', async () => {
         await changePasswordItemElem.click()
         await page.waitFor(3000)

         const pageTitle = await page.evaluate(
            () => document.querySelector('.breadcrumb-active a').innerText
         )
         expect(pageTitle).to.equal('Thay đổi mật khẩu')
      })

      it('Should show sign in page when click on `Sign out` item', async () => {
         await signOutItemElem.click()
         await page.waitFor(3000)

         const pageTitle = await page.evaluate(
            () => document.querySelector('.login-form__title').innerText
         )
         expect(pageTitle).to.equal('MFFMS')
      })
   })
})
