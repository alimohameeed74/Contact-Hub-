// Define Main Variables
// var userPhotoURL= document.
var userfullName=document.getElementById('fullName');
var userphoneNumber=document.getElementById('phoneNumber');
var useremailAddress=document.getElementById('emailAddress');
var userAddress=document.getElementById('Address');
var usergroup=document.getElementById('group');
var usernotes=document.getElementById('notes');
var userFav=document.getElementById('favorite-checkbox');
var userEme=document.getElementById('emergency-checkbox');

var users=[];




// Define Main Functions
function addContact(){
     var newUser={
        // photoURL:'',
        fullName: userfullName.value,
        phoneNumber: userphoneNumber.value, 
        emailAddress: useremailAddress.value, 
        Address: userAddress.value, 
        group: usergroup.value,
        notes: usernotes.value,
        ifFav:  userFav.value,
        ifEme:  userEme.value,
    }
    users.push(newUser);
    window.alert(`the user ${newUser.fullName} added sucessfully`);
    localStorage.setItem('users', JSON.stringify(users));
    // diplayProducts(productArr);
    clearForm();
    console.log(users)




    
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
    userfullName.value='';
    userphoneNumber.value=''; 
    useremailAddress.value=''; 
    userAddress.value=''; 
    usergroup.value='Select a group';
    usernotes.value='';
    userFav.value='';
    userEme.value='';
}


function init(){

if (localStorage.getItem('users')){
    users=JSON.parse(localStorage.getItem('users'));
}

console.log(users);
}





// Start Main Logic
init();
