
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

const getUser = () => {
    const userNameInputValue = document.querySelector('input[name = "login_username"]').value;
    const passwordInputValue = document.querySelector('input[name = "login_password"]').value;
    
    fetch(`https://localhost:7013/api/User/LogIn?username=${userNameInputValue}&password=${passwordInputValue}`, {
        method: 'GET',      
        headers: {
            'Accept': 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(token => {localStorage.setItem('token', token);
        const role = createTokenObj(parseJwt(token)).role;
        if(role == "User"){
            location.href = "UserMainPage/User_main_page.html"
        }else if(role == "Admin"){
            location.href = "Admin_page/Admin_page.html" 
        }
    })
    .catch(error => console.error(error));    
}



index_login_btn.onclick = () => getUser();
index_registration_btn.onclick = () => {location.href = "Registration/Registration.html"};