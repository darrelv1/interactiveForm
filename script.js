//Focus -> name input field
//document.querySelector('input [type="text"]').focus()
const otherField = document.getElementById('other-job-role')
otherField.style.display = "none";

const jobRoleDrop = document.querySelector("select[name='user-title']")


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
   }
})
//Color Selector
const colorOption = document.querySelector("#color")
colorOption.disabled = true;

//Design Selector
const designOption = document.querySelector("#design")

//handler for the proper match of Design vs. Color
function handleColorOpt (){
   colorOption.disabled = false
   for (let ele of colorOption){
      const attr = ele.getAttribute("data-theme");
      if (attr === designOption.value){
         ele.removeAttribute("hidden")
      } else {
         // Revert back to main selection
         colorOption.value = "Select a design theme above"
         ele.setAttribute("hidden", true)
      }
   }
   }

designOption.addEventListener('change', handleColorOpt )

const checkboxes = document.querySelectorAll("fieldset [type='checkbox']")
const registerField =document.querySelector("fieldset.activities")


let totalobj = document.getElementById("activities-cost")

registerField.addEventListener( 'change', (e )=>{

   const currele = e.target
   let total = 0;
   //Extra Credit
   temporaryFunction(currele)

   for (let i = 0; i < checkboxes.length ; ++i){
      const ele = checkboxes[i]

      if (ele.checked){

         total += parseInt(ele.getAttribute("data-cost"));
      }
      totalobj.innerHTML = `total $${total}`

   }

})

//Extra Credit
const temporaryFunction = (element) => {
   for (let i = 0; i < checkboxes.length ; ++i){
      const ele = checkboxes[i]
      const eleName = ele.getAttribute("name");
      const eleDate = ele.getAttribute("data-day-and-time");
      const elementName = element.getAttribute("name");
      const elementDate = element.getAttribute("data-day-and-time");

      if (eleDate === elementDate && eleName !== elementName && element.checked ){
         if(!ele.checked){
         ele.disabled = true;
         ele.parentElement.classList.add(".disabled")}
         else if(ele.checked){
            element.checked = false
            element.disabled = true;
            element.parentElement.classList.add(".disabled")}
            return true
      }  else{

         ele.disabled = false;
         ele.parentElement.classList.remove(".disabled")
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


//Payment Selection CC/Paypal/Bitcoin listner and handler
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
//List of Elements to validate

const form = document.querySelector("form")
const inputTxt = document.querySelectorAll("input ")
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');

nameInput.focus()


//Validators./
//help fun: name validator
const valid_name = (name) => {return name !== "" ? true : false}

//Validates email input
function emailValidator(emails){

   const regEx = /^[^@]+@[^@]+\.[\w]+$/i
   const result = regEx.test(emails.value)
   const regEx2 = /^[ ]*$/
   if (result) {
      validHandler(emails)
   } else {
      //extra Credit
      if(regEx2.test(emails.value) === true){
         console.log(regEx2.test(emails.value))
         emailDecorator(emails)
      } else {
         emails.nextSibling.nextSibling.textContent = "Email address must be formatted correctly"
         errorHandler(emails)
      }
   }
   return result
}
//extra Credit function facilates
function emailDecorator (obj){
   const parent = obj.parentElement;
   //parent.lastElementChild.style.display = "none";
   obj.nextSibling.nextSibling.textContent = "E-mail field cannot be left blank";
   errorHandler(obj);
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

      if(answer){
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

const namefield = document.querySelector('#name');
nameInput.addEventListener('input', createListener(nameValidator))
email.addEventListener('keyup', createListener(emailValidator))


form.addEventListener("submit", (e) => {
   nameValidator(nameInput)
   emailValidator(email)
   actRegValidator()
   creditValidator()
   const result = nameValidator(nameInput) && emailValidator(email)&& actRegValidator() && creditValidator()
   if (!result) {e.preventDefault(); console.log("Error")}
})

//Custom Listener for blur
function createListener_focus() {
   return (e) => {
      const parent = e.target.parentElement
      parent.classList.add("focus");
      console.log(parent)
   }
}

//Custom Listener for blur
function createListener_blur() {
   return (e) => {
      const parent = e.target.parentElement
      parent.classList.remove("focus");
      console.log(parent)
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
   console.log("what we want to see")
   if (result){
      validHandler(ele)
   } else {
      errorHandler(ele);
   }
   return result
}
