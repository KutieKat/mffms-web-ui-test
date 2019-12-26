const { BACKSPACE, SELECT_ALL } = require('../constants')

const clear = async elementToClear => {
   await elementToClear.click(SELECT_ALL)
   await elementToClear.press(BACKSPACE)
}

const attr = async (page, selector, attrToGet) => {
   return await page.evaluate(
      ({ selector, attrToGet }) => {
         return document.querySelector(selector)[attrToGet]
      },
      { selector, attrToGet }
   )
}

const notAllNull = arr => {
   for (let i = 0; i < arr.length; i++) {
      if (arr[i] === null) {
         return false
      }
   }

   return true
}

const notAllEmpty = arr => {
   for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '') {
         return false
      }
   }

   return true
}

const allTrue = arr => {
   for (let i = 0; i < arr.length; i++) {
      if (arr[i] === false) {
         return false
      }
   }

   return true
}

module.exports = {
   clear,
   attr,
   notAllNull,
   notAllEmpty,
   allTrue
}
