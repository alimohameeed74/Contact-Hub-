// Define Main Variables
// var contactPhotoURL= document.
var contactfullName=document.getElementById('fullName');
var contactphoneNumber=document.getElementById('phoneNumber');
var contactemailAddress=document.getElementById('emailAddress');
var contactAddress=document.getElementById('Address');
var contactgroup=document.getElementById('group');
var contactnotes=document.getElementById('notes');
var noContacts=document.getElementById('no-contacts');
var savedCards= document.getElementById('saved-cards');
var hasFavorites=document.getElementById('has-favorites');
var noFavorites=document.getElementById('no-favorites');
var favoriteCheckBox= document.getElementById('favorite-checkbox');
var hasEmergency=document.getElementById('has-emergency');
var noEmergency=document.getElementById('no-emergency');
var emergencyCheckBox= document.getElementById('emergency-checkbox');
var emeContacts=document.getElementById('eme-contacts');
var favContacts=document.getElementById('fav-contacts');
var totalContacts=document.getElementById('total-contacts');
var nOfContacts=document.getElementById('numOfContacts');
var totalContactsBlackBox='';
var favContactsBlackBox='';
var emeContactsBlackBox='';
var contacts=[];
var favcontacts=[];
var emecontacts=[];
var infoNumbers={
    totalContacts:0,
    favContacts:0,
    emeContacts:0,
};




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
        isFav:  favoriteCheckBox.checked,
        isEme:  emergencyCheckBox.checked,
    }
    contacts.push(newContact);
    favcontacts.push(newContact);
    emecontacts.push(newContact);
    window.alert(`the contact ${newContact.fullName} added sucessfully`);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    diplayContacts(contacts);
    diplayFavContacts(contacts);
    diplayEmeContacts(contacts);
    editInfo(infoNumbers,contacts);
    clearForm();
    // console.log(contacts)




    
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


function removeContact(cID){
  contacts.splice(cID,1);
  localStorage.setItem('contacts',JSON.stringify(contacts));
  // console.log(contacts);
  diplayContacts(contacts);
  diplayFavContacts(contacts);
  diplayEmeContacts(contacts);
  editInfo(infoNumbers,contacts);
  
}


function diplayContacts(myList){
    totalContactsBlackBox='';
    // console.log(myList.length)
    if (myList.length===0){
        noContacts.classList.remove('d-none');
        savedCards.classList.add('d-none');
    }
    else{
        noContacts.classList.add('d-none');
        savedCards.classList.remove('d-none');
        for(var i=0;i<myList.length;i++){
            totalContactsBlackBox+=`
            <div class="col-sm-6">
                  <div
                    class="contact-card bg-white rounded-4 d-flex justify-content-start align-items-start flex-column"
                  >
                    <div class="mb-3 d-flex">
                      <span
                        class="icon position-relative d-flex justify-content-center align-items-center text-white me-3 fw-bold"
                        >
                        <i class='fa-solid text-white fa-star d-${(myList[i].isFav) ? 'flex':'none'} justify-content-center align-items-center'></i>
                        A
                        <i class='fa-solid text-white fa-heart-pulse d-${(myList[i].isEme) ? 'flex':'none'} justify-content-center align-items-center'></i>
                      </span
                      >
                      <div class="d-flex flex-column justify-content-center">
                        <h2 class="contact-name fw-semibold">${myList[i].fullName}</h2>
                        <p
                          class="contact-number mb-0 fw-normal d-flex align-items-center"
                        >
                          <i
                            class="fa-solid rounded-2 fa-phone icon2 d-flex justify-content-center align-items-center me-2"
                          ></i>
                          ${myList[i].phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div class="mb-3 d-flex align-items-center">
                      <i
                        class="fa-solid rounded-2 fa-envelope icon2 d-flex justify-content-center align-items-center me-2"
                      ></i>
                      <span class="icon2-des fw-normal">
                        ${myList[i].emailAddress}
                      </span>
                    </div>
                    <div class="mb-3 d-flex align-items-center">
                      <i
                        class="fa-solid rounded-2 fa-location-dot icon2 d-flex justify-content-center align-items-center me-2"
                      ></i>
                      <span class="icon2-des fw-normal"> ${myList[i].Address} </span>
                    </div>
                    <div
                      class="mb-3 d-flex align-items-center justify-content-start"
                    >
                      <span class="group-type ${myList[i].group} rounded-3 p-2 me-2 fw-normal">
                        ${myList[i].group}
                      </span>
                      <span class="rounded-3 d-${(myList[i].isEme) ? 'flex':'none'} p-2 emergency-entered">
                        <i
                          class="fa-solid fa-heart-pulse d-flex justify-content-center align-items-center me-2"
                        ></i>
                        <span class="emergency-choosed">Emergency</span>
                      </span>
                    </div>
                    <div
                      class="contact-card-footer py-2 d-flex justify-content-between w-100"
                    >
                      <div class="d-flex">
                        <i
                          class="fa-solid rounded-2 fa-phone icon2 d-flex justify-content-center align-items-center me-2"
                        ></i>
                        <i
                          class="fa-solid rounded-2 fa-envelope icon2 d-flex justify-content-center align-items-center me-2"
                        ></i>
                      </div>
                      <div class="d-flex">
                        <i
                          class="fa-solid rounded-2 fa-star icon2 d-flex justify-content-center align-items-center me-2"
                        ></i>
                        <i
                          class="fa-solid rounded-2 fa-heart-pulse icon2 d-flex justify-content-center align-items-center me-2"
                        ></i>
                        <i
                          class="fa-solid rounded-2 fa-pen icon2 d-flex justify-content-center align-items-center me-2"
                        ></i>
                        <button onclick='removeContact(${i});' style='background-color:transparent' class="d-flex justify-content-center align-items-center p-0 border-0 rounded-2">
                        <i class="fa-solid rounded-2 fa-trash icon2 d-flex justify-content-center align-items-center"></i></button>
                      </div>
                    </div>
                  </div>
                </div>`;
        }
    }
    savedCards.innerHTML=totalContactsBlackBox;
    nOfContacts.innerHTML=myList.length;
}

function diplayFavContacts(myList){
  favContactsBlackBox='';
  // console.log(myList.length)
    var filteredArray=[];
    for (var i =0;i<myList.length;i++){
      if(myList[i].isFav){
        filteredArray.push(myList[i]);
      }
    }
    if (filteredArray.length===0){
        noFavorites.classList.remove('d-none');
        hasFavorites.classList.add('d-none');
        document.getElementById('has-favorites-c').classList.add('d-none')
    }
    else{
        noFavorites.classList.add('d-none');
        hasFavorites.classList.remove('d-none');
        document.getElementById('has-favorites-c').classList.remove('d-none')

        for(var i=0;i<filteredArray.length;i++){
            favContactsBlackBox+=`<div class="col-sm-6 col-xl-12">
             <div
                 class="favorite-item rounded-3 px-1 py-2 d-flex justify-content-start align-items-center"
             >
                 <span
                 class="icon d-flex justify-content-center align-items-center text-white me-2 fw-bold"
                 >A</span
                 >
                 <div>
                 <h4 class="fw-semibold name mb-0">${filteredArray[i].fullName}</h4>
                 <p class="fw-normal des mb-0">${filteredArray[i].phoneNumber}</p>
                 </div>
                 <i
                 class="fa-solid rounded-3 fa-phone ms-auto d-flex justify-content-center align-items-center"
                 ></i>
             </div>
             </div>`;
        }
    }
    hasFavorites.innerHTML=favContactsBlackBox;
}

function diplayEmeContacts(myList){
    emeContactsBlackBox='';
    // console.log(myList.length)
    var filteredArray=[];
    for (var i =0;i<myList.length;i++){
      if(myList[i].isEme){
        filteredArray.push(myList[i]);
      }
    }
    if (filteredArray.length===0){
        noEmergency.classList.remove('d-none');
        hasEmergency.classList.add('d-none');
        document.getElementById('has-emergency-c').classList.add('d-none');
    }
    else{
        noEmergency.classList.add('d-none');
        hasEmergency.classList.remove('d-none');
        document.getElementById('has-emergency-c').classList.remove('d-none');

        for(var i=0;i<filteredArray.length;i++){
            emeContactsBlackBox+=`<div class="col-sm-6 col-xl-12">
                    <div
                      class="emergency-item rounded-3 px-1 py-2 d-flex justify-content-start align-items-center"
                    >
                      <span
                        class="icon d-flex justify-content-center align-items-center text-white me-2 fw-bold"
                        >A</span
                      >
                      <div>
                        <h4 class="fw-semibold name mb-0">${filteredArray[i].fullName}</h4>
                        <p class="fw-normal des mb-0">${filteredArray[i].phoneNumber}</p>
                      </div>
                      <i
                        class="fa-solid rounded-3 fa-phone ms-auto d-flex justify-content-center align-items-center"
                      ></i>
                    </div>
                  </div>`;
        }
    }
    hasEmergency.innerHTML=emeContactsBlackBox;
}

function clearForm(){
    contactfullName.value='';
    contactphoneNumber.value=''; 
    contactemailAddress.value=''; 
    contactAddress.value=''; 
    contactgroup.value='Friends';
    contactnotes.value='';
    favoriteCheckBox.checked=false;
    emergencyCheckBox.checked=false;
}


function editInfo(info,arr){
  var fav=0,eme=0;
  info.totalContacts=arr.length;
  for (var i=0;i<arr.length;i++){
    if(arr[i].isFav){
      fav++;
    }
    if(arr[i].isEme){
      eme++;
    }
  }
  info.favContacts=fav;
  info.emeContacts=eme;
  putInfo(info);
}




function putInfo(info){
    emeContacts.innerHTML=info.emeContacts;
    totalContacts.innerHTML=info.totalContacts;
    favContacts.innerHTML=info.favContacts;
}


function init(){
    if (localStorage.getItem('contacts')){
        contacts=JSON.parse(localStorage.getItem('contacts'));
    }
    diplayContacts(contacts);
    diplayFavContacts(contacts);
    diplayEmeContacts(contacts);
    editInfo(infoNumbers,contacts);

    // console.log(contacts);
}

// Start Main Logic
init();
