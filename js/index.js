"use strict"
// Define Main Variables
let uploadedPhotoURL='';
let contactfullName=document.getElementById('fullName');
let editedcontactfullName=document.getElementById('editedfullName');
let contactphoneNumber=document.getElementById('phoneNumber');
let editedcontactphoneNumber=document.getElementById('editedphoneNumber');
let contactemailAddress=document.getElementById('emailAddress');
let editedcontactemailAddress=document.getElementById('editedemailAddress');
let contactAddress=document.getElementById('Address');
let editedcontactAddress=document.getElementById('editedAddress');
let contactgroup=document.getElementById('group');
let editedcontactgroup=document.getElementById('editedgroup');
let contactnotes=document.getElementById('notes');
let editedcontactnotes=document.getElementById('editednotes');
let noContacts=document.getElementById('no-contacts');
let savedCards= document.getElementById('saved-cards');
let hasFavorites=document.getElementById('has-favorites');
let noFavorites=document.getElementById('no-favorites');
let favoriteCheckBox= document.getElementById('favorite-checkbox');
let editedfavoriteCheckBox= document.getElementById('editedfavorite-checkbox');
let hasEmergency=document.getElementById('has-emergency');
let noEmergency=document.getElementById('no-emergency');
let emergencyCheckBox= document.getElementById('emergency-checkbox');
let editedemergencyCheckBox= document.getElementById('editedemergency-checkbox');
let emeContacts=document.getElementById('eme-contacts');
let favContacts=document.getElementById('fav-contacts');
let totalContacts=document.getElementById('total-contacts');
let nOfContacts=document.getElementById('numOfContacts');
let confirmButton= document.getElementById('confirmButton');
let saveButton= document.getElementById('saveButton');
let searchInput= document.getElementById('searchInput');
let exampleModalLabel=document.getElementById('exampleModalLabel');
let searchWarning=document.getElementById('searchWarning');
let searchNotWarning=document.getElementById('searchNotWarning');
let totalContactsBlackBox='';
let totalSearchedContactsBlackBox='';
let favContactsBlackBox='';
let emeContactsBlackBox='';
const gradients = [
  "linear-gradient(to right, #F91660, #EE006D)",
  "linear-gradient(to right, #00BFFF, #1E90FF)",
  "linear-gradient(to right, #32CD32, #228B22)",
  "linear-gradient(to right, #FFD700, #FFA500)",
  "linear-gradient(to right, #FF4500, #FF6347)",
  "linear-gradient(to right, #8A2BE2, #9400D3)",
  "linear-gradient(to right, #00FA9A, #3CB371)",
  "linear-gradient(to right, #FF69B4, #FF1493)",
  "linear-gradient(to right, #1E90FF, #4169E1)",
  "linear-gradient(to right, #FF8C00, #FF7F50)"
];
let randomIndex=0;
let contacts=[];
let favcontacts=[];
let emecontacts=[];
let infoNumbers={
    totalContacts:0,
    favContacts:0,
    emeContacts:0,
};




// Define Main Functions

// 1) Validate Input
function validatedInput(input,number){
  let isValid;
  let validationObject;
  if(number==1){
    validationObject={
      fullName: /^[A-Za-z]{2,50}(?:\s[A-Za-z]{2,50}){0,3}$/,
      phoneNumber: /^01[0125][0-9]{8}$/,
      emailAddress: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      Address: /^[A-Za-z0-9\s,.-]{5,}$/,
    }
    
  }
  else if (number==2){
    validationObject={
      editedfullName: /^[A-Za-z]{2,50}(?:\s[A-Za-z]{2,50}){0,3}$/,
      editedphoneNumber: /^01[0125][0-9]{8}$/,
      editedemailAddress: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      editedAddress: /^[A-Za-z0-9\s,.-]{5,}$/,
    }
  }
  isValid=validationObject[input.getAttribute('id')].test(input.value);
    
    if(isValid){
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
      input.nextElementSibling.classList.add('d-none');
    }
    else{
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.nextElementSibling.classList.remove('d-none');
    }
  return isValid;
}


// 2) Add New Contact
function addContact(){
  // console.log(uploadedPhotoURL)
   if(validatedInput(contactfullName,1)
      &&
      validatedInput(contactAddress,1)
      &&
      validatedInput(contactemailAddress,1)
      &&
      validatedInput(contactphoneNumber,1)){
        if (checkIfDuplicated(contactphoneNumber.value)){
          Swal.fire({
            title: "Duplicate Phone Number!",
            text: `A contact with this phone number already exists: ${findFullName(contactphoneNumber.value)}.`,
            icon: "error",
            confirmButtonColor: "#d33",
            showConfirmButton: true,
    });
        }
        else{
            let newContact={
            photoURL:uploadedPhotoURL,
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
            localStorage.setItem('contacts', JSON.stringify(contacts));
            Swal.fire({
              title: "Added!",
              text: "Contact has been added successfully.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            diplayContacts(contacts);
            diplayFavContacts(contacts);
            diplayEmeContacts(contacts);
            editInfo(infoNumbers,contacts);
            // console.log(contacts)

        }


      }
      else{
        Swal.fire({
      title: "Invalid Operation!",
      text: "Unable to add the contact, please check the required fields.",
      icon: "error",
      confirmButtonColor: "#d33",
      showConfirmButton: true,
    });
      }

    clearForm();


}
function addToEme(cID){
    contacts[cID].isEme=!contacts[cID].isEme;
    localStorage.setItem('contacts', JSON.stringify(contacts));
    diplayContacts(contacts);
    diplayEmeContacts(contacts);
    editInfo(infoNumbers,contacts);
 

}
function addToFav(cID){
    contacts[cID].isFav=!contacts[cID].isFav;
    localStorage.setItem('contacts', JSON.stringify(contacts));
    diplayContacts(contacts);
    diplayFavContacts(contacts);
    editInfo(infoNumbers,contacts);
 

}


// 3) Delete Contact
function removeContact(cID){
  contacts.splice(cID,1);
  localStorage.setItem('contacts',JSON.stringify(contacts));
  // console.log(contacts);
  diplayContacts(contacts);
  diplayFavContacts(contacts);
  diplayEmeContacts(contacts);
  editInfo(infoNumbers,contacts);
}
function confirmDelete(cID){
  Swal.fire({
  title: "Delete Contact?",
  text: `Are you sure you want to delete ${contacts[cID].fullName}? This action cannot be undone.`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#198754",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Contact has been deleted.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
    removeContact(cID);
  }
});
}


// 4) Edit Contact
function editContact(cID){
  // console.log(cID)
    editedcontactfullName.value=contacts[cID].fullName;
    editedcontactphoneNumber.value=contacts[cID].phoneNumber;
    editedcontactemailAddress.value=contacts[cID].emailAddress;
    editedcontactAddress.value=contacts[cID].Address;
    editedcontactgroup.value=contacts[cID].group;
    editedcontactnotes.value=contacts[cID].notes;
    editedfavoriteCheckBox.checked=contacts[cID].isFav;
    editedemergencyCheckBox.checked=contacts[cID].isEme;
    confirmButton.editedId=cID;
}
function confirmUpdate(){
  if(validatedInput(editedcontactfullName,2)
      &&
      validatedInput(editedcontactphoneNumber,2)
      &&
      validatedInput(editedcontactemailAddress,2)
      &&
      validatedInput(editedcontactAddress,2)){
        
          contacts[+confirmButton.editedId].fullName=editedcontactfullName.value;
          contacts[+confirmButton.editedId].phoneNumber=editedcontactphoneNumber.value;
          contacts[+confirmButton.editedId].emailAddress=editedcontactemailAddress.value;
          contacts[+confirmButton.editedId].Address=editedcontactAddress.value;
          contacts[+confirmButton.editedId].group=editedcontactgroup.value;
          contacts[+confirmButton.editedId].notes=editedcontactnotes.value;
          contacts[+confirmButton.editedId].isFav=editedfavoriteCheckBox.checked;
          contacts[+confirmButton.editedId].isEme=editedemergencyCheckBox.checked;
          localStorage.setItem('contacts',JSON.stringify(contacts));
          Swal.fire({
        title: "Updated!",
        text: "Contact has been updated successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
        diplayContacts(contacts);
        diplayFavContacts(contacts);
        diplayEmeContacts(contacts);
        editInfo(infoNumbers,contacts);
        }

        
      else{
        Swal.fire({
      title: "Invalid Operation!",
      text: "Unable to update the contact, please check the required fields.",
      icon: "error",
      confirmButtonColor: "#d33",
      showConfirmButton: true,
    });
  
  }
    clearForm();


}
function editInfo(info,arr){
  let fav=0,eme=0;
  info.totalContacts=arr.length;
  for (let i=0;i<arr.length;i++){
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


// 5) Search about Any Contact
function searchByName(input){
  let matchedArr=[];
  // console.log(input.value);
  if (input.value=='')
    diplayContacts(contacts);
  else{
    for (let i=0;i<contacts.length;i++){
      if(contacts[i].fullName.toLowerCase().includes(input.value.toLowerCase())
      ||  contacts[i].phoneNumber.includes(input.value)
      ||   contacts[i].emailAddress.toLowerCase().includes(input.value.toLowerCase())){
        matchedArr.push(contacts[i])
      }
    }
    diplaySearchedContacts(matchedArr);
  }
}


// 6) Clear Forms
function clearForm() {
    uploadedPhotoURL = '';
    
    contactfullName.value = '';
    contactfullName.classList.remove('is-valid', 'is-invalid');
    contactfullName.nextElementSibling.classList.add('d-none');

    contactphoneNumber.value = '';
    contactphoneNumber.classList.remove('is-valid', 'is-invalid');
    contactphoneNumber.nextElementSibling.classList.add('d-none');

    contactemailAddress.value = '';
    contactemailAddress.classList.remove('is-valid', 'is-invalid');
    contactemailAddress.nextElementSibling.classList.add('d-none');

    contactAddress.value = '';
    contactAddress.classList.remove('is-valid', 'is-invalid');
    contactAddress.nextElementSibling.classList.add('d-none');

    contactgroup.value = 'Friends';
    contactnotes.value = '';
    favoriteCheckBox.checked = false;
    emergencyCheckBox.checked = false;

    editedcontactfullName.value = '';
    editedcontactfullName.classList.remove('is-valid', 'is-invalid');
    editedcontactfullName.nextElementSibling.classList.add('d-none');

    editedcontactphoneNumber.value = '';
    editedcontactphoneNumber.classList.remove('is-valid', 'is-invalid');
    editedcontactphoneNumber.nextElementSibling.classList.add('d-none');

    editedcontactemailAddress.value = '';
    editedcontactemailAddress.classList.remove('is-valid', 'is-invalid');
    editedcontactemailAddress.nextElementSibling.classList.add('d-none');

    editedcontactAddress.value = '';
    editedcontactAddress.classList.remove('is-valid', 'is-invalid');
    editedcontactAddress.nextElementSibling.classList.add('d-none');

    editedcontactgroup.value = 'Friends';
    editedcontactnotes.value = '';
    editedfavoriteCheckBox.checked = false;
    editedemergencyCheckBox.checked = false;

    const img = document.getElementById("previewImage");
    const icon = document.querySelector(".profile-photo i");
    img.src = '';
    img.classList.add('d-none');
    icon.classList.remove('d-none');
}


// 7) Put Data in Their Correct Places
function putInfo(info){
    emeContacts.innerHTML=info.emeContacts;
    totalContacts.innerHTML=info.totalContacts;
    favContacts.innerHTML=info.favContacts;
}


// 8) Initalization Function
function init(){
    randomIndex=Math.floor(Math.random() * gradients.length);
    if (localStorage.getItem('contacts')){
        contacts=JSON.parse(localStorage.getItem('contacts'));
    }
    diplayContacts(contacts);
    diplayFavContacts(contacts);
    diplayEmeContacts(contacts);
    editInfo(infoNumbers,contacts);

    // console.log(contacts);
}


// 9) Check for Duplication
function checkIfDuplicated(input){
  for (let i=0;i<contacts.length;i++){
    if(contacts[i].phoneNumber === input){
        return true;
      }
  }
  return false;
}


// 10) Display Contacts to User
function diplayContacts(myList){
    totalContactsBlackBox='';
    // console.log(myList.length)
    if (myList.length===0){
        noContacts.classList.remove('d-none');
        savedCards.classList.add('d-none');
        searchWarning.classList.add('d-none');
        searchNotWarning.classList.add('d-none')
      }
      else{
        noContacts.classList.add('d-none');
        savedCards.classList.remove('d-none');
        searchNotWarning.classList.remove('d-none')
        searchWarning.classList.add('d-none');
        for(let i=0;i<myList.length;i++){
            totalContactsBlackBox+=`
            <div class="col-sm-6">
                  <div
                    class="contact-card bg-white rounded-4 d-flex justify-content-start align-items-start flex-column"
                  >
                    <div class="mb-3 d-flex">
                      <span
                      style='${(myList[i].photoURL == '') ? `background: ${gradients[randomIndex]};` : `background-image: url(${myList[i].photoURL});`}'
                        class="icon position-relative d-flex justify-content-center align-items-center text-white me-3 fw-bold"
                        >
                        <i class='fa-solid text-white fa-star d-${(myList[i].isFav) ? 'flex':'none'} justify-content-center align-items-center'></i>
                        <span class='opacity-${(myList[i].photoURL == '') ? '100' : '0'}'>${getName(myList[i].fullName)}</span>
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
                        <a href='tel:${myList[i].phoneNumber}'><i
                          class="fa-solid rounded-2 fa-phone icon2 d-flex justify-content-center align-items-center me-2"
                        ></i></a>
                        <a href='mailto:${myList[i].emailAddress}'>
                        <i
                          class="fa-solid rounded-2 fa-envelope icon2 d-flex justify-content-center align-items-center me-2"
                        ></i></a>
                      </div>
                      <div class="d-flex">
                        <button onclick='addToFav(${i});'  style='background-color:transparent' class="d-flex justify-content-center align-items-center p-0 ms-2 border-0 rounded-2">
                        <i class="fa-solid rounded-2 fa-star icon2 d-flex justify-content-center align-items-center"></i></button>

                         <button onclick='addToEme(${i});'  style='background-color:transparent' class="d-flex justify-content-center align-items-center p-0 ms-2 border-0 rounded-2">
                        <i class="fa-solid rounded-2 fa-heart-pulse icon2 d-flex justify-content-center align-items-center"></i></button>

                        <button  data-bs-toggle="modal" data-bs-target="#exampleModal1" onclick='editContact(${i});' style='background-color:transparent' class="d-flex justify-content-center align-items-center p-0 ms-2 border-0 rounded-2">
                        <i class="fa-solid rounded-2 fa-pen icon2 d-flex justify-content-center align-items-center"></i></button>

                        <button onclick='confirmDelete(${i});' style='background-color:transparent' class="d-flex justify-content-center align-items-center p-0 ms-2 border-0 rounded-2">
                        <i class="fa-solid rounded-2 fa-trash icon2 d-flex justify-content-center align-items-center"></i></button>
                      </div>
                    </div>
                  </div>
                </div>`;
        }
    }
    savedCards.innerHTML=totalContactsBlackBox;
    nOfContacts.innerHTML=contacts.length;

}
function diplaySearchedContacts(myList){
  totalSearchedContactsBlackBox='';
    // console.log(myList.length)
    if (myList.length===0){
        noContacts.classList.remove('d-none');
        savedCards.classList.add('d-none');
        searchWarning.classList.add('d-none');
        searchNotWarning.classList.add('d-none');
      }
      else{
        noContacts.classList.add('d-none');
        savedCards.classList.remove('d-none');
        searchWarning.classList.remove('d-none');
        searchNotWarning.classList.add('d-none');
        for(let i=0;i<myList.length;i++){
            totalSearchedContactsBlackBox+=`
            <div class="col-sm-6">
                  <div
                    class="contact-card bg-white rounded-4 d-flex justify-content-start align-items-start flex-column"
                  >
                    <div class="mb-3 d-flex">
                      <span
                      style='${(myList[i].photoURL == '') ? `background: ${gradients[randomIndex]};` : `background-image: url(${myList[i].photoURL});`}'
                        class="icon position-relative d-flex justify-content-center align-items-center text-white me-3 fw-bold"
                        >
                        <i class='fa-solid text-white fa-star d-${(myList[i].isFav) ? 'flex':'none'} justify-content-center align-items-center'></i>
                        <span class='opacity-${(myList[i].photoURL == '') ? '100' : '0'}'>${getName(myList[i].fullName)}</span>
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
                        <a href='tel:${myList[i].phoneNumber}'><i
                          class="fa-solid rounded-2 fa-phone icon2 d-flex justify-content-center align-items-center me-2"
                        ></i></a>
                        <a href='mailto:${myList[i].emailAddress}'>
                        <i
                          class="fa-solid rounded-2 fa-envelope icon2 d-flex justify-content-center align-items-center me-2"
                        ></i></a>
                      </div>
                    </div>
                  </div>
                </div>`;
        }
    }
    savedCards.innerHTML=totalSearchedContactsBlackBox;
    nOfContacts.innerHTML=myList.length;

}
function diplayFavContacts(myList){
  favContactsBlackBox='';
  // console.log(myList.length)
    let filteredArray=[];
    for (let i =0;i<myList.length;i++){
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

        for(let i=0;i<filteredArray.length;i++){
            favContactsBlackBox+=`<div class="col-sm-6 col-xl-12">
             <div
                 class="favorite-item rounded-3 px-1 py-2 d-flex justify-content-start align-items-center"
             >
                 <span
                style='${(filteredArray[i].photoURL == '') ? `background: ${gradients[randomIndex]};` : `background-image: url(${filteredArray[i].photoURL});`}'
                 class="icon d-flex justify-content-center align-items-center text-white me-2 fw-bold"
                 ><span class='opacity-${(filteredArray[i].photoURL == '') ? '100' : '0'}'>${getName(filteredArray[i].fullName)}</span></span>
                 <div>
                 <h4 class="fw-semibold name mb-0">${filteredArray[i].fullName}</h4>
                 <p class="fw-normal des mb-0">${filteredArray[i].phoneNumber}</p>
                 </div>
                 <a class='ms-auto' href='tel:${filteredArray[i].phoneNumber}'><i
                 class="fa-solid rounded-3 fa-phone ms-auto d-flex justify-content-center align-items-center"
                 ></i></a>
             </div>
             </div>`;
        }
    }
    hasFavorites.innerHTML=favContactsBlackBox;
}
function diplayEmeContacts(myList){
    emeContactsBlackBox='';
    // console.log(myList.length)
    let filteredArray=[];
    for (let i =0;i<myList.length;i++){
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

        for(let i=0;i<filteredArray.length;i++){
            emeContactsBlackBox+=`<div class="col-sm-6 col-xl-12">
                    <div
                      class="emergency-item rounded-3 px-1 py-2 d-flex justify-content-start align-items-center"
                    >
                      <span
                style='${(filteredArray[i].photoURL == '') ? `background: ${gradients[randomIndex]};` : `background-image: url(${filteredArray[i].photoURL});`}'
                        class="icon d-flex justif
                        y-content-center align-items-center text-white me-2 fw-bold"
                        ><span class='opacity-${(filteredArray[i].photoURL == '') ? '100' : '0'}'>${getName(filteredArray[i].fullName)}</span></span
                      >
                      <div>
                        <h4 class="fw-semibold name mb-0">${filteredArray[i].fullName}</h4>
                        <p class="fw-normal des mb-0">${filteredArray[i].phoneNumber}</p>
                      </div>
                      <a class='ms-auto' href='tel:${filteredArray[i].phoneNumber}'>
                      <i
                 class="fa-solid rounded-3 fa-phone ms-auto d-flex justify-content-center align-items-center"
                 ></i></a>
                    </div>
                  </div>`;
        }
    }
    hasEmergency.innerHTML=emeContactsBlackBox;
}

// 11) Return fullName
function findFullName(input){
  for(let i=0;i<contacts.length;i++){
    if(contacts[i].phoneNumber===input){
      return contacts[i].fullName;
    }
  }
}

// 12) Take a Photo from user
function uplaodPhoto(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    const img = document.getElementById("previewImage");
    const icon = document.querySelector(".profile-photo i");

    reader.onload = function (e) {
      img.src = e.target.result;
      uploadedPhotoURL=e.target.result;
      img.classList.remove("d-none");
      icon.classList.add("d-none");
    };

    reader.readAsDataURL(input.files[0]);
  }
}


// 13) Return Name to Show
function getName(name) {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    } else {
        return words.map(word => word[0].toUpperCase()).join('');
    }
}



// Start Main Logic
init();





