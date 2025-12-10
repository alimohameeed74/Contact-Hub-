// Define Main Variables
// var contactPhotoURL= document.
var contactfullName=document.getElementById('fullName');
var contactphoneNumber=document.getElementById('phoneNumber');
var contactemailAddress=document.getElementById('emailAddress');
var contactAddress=document.getElementById('Address');
var contactgroup=document.getElementById('group');
var contactnotes=document.getElementById('notes');
var contactFav=document.getElementById('favorite-checkbox');
var contactEme=document.getElementById('emergency-checkbox');

var contacts=[];




// Define Main Functions
function addContact(){
     var newContact={
        // photoURL:'',
        fullName: contactfullName.value,
        phoneNumber: contactphoneNumber.value, 
        emailAddress: contactemailAddress.value, 
        Address: contactAddress.value, 
        group: contactgroup.value,
        notes: contactnotes.value,
        ifFav:  contactFav.value,
        ifEme:  contactEme.value,
    }
    contacts.push(newContact);
    window.alert(`the contact ${newContact.fullName} added sucessfully`);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    // diplayProducts(productArr);
    clearForm();
    console.log(contacts)




    
// function addProduct(){
//   if(validateInput(productName)
//   && validateInput(productCat)
//   && validateInput(productDes)
//   && validateInput(productPrice)){
//     addBtn.removeAttribute('disabled');
    

//   }
//   else{
//     addBtn.setAttribute('disabled', true);

//   }



   
// }

}

function clearForm(){
    contactfullName.value='';
    contactphoneNumber.value=''; 
    contactemailAddress.value=''; 
    contactAddress.value=''; 
    contactgroup.value='Select a group';
    contactnotes.value='';
    contactFav.value='';
    contactEme.value='';
}


function init(){

if (localStorage.getItem('contacts')){
    contacts=JSON.parse(localStorage.getItem('contacts'));
}

console.log(contacts);
}





// Start Main Logic
init();
