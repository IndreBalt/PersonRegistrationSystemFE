const getUserByIdUrl = "https://localhost:7013/api/User/GetUserById?id="
const getUserPhotoByIdUrl = "https://localhost:7013/api/User/GetPhotoById?id=";

const userToken = localStorage.getItem('token');

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


const getUserById = (userId, token) => {   
    fetch(getUserByIdUrl+`${userId}`, {
        method: 'GET',      
        headers: {
            'Authorization': 'Bearer '+ token
        }
    }) 
    .then(response => response.json())
    .then(json => displayUserInfo(json))
    .catch(error => console.error(error));    
}

const getUserPhotoById = (userId, token) => {   
    fetch(getUserPhotoByIdUrl+`${userId}`, {
        method: 'GET',      
        headers: {
            'Authorization': 'Bearer '+ token
        }
    }) 
    .then(response => response.blob())
    .then(data => displayPhoto(data))
    .catch(error => console.error(error));    
}

const displayPhoto =(response)=>{
    const photoDiv = document.getElementById("user_photo_div");
    const img = document.createElement('img');
    img.src = URL.createObjectURL(response)
    img.alt = 'Profile photo';
    photoDiv.appendChild(img);
}

const addUserNameToTitle = (userName) => {
    const pageTitle = document.querySelector('title')
    const titleH1 = document.querySelector('h2');
    const titleText = titleH1.textContent;
    const titleTextwithUserName = titleText+` > ${userName}`;
    titleH1.innerHTML = titleTextwithUserName;
    pageTitle.innerHTML = titleTextwithUserName;
}

const logOut =()=>{
    localStorage.removeItem('token');
    location.href = "../index.html";
}
 const displayUserInfo = (user) =>
{
    const userInfoDiv = document.getElementById('user_information_div');
    const userInfoList = document.createElement('ul');
    const userFirstname = document.createElement('li');
    userFirstname.innerHTML = `First name: ${user.personalInfo.firstName}`;
    const userLasttname = document.createElement('li');
    userLasttname.innerHTML = `Last name: ${user.personalInfo.lastName}`;
    const userPersonalId = document.createElement('li');
    userPersonalId.innerHTML = `Personal ID: ${user.personalInfo.personalId}`;
    const userPhoneNumber = document.createElement('li');
    userPhoneNumber.innerHTML = `Phone number: ${user.personalInfo.phoneNumber}`;
    const userEmail = document.createElement('li');
    userEmail.innerHTML = `E-mail: ${user.personalInfo.email}`;
    const userAddress = document.createElement('li');
    userAddress.innerHTML = `Address: ${createUserAddresString(user)}`;
    userInfoDiv.appendChild(userInfoList);
    userInfoList.appendChild(userFirstname);
    userInfoList.appendChild(userLasttname);
    userInfoList.appendChild(userPersonalId);
    userInfoList.appendChild(userPhoneNumber);
    userInfoList.appendChild(userEmail);
    userInfoList.appendChild(userAddress);
    
}
const createUserAddresString = (user) => 
{
    let addressObj = user.personalInfo.address;
    let addressString = `${addressObj.street} ${addressObj.houseNumber} - ${addressObj.apartmentNumber}, ${addressObj.city}.`
    return addressString;
}

const tokenObj = createTokenObj(parseJwt(userToken));

addUserNameToTitle(tokenObj.name);
const logedInUser = getUserById(tokenObj.nameidentifier, userToken);
getUserPhotoById(tokenObj.nameidentifier, userToken);



user_main_page_log_out_btn.onclick = () => logOut();
update_user_info_btn.onclick = () => updateUserInfo();