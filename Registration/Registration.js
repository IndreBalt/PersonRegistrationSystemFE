//sukurimas User objektas
const createUser = () =>{ 
  
    do{       
        const userNameValue = document.querySelector('input[name = "registration_username"]').value;
        const passwordValue = document.querySelector('input[name = "registration_password"]').value;
        const confirmPasswordValue = document.querySelector('input[name = "registration_confirm_password"]').value;
        const firstNameValue = document.querySelector('input[name = "registration_first_name"]').value;
        const lastNameValue = document.querySelector('input[name = "registration_last_name"]').value;
        const personalIdValue = document.querySelector('input[name = "registration_personal_id"]').value;
        const phoneValue = document.querySelector('input[name = "registration_phone"]').value;
        const emailValue = document.querySelector('input[name = "registration_email"]').value;
        const photoFile = document.querySelector('input[name = "registration_photo"]').files[0];
        const cityValue = document.querySelector('input[name = "registration_city"]').value;
        const streetValue = document.querySelector('input[name = "registration_street"]').value;
        const houseNumberValue = document.querySelector('input[name = "registration_house_number"]').value;
        const apartmentNumberValue = document.querySelector('input[name = "registration_apartment_number"]').value;
     
        if(userNameValue == "" || passwordValue == ""|| confirmPasswordValue == ""|| firstNameValue ==""|| lastNameValue ==""|| personalIdValue ==""||
             phoneValue ==""|| emailValue == "" || cityValue == "" || streetValue ==""||houseNumberValue == ""||apartmentNumberValue == "" || !photoFile){
            console.log("Ne visi laukai uzpildyti");            
        }else if(passwordValue != confirmPasswordValue){
            console.log("nesutampa slaptažodžiai")
        }else{    
             const user = {        
                "UserName": `${userNameValue}`,
                "Password": `${passwordValue}`, 
                "PersonalInfo":{
                    "FirstName": `${firstNameValue}`,
                    "LastName": `${lastNameValue}`,
                    "PersonalId": `${personalIdValue}`,
                    "PhoneNumber": `${phoneValue}`,
                    "Email": `${emailValue}`,
                    "ProfilePhoto": photoFile,
                    "Address":{
                        "City": `${cityValue}`,
                        "Street": `${streetValue}`,
                        "HouseNumber": `${houseNumberValue}`,
                        "ApartmentNumber": `${apartmentNumberValue}`
                    }
                }
            }  
            return user;         
        }         
    }while(!user); 
}   
//Sukurima userio FormData objektas
const createUserData = (user) => {
    const data = new FormData();    
    for(let item in user)
    {                
        if(item === 'PersonalInfo'){
            for(let infoItem in user[item]){
                if(infoItem === 'Address')
                    {
                        for(let addressItem in user[item][infoItem]){
                            data.append(`PersonalInfo.Address.${addressItem}`, user[item][infoItem][addressItem]);
                        }
                        
                }else{
                    data.append(`PersonalInfo.${infoItem}`, user[item][infoItem]);
                }
                
            }
        }else{
            data.append(item, user[item]);
        } 
    } 
    return data; 
}

//Sukuriamas Useris DB, prijungiamas ir nukreipamas i savo puslapi
const addUser = () =>{ 
    const newUser = createUser();
    const userData = createUserData(newUser);
    fetch('https://localhost:7013/api/User/Registration',{
        method:'POST',
        body: userData
    })
    .then(response =>{
        if(response.status == '201')
            {
                logInUser(newUser);
    }})
    .catch(error => console.log(error));
}
const parseJwt = (token) => {
    var arrayToken = token.split('.'); //[1];
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
   return tokenPayload;
 
}
//ceates token object from token (edited claims)
const createTokenObj =(tokenPayload)=>{
    let tokenObj = {};
    for(let item in tokenPayload){
        let itemArr = item.split('/');
        let ClaimName = itemArr[itemArr.length-1];
        tokenObj[ClaimName] = tokenPayload[item];        
    }
    return tokenObj;
}


const logInUser = (user) => {        
    fetch(`https://localhost:7013/api/User/LogIn?username=${user.UserName}&password=${user.Password}`, {
        headers: {
            'Accept': 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(token => {console.log("Tokenas: "+token),
        localStorage.setItem('token', token);
        const role = createTokenObj(parseJwt(token)).role;
        if(role == "User"){
            location.href = "../UserMainPage/User_main_page.html"
        }
        
    })
    .catch(error => console.error("Erroras: "+error));  
}

registration_confirm_btn.onclick = () => addUser();
registration_to_index_btn.onclick = () => {location.href = "../index.html"};