var signUp = document.querySelector(".signUp");
var box = document.querySelector(".box");
var nameRegister ;
var emailRegister ;
var passwordRegister;
var inncorrect ;
var signInFromRegister;
var userNameRegex = /^[a-z0-9_-]{3,15}$/;
var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

var emailLogin = document.querySelector(".email");
var passwordLogin = document.querySelector(".password");
var signInButton = document.querySelector(".signIn");

var allAccounts = [];
if(localStorage.getItem("allAccounts") != null){
    allAccounts = JSON.parse(localStorage.getItem("allAccounts"));
}

signUp.addEventListener("click", function (){
    box.innerHTML = `            <h1 class="text-info">Smart Login System</h1>
    <input type="text" class="form-control my-3 signUpName text-white" placeholder="Enter Your Name">
    <input type="email" class="form-control my-3 signUpEmail text-white" placeholder="Enter Your Email">
    <input type="password" class="form-control my-3 signUpPassword text-white" placeholder="Enter Your password">
    <p class="inncorrect d-none"></p>
    <button class="btn btn-outline-info w-100 my-3 Sign-Up">Sign Up</button>
    <p class="text-white">You have an account? <a class="text-white signInFromRegister">Sign In</a></p>
    `;
    signInFromRegister = document.querySelector(".signInFromRegister")
    var signUpButton = document.querySelector(".Sign-Up");
    nameRegister = document.querySelector(".signUpName");
    passwordRegister = document.querySelector(".signUpPassword");
    inncorrect = document.querySelector(".inncorrect");
    emailRegister = document.querySelector(".signUpEmail");
    signUpButton.addEventListener("click", validationRegister);
    signInFromRegister.addEventListener("click", function(){
        box.innerHTML = `            <h1 class="text-info">Smart Login System</h1>
                <input type="email" class="form-control my-3 text-white email" placeholder="Enter Your Email">
                <input type="password" class="form-control my-3 text-white password" placeholder="Enter Your password">
                <button class="btn btn-outline-info w-100 my-3 text-white signIn" id="Sign-In">Login</button>
                <p class="text-white">Don’t have an account? <a class="text-white signUp">Sign Up</a></p>`;
                signInButton = document.querySelector(".signIn");
    })
})
function validationRegister(){
    
    if(allAccounts.includes(emailRegister.value)){
        inncorrect.innerText = "this account is already exist!"
        inncorrect.classList.add("text-success","d-flex")
        inncorrect.classList.remove("d-none","text-danger")
    }else{
    if(userNameRegex.test(nameRegister.value) && emailRegex.test(emailRegister.value) && passwordRegex.test(passwordRegister.value)){
        inncorrect.innerText = "Success"
        inncorrect.classList.add("text-success","d-flex")
        inncorrect.classList.remove("d-none","text-danger")
        var account = {
            userEmail: emailRegister.value,
            userName: nameRegister.value,
            password: passwordRegister.value
        }
        allAccounts.push(account);
        localStorage.setItem("allAccounts", JSON.stringify(allAccounts))
    }else{
        inncorrect.innerText = "All Inputs are requred"
        inncorrect.classList.add("text-danger", "d-flex");
        inncorrect.classList.remove("d-none","text-success");
    }
    }
}

var isExist = false;
var logOut;
function validationLogin(){
    for (let i = 0; i < allAccounts.length; i++) {
        if( allAccounts[i].userEmail == emailLogin.value && allAccounts[i].password == passwordLogin.value ){
            isExist = true;
            var userNAME = allAccounts[i].userName;
        }
    }
    if (isExist){
        document.body.innerHTML = `    <nav class="navbar navbar-expand-lg navbar-dark box">
        <div class="container">
            <a class="navbar-brand text-decoration-none" href="#">SMART LOGIN</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
                <ul class="navbar-nav ml-auto">

                    <li class="nav-item ">
                        <a class="nav-link btn btn-outline-warning text-decoration-none logOut">Logout</a>
                    </li>


                </ul>

            </div>
        </div>
    </nav>
    <div class="container my-5 text-center h-100 d-flex align-items-center">
        <div class="box m-auto margin-box w-75 p-5">
            <h1 id="username">Welcome ${userNAME}</h1>
        </div>
    </div>`
    }
    logOut = document.querySelector(".logOut");
    logOut.addEventListener('click', function(){
        document.body.innerHTML = `    <div class="container d-flex justify-content-center">
        <div class="box my-5 w-75 text-center m-auto p-5">
            <h1 class="text-info">Smart Login System</h1>
            <input type="email" class="form-control my-3 text-white email" placeholder="Enter Your Email">
            <input type="password" class="form-control my-3 text-white password" placeholder="Enter Your password">
            <button class="btn btn-outline-info w-100 my-3 text-white signIn" id="Sign-In">Login</button>
            <p class="text-white">Don’t have an account? <a class="text-white signUp">Sign Up</a></p>
        </div>
    </div>`
    })
}
signInButton.addEventListener("click", validationLogin)


