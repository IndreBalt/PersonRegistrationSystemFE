
const userToken = localStorage.getItem('token');
const usersTable = document.getElementById('all_users_table');

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

const addAdminNameToTitle = (userName) => {
    const pageTitle = document.querySelector('title')
    const titleH1 = document.querySelector('h2');
    const titleText = titleH1.textContent;
    const titleTextwithUserName = titleText+` > ${userName}`;
    titleH1.innerHTML = titleTextwithUserName;
    pageTitle.innerHTML = titleTextwithUserName;
}

const getAllUsers = (token) => {
    fetch(`https://localhost:7013/api/User/Users`, {
        method: 'GET',      
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then(response => response.json())
    .then(users => printAllUsers(users))
    .catch(error => console.error(error));    
}

const printAllUsers = (users) => {
    for(const user of users)
    {
        createUsersRow(user);
    }

}
const createUsersRow =(user)=>{
    const userRow = document.createElement('tr');
    userRow.setAttribute('id', user.id);
    const userIdTd = document.createElement('td'); 
    const userUserNameTd = document.createElement('td'); 
    const userFirstNameTd = document.createElement('td');
    const userLastNameTd = document.createElement('td'); 
    const userPersonalIdTd = document.createElement('td'); 
    const userPhoneTd = document.createElement('td'); 
    const userEmailTd = document.createElement('td'); 
    const userAddressTd = document.createElement('td'); 
    const userActionTd = document.createElement('td'); 
    const btnDeleteUser = document.createElement('button');
    btnDeleteUser.setAttribute('id', 'delete_user_btn');
    btnDeleteUser.setAttribute('onclick', 'deleteUser(this)');

    userIdTd.innerHTML = user.id;
    userUserNameTd.innerHTML = user.userName;
    userFirstNameTd.innerHTML = user.personalInfo.firstName; 
    userLastNameTd.innerHTML = user.personalInfo.lastName;
    userPersonalIdTd.innerHTML = user.personalInfo.personalId;
    userPhoneTd.innerHTML = user.personalInfo.phoneNumber;
    userEmailTd.innerHTML = user.personalInfo.email;
    userAddressTd.innerHTML = createUserAddresString(user.personalInfo.address);
    btnDeleteUser.innerHTML = "Delete user";

    usersTable.appendChild(userRow);
    userRow.appendChild(userIdTd);
    userRow.appendChild(userUserNameTd);
    userRow.appendChild(userFirstNameTd);
    userRow.appendChild(userLastNameTd);
    userRow.appendChild(userPersonalIdTd);
    userRow.appendChild(userPhoneTd);
    userRow.appendChild(userEmailTd);
    userRow.appendChild(userAddressTd);      
    userActionTd.appendChild(btnDeleteUser);
    userRow.appendChild(userActionTd);
   
}

const deleteUser = (btn) =>{
    const row = btn.parentNode.parentNode;
    
    if (confirm("Are you sure you want to delete User ?")) {        
        fetch(`https://localhost:7013/api/User/${row.id}`,{
            method:'DELETE',
            headers: {
                'Authorization': 'Bearer '+ userToken
            }
        })
        .then(response => response.ok?(console.log("Deleted"), window.location.reload()):console.log("Something is wrong"));

    }
}
const createUserAddresString = (address) => 
{
    let addressString = `${address.street} ${address.houseNumber} - ${address.apartmentNumber}, ${address.city}.`
    return addressString;
}

const logOut =()=>{
    localStorage.removeItem('token');
    location.href = "../index.html";
}


const tokenObj = createTokenObj(parseJwt(userToken));
getAllUsers(userToken);
addAdminNameToTitle(tokenObj.name);



admin_main_page_log_out_btn.onclick =()=> logOut();