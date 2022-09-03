//Focus -> name input field
//document.querySelector('input [type="text"]').focus()

//The "other" option element in the Job Role drop down list
const otherField = document.getElementById('other-job-role')


const namefield = document.querySelector('#name');
const jobRoleDrop = document.querySelector("select[name='user-title']")
const checkboxes = document.querySelectorAll("fieldset [type='checkbox']")
const registerField =document.querySelector("fieldset.activities")
let totalobj = document.getElementById("activities-cost")
let total = 0;
// Form Inputs
const form = document.querySelector("form")
const inputTxt = document.querySelectorAll("input ")
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');



otherField.style.display = "none";

//Handler Helper functions...

//Handler helper for error input
function errorHandler (element){
   const parent = element.parentElement;
   parent.classList.add("not-valid")
   parent.classList.remove("valid")
   parent.lastElementChild.style.display = "block"
}
//Handler helper for valid input
function validHandler (element){
   const parent = element.parentElement;
   parent.classList.remove("not-valid")
   parent.classList.add("valid")
   parent.lastElementChild.style.display = "none"
}

//decorator
function parentDecorator(ele, handler){
   const element = ele.parentElement.parentElement
   if (handler === "valid"){
      validHandler(element)
   } else if (handler === "error"){
      errorHandler(element)
   }
}



jobRoleDrop.addEventListener("change",  (Event) => {
   if(Event.currentTarget.value === "other"){

      otherField.style.display = "inline"

   } else {

      otherField.style.display = "none"

   }
})
//Color Selector
const colorOption = document.querySelector("#color")
colorOption.disabled = true;

//Design Selector
const designOption = document.querySelector("#design")

//handler for the proper match of Design vs. Color
function handleColorOpt (){
   let first = true
   colorOption.disabled = false
   for (let ele of colorOption){
      const attr = ele.getAttribute("data-theme");
      if (attr === designOption.value ){
         ele.removeAttribute("hidden");
         if (first){
            ele.selected = true;
            first = false
         }
      } else {
         // Revert back to main selection
         ele.setAttribute("hidden", true)

      }
   }
   }

designOption.addEventListener('change', handleColorOpt )



registerField.addEventListener( 'change', (e )=>{

   const targetEle = e.target

   //Extra Credit
   sameTimeBlock(targetEle)

   if (e.target.checked){
      total += parseInt(targetEle.getAttribute("data-cost"))

   } else if(!e.target.checked){
      total -= parseInt(targetEle.getAttribute("data-cost"));
   }
   totalobj.innerHTML = `total $${total}`

})

//Extra Credit
const sameTimeBlock = (triggerElement) => {

   const triggerDate = triggerElement.getAttribute("data-day-and-time");
   
   for (let i = 0; i < checkboxes.length ; ++i){

      const ele = checkboxes[i]
      const eleName = ele.getAttribute("name");
      const eleDate = ele.getAttribute("data-day-and-time");


         if (eleDate === triggerDate && ele !== triggerElement && triggerElement.checked ){
            ele.disabled = true;
            ele.parentElement.classList.add("disabled")

         } else if (ele !== triggerElement && !triggerElement.checked && eleDate === triggerDate) {
            ele.disabled = false;
            ele.parentElement.classList.remove("disabled")

         }
   }

}


//Instruction 7
//DOM Selectors for Bitcoin,PayPal and CreditCard option
const paypalDiv = document.querySelector("#paypal");
const bitcoinDiv = document.querySelector("#bitcoin");
const creditCardDiv = document.querySelector("#credit-card");



paypalDiv.setAttribute("hidden", true);
bitcoinDiv.setAttribute("hidden", true);


//Credit Card Option Selected
const ccOption = document.querySelector("div select option[value='credit-card']");
ccOption.selected = true;


//Payment Selection CC/Paypal/Bitcoin listener and handler
const paymentSelection = document.getElementById("payment")


paymentSelection.addEventListener("change", (e) =>{


   for (let i = 0; i < paymentSelection.length; i++ ){

      let ele = paymentSelection[i];
      const id = ele.value;
      const curr = document.getElementById(`${id}`)


      if ( !ele.selected && curr !== null ) {
         if ( !curr.getAttribute("hidden"))
            curr.setAttribute("hidden", true)
      } else if (curr !== null){
         curr.removeAttribute("hidden")
      }

   }
})



//Form Validation




nameInput.focus()


//Validators./
//help fun: name validator
const valid_name = (name) => {return name !== "" ? true : false}

//Validates email input
function emailValidator(emails){

   const regEx = /^[^@]+@[^@]+\.[\w]+$/i.test(emails.value)
   const regEx2 = /^[ ]*$/.test(emails.value)

   if (regEx) {
      validHandler(emails)
   } else {
      //Extra Credit
      if(regEx2){
         emails.nextSibling.nextSibling.textContent = "E-mail field cannot be left blank";
      } else {
         emails.nextSibling.nextSibling.textContent = "Email address must be formatted correctly"
      }
      errorHandler(emails)
   }
   return regEx
}

//Validates name input
function nameValidator(name){
   const regEx = /^[a-zA-Z]+$/
   const result = regEx.test(name.value)
   if (result) {
      validHandler(name)
   } else {
      errorHandler(name)
   }
   return result ;

//^[a-zA-Z]+ ?([a-zA-Z]+)?$
}

//function actRegValidator(){ totalobj > 0 ? console.log('true') : console.log(tot)}
//Validates if at least one of the register for activities section is checked off
function actRegValidator(){
   let i = 0;
   let valid = false
   while (i < checkboxes.length) {

      const ele = checkboxes[i]
      if (ele.checked){
         parentDecorator(ele, "valid")
         valid = true
         return valid
      } else {
         parentDecorator(ele, "error")
         valid = false
      }
      i += 1;
   }
   return valid
}


//test if CCnumber has 13-16 digits, cvv has 3 and zip has 5. then returns if it was true or not
function creditValidator(){
   if (ccOption.selected) {
      // Regex for Credit Card Number
      const cc_regEx = /^[\d]{13,16}$/
      const zip_regEx = /^[\d]{5}$/
      const cvv_regEx = /^[\d]{3}$/

      const ccNum = regexhandler(document.getElementById("cc-num"),cc_regEx);
      const zip = regexhandler(document.getElementById("zip"),zip_regEx);
      const cvv = regexhandler(document.getElementById("cvv"),cvv_regEx);

      const answer = ccNum && zip && cvv;

      if (answer) {
         return true
      } else {
         return false
      }
   } else {
      return true
   }
}

//Generic Listener
 function createListener(validator){
      return (e) =>{
         const value = e.target
         const result = validator(value)
      }
 }


nameInput.addEventListener('input', createListener(nameValidator))
email.addEventListener('keyup', createListener(emailValidator))


form.addEventListener("submit", (e) => {
   nameValidator(nameInput)
   emailValidator(email)
   actRegValidator()
   creditValidator()

   const result = nameValidator(nameInput) && emailValidator(email) && actRegValidator() && creditValidator()

   if (!result) {
      e.preventDefault();
   }
})

//Custom Listener for blur
function createListener_focus() {
   return (e) => {
      const parent = e.target.parentElement
      parent.classList.add("focus");
   }
}

//Custom Listener for blur
function createListener_blur() {
   return (e) => {
      const parent = e.target.parentElement
      parent.classList.remove("focus");
   }
}

//Loops over the collection input checkboxes in the Register for Activites fieldset and applies listeners to each checkbox
function focuser (collections){
   for (let i =0; i < collections.length; i++){
      const ele = collections[i]
      ele.addEventListener("focus",createListener_focus())
      ele.addEventListener("blur",createListener_blur())

   }
}

focuser(checkboxes)
//helper function to both errorhandler and validhandler
function regexhandler (ele, regEx){
   const result = regEx.test(ele.value)

   if (result){
      validHandler(ele)
   } else {
      errorHandler(ele);
   }
   return result
}
