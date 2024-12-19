//  UPDATE PERSONAL INFO
//-------------FirstNameUpdate-------------

const updateFirstName = (userId, token) =>{
    const newFirstName = document.querySelector('input[name = "first_name_update_input"]').value;
    ifEmpty(newFirstName);
    fetch(`https://localhost:7013/api/UserPersonalInfo/${userId}/UpdateFirstName?firstName=${newFirstName}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error));   

}
//-------------LastNameUpdate-------------

const updateLastName = (userId, token) =>{
    const newLastName = document.querySelector('input[name = "last_name_update_input"]').value;
    ifEmpty(newLastName);
    fetch(`https://localhost:7013/api/UserPersonalInfo/${userId}/UpdateLastName?lastName=${newLastName}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}
//-------------PersonalIdUpdate-------------

const updatePersonalId = (userId, token) =>{
    const newPersonalId = document.querySelector('input[name = "personal_id_update_input"]').value;
    ifEmpty(newPersonalId);
    fetch(`https://localhost:7013/api/UserPersonalInfo/${userId}/UpdatePersonalId?personalId=${newPersonalId}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}
//--------------PhoneNumberUpdate-------------

const updatePhone = (userId, token) =>{
    const newPhone = document.querySelector('input[name = "phone_update_input"]').value;
    ifEmpty(newPhone);
    fetch(`https://localhost:7013/api/UserPersonalInfo/${userId}/UpdatePhoneNumber?phoneNumber=${newPhone}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}
//--------------EmailUpdate-------------

const updateEmail = (userId, token) =>{
    const newEmail = document.querySelector('input[name = "email_update_input"]').value;
    ifEmpty(newEmail);
    fetch(`https://localhost:7013/api/UserPersonalInfo/${userId}/UpdateEmail?email=${newEmail}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

//-------------PhotoUpdate-------------

const updatePhoto = (userId, token) =>{
    const newPhoto = document.querySelector('input[name = "photo_update_input"]').files[0];
    ifEmpty(newPhoto);
    const photoData = new FormData();
    photoData.append('userPhoto', newPhoto);
    fetch(`https://localhost:7013/api/UserPersonalInfo/${userId}/UpdateProfiePhoto`,{
        method: 'PUT',
        body: photoData,
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

// UPDATE ADDRESS
//--------------CityUpdate-------------

const updateCity = (userId, token) =>{
    const newCity = document.querySelector('input[name = "city_update_input"]').value;
    ifEmpty(newCity);
    fetch(`https://localhost:7013/api/Address/${userId}/UpdateCity?city=${newCity}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}
//--------------StreetUpdate-------------

const updateStreet = (userId, token) =>{
    const newStreet = document.querySelector('input[name = "street_update_input"]').value;
    ifEmpty(newStreet);
    fetch(`https://localhost:7013/api/Address/${userId}/UpdateStreet?street=${newStreet}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}
//--------------HouseNumberUpdate-------------

const updateHouseNumber = (userId, token) =>{
    const newHouseNumber = document.querySelector('input[name = "house_number_update_input"]').value;
    ifEmpty(newHouseNumber);
    fetch(`https://localhost:7013/api/Address/${userId}/UpdateHouseNumber?houseNumber=${newHouseNumber}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}
//--------------HouseNumberUpdate-------------

const updateApartmentNumber = (userId, token) =>{
    const newApartmentNumber = document.querySelector('input[name = "apatment_number_update_input"]').value;
    ifEmpty(newApartmentNumber);
    fetch(`https://localhost:7013/api/Address/${userId}/UpdateApartmentNumber?apartmentNumber=${newApartmentNumber}`,{
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error))
}

const ifEmpty =(input)=> {
    if(!input ){
        infoDiv("Field is empty", "red");
    }
}
const infoDiv = (message, color) =>{  
    
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info_div');
    infoDiv.innerHTML = message;
    infoDiv.style.border = `1px solid ${color}`;
    infoDiv.style.color = color;    
    document.getElementById('user_information_update_div').insertAdjacentElement("beforebegin", infoDiv);
}

const updateUserInfo = () =>{
    const updateUserInfoDiv = document.getElementById('user_information_update_div');
    updateUserInfoDiv.style.display = "block";
    update_user_info_btn.style.display = "none";
    collapse_update_btn.style.display = "inline-block";
}
const collapseUpdating = () => {
    const updateUserInfoDiv = document.getElementById('user_information_update_div');
    updateUserInfoDiv.style.display = "none";
    update_user_info_btn.style.display = "inline-block";
    collapse_update_btn.style.display = "none";
}

    collapse_update_btn.onclick = () => collapseUpdating();
    
    update_first_name_btn.onclick =()=> {updateFirstName(tokenObj.nameidentifier, userToken)};   
    update_last_name_btn.onclick =() => updateLastName(tokenObj.nameidentifier, userToken);
    update_personal_id_btn.onclick = () => updatePersonalId(tokenObj.nameidentifier, userToken);
    update_phone_btn.onclick =()=> updatePhone(tokenObj.nameidentifier, userToken);
    update_email_btn.onclick =()=> updateEmail(tokenObj.nameidentifier, userToken);
    update_photo_btn.onclick = () => updatePhoto(tokenObj.nameidentifier, userToken);
    update_city_btn.onclick = () => updateCity(tokenObj.nameidentifier, userToken);
    update_street_btn.onclick = () => updateStreet(tokenObj.nameidentifier, userToken);
    update_house_number_btn.onclick = () => updateHouseNumber(tokenObj.nameidentifier, userToken);
    update_apartment_number_btn.onclick = () => updateApartmentNumber(tokenObj.nameidentifier, userToken);