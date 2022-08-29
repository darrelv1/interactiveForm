//Focus -> name input field
//document.querySelector('input [type="text"]').focus()
const otherField = document.getElementById('other-job-role')
otherField.style.display = "none";

const jobRoleDrop = document.querySelector("select[name='user-title']")


jobRoleDrop.addEventListener("change",  (Event) => {
   console.log(Event.target.value === "other")

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

   for (let i = 0; i < checkboxes.length ; ++i){
      const ele = checkboxes[i]

      if (ele.checked){
         total += parseInt(ele.getAttribute("data-cost"));
      }
      totalobj.innerHTML = `total $${total}`

   }

})
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




//Validators./
//help fun: name validator
const valid_name = (name) => {return name !== "" ? true : false}

//Validates email input
function emailValidator(emails){
   const regEx = /^[^@]+@[^@]+\.[\w]+$/
   return regEx.test(emails.value);
}

//Validates name input
function nameValidator(name){
   const regEx = /^[a-zA-Z]+$/
   //console.log(regEx.test(name.value))
   return regEx.test(name.value)

//^[a-zA-Z]+ ?([a-zA-Z]+)?$
}

//function actRegValidator(){ totalobj > 0 ? console.log('true') : console.log(tot)}
//Validates if at least one of the register for activities section is checked off
function actRegValidator(){
   let i = 0;
   while (i < checkboxes.length) {

      const ele = checkboxes[i]
      if (ele.checked){
         return true
      }
      i += 1;
   }
   return false
}

//test if CCnumber has 13-16 digits, cvv has 3 and zip has 5. then returns if it was true or not
function creditValidator(){
   if (ccOption.selected) {
      // Regex for Credit Card Number
      const cc_regEx = /^[\d]{13,16}$/
      const zip_regEx = /^[\d]{5}$/
      const cvv_regEx = /^[\d]{3}$/

      const ccNum = document.getElementById("cc-num").value
      const zip = document.getElementById("zip").value
      const cvv = document.getElementById("cvv").value

      const result =  (cc_regEx.test(ccNum) && zip_regEx.test(zip) && cvv_regEx.test(cvv))
      return result
   } else {
      return true
   }
}

//Generic Listener
 function createListener(validator){
      return (e) =>{
         const value = e.target
         const result = validator(value)
         console.log(`This is the listener Result: ${result}`)
         console.log(`This is the event value: ${e.target.value}`)
      }
 }

const namefield = document.querySelector('#name');
nameInput.addEventListener('input', createListener(nameValidator))
email.addEventListener('input', createListener(emailValidator))


form.addEventListener("submit", (e) => {
   const result = valid_name(namefield) && nameValidator(nameInput) && actRegValidator() && creditValidator()
   if (!result) {e.preventDefault(); console.log("There is error please revise")}

})

//Custom Listener for blur
function createListener_focus() {
   return (e) => {
      const parent = e.target.parentElement
      parent.classList.add(".focus");
      console.log(parent)
   }
}

//Custom Listener for blur
function createListener_blur() {
   return (e) => {
      const parent = e.target.parentElement
      parent.classList.remove(".focus");
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
const checkboxes = document.querySelectorAll("fieldset [type='checkbox']")
focuser(checkboxes)

