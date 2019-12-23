const { expect } = require('chai')

describe('Sign In Functionality', async () => {
   let page, usernameElem, passwordElem, signInButtonElem
   let runAfter = true
   let runBefore = true

   before(async () => {
      page = await browser.newPage()
      await page.goto('http://localhost:3000')
      await page.setViewport({ width: 1920, height: 1080 })
   })

   beforeEach(async () => {
      if (runBefore) {
         const username = '.form-group:nth-child(2) > .form-input-outline'
         const password = '.form-group:nth-child(3) > .form-input-outline'
         const signInButton = '.login-button'

         usernameElem = await page.waitFor(username, { visible: true })
         passwordElem = await page.waitFor(password, { visible: true })
         signInButtonElem = await page.waitFor(signInButton, { visible: true })
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

   after(async function() {
      await page.close()
   })

   it('Should have essential elements for the sign in functionality', async () => {
      runBefore = true
      runAfter = true

      expect(usernameElem && passwordElem && signInButtonElem).to.not.be.null
   })

   it('Should limit a maximum of 255 characters for the username field', async () => {
      runBefore = true
      runAfter = true

      const inputType = await page.evaluate(
         () =>
            document.querySelector(
               '.form-group:nth-child(2) > .form-input-outline'
            ).maxLength
      )
      expect(inputType).to.equal(255)
   })

   it('Should limit a maximum of 255 characters for the password field', async () => {
      runBefore = true
      runAfter = true

      const inputType = await page.evaluate(
         () =>
            document.querySelector(
               '.form-group:nth-child(3) > .form-input-outline'
            ).maxLength
      )
      expect(inputType).to.equal(255)
   })

   it('Should mask all characters inside the password input field with bullet signs', async () => {
      runBefore = true
      runAfter = true

      const inputType = await page.evaluate(
         () =>
            document.querySelector(
               '.form-group:nth-child(3) > .form-input-outline'
            ).type
      )
      expect(inputType.toLowerCase()).to.equal('password')
   })

   it('Should show errors when leave all the required fields blank', async () => {
      runBefore = true
      runAfter = true

      await usernameElem.type('')
      await passwordElem.type('')
      await signInButtonElem.click()
      await page.waitFor(3000)

      const errors = '.section__alert'
      errorsElem = await page.$(errors)
      expect(errorsElem).to.not.be.null
   })

   it('Should hide errors when focus on any highlighted fields', async () => {
      runBefore = true
      runAfter = true

      const errors = '.section__alert'

      await usernameElem.type('')
      await passwordElem.type('')
      await signInButtonElem.click()
      await page.waitFor(3000)

      await usernameElem.focus()
      errorsElem = await page.$(errors)
      expect(errorsElem).to.be.null
   })

   it('Should show errors when provide username field with the one that does not exist and leave password field blank', async () => {
      runBefore = true
      runAfter = true

      await usernameElem.type('admin')
      await passwordElem.type('')
      await signInButtonElem.click()
      await page.waitFor(3000)

      const errors = '.section__alert'
      errorsElem = await page.$(errors)
      expect(errorsElem).to.not.be.null
   })

   it('Should show errors when provide username field with the one that exists and leave password field blank', async () => {
      runBefore = true
      runAfter = true

      await usernameElem.type('dungnt')
      await passwordElem.type('')
      await signInButtonElem.click()
      await page.waitFor(3000)

      const errors = '.section__alert'
      errorsElem = await page.$(errors)
      expect(errorsElem).to.not.be.null
   })

   it('Should show errors when leave username field blank and provide password field with the one that does not exist', async () => {
      runBefore = true
      runAfter = true

      await usernameElem.type('')
      await passwordElem.type('a1a2a3')
      await signInButtonElem.click()
      await page.waitFor(3000)

      const errors = '.section__alert'
      errorsElem = await page.$(errors)
      expect(errorsElem).to.not.be.null
   })

   it('Should show errors when leave username field blank and provide password field with the one that exists', async () => {
      runBefore = true
      runAfter = true

      await usernameElem.type('')
      await passwordElem.type('123456')
      await signInButtonElem.click()
      await page.waitFor(3000)

      const errors = '.section__alert'
      errorsElem = await page.$(errors)
      expect(errorsElem).to.not.be.null
   })

   it('Should show errors when provide username and password fields with the ones that do not exist', async () => {
      runBefore = true
      runAfter = false

      await usernameElem.type('admin')
      await passwordElem.type('a1a2a3')
      await signInButtonElem.click()
      await page.waitFor(3000)

      const errors = '.section__alert'
      errorsElem = await page.$(errors)
      expect(errorsElem).to.be.null
   })

   it('Should show errors when provide username field with the one that does not exist and provide password field with the one that exists', async () => {
      runBefore = true
      runAfter = false

      await usernameElem.type('admin')
      await passwordElem.type('123456')
      await signInButtonElem.click()
      await page.waitFor(3000)

      const errors = '.section__alert'
      errorsElem = await page.$(errors)
      expect(errorsElem).to.be.null
   })

   it('Should show errors when provide username field with the one that exists and provide password field with the one that does not exist', async () => {
      runBefore = true
      runAfter = false

      await usernameElem.type('dungnt')
      await passwordElem.type('a1a2a3')
      await signInButtonElem.click()
      await page.waitFor(3000)

      const errors = '.section__alert'
      errorsElem = await page.$(errors)
      expect(errorsElem).to.be.null
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
