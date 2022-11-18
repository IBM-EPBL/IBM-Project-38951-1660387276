var flag1 = false, flag2 = false, flag3 = false, flag4 = false, flag5 = false;
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

const nameField = document.forms['signup-form']['fname'];
const usernameField = document.forms['signup-form']['uname'];
const emailField = document.forms['signup-form']['email'];
const passwordField = document.forms['signup-form']['password'];
const password_cnfField = document.forms['signup-form']['password-cnf'];
const mobileField = document.forms['signup-form']['mobile'];
const signupBtnActual = document.forms['signup-form']['signup-btn'];


signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});


function check_all() {
    console.log('check_all');
    check_name();
    check_username();
    check_password();
    check_email();
    check_mobile();

    if (check_flags()) {
    enable_signup_btn();
    }
    else disable_signup_btn();
}

function check_flags() {
    return flag1 && flag2 && flag3 && flag4 && flag5;
}

function enable_signup_btn() {
    signupBtnActual.disabled = false;
    signupBtnActual.style.cursor = 'pointer';
}

function disable_signup_btn() {
    signupBtnActual.disabled = true;
    signupBtnActual.style.cursor = 'not-allowed';
}

function check_username() {
    if (usernameField.value === '') return;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/check-username", true);
    let usernameformat = /^[a-z][a-z0-9_\.]+$/;
    let username = usernameField.value.trim();
    let valid = usernameformat.test(username);

    if (valid) {
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 403) {
                usernameField.value = 'Username Already Exists!';
                usernameField.style.backgroundColor = '#FFC6B9';
                valid = false;
        }
    }
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("username=" + username);
    }

    if (!valid)
    usernameField.style.backgroundColor = '#FFC6B9';
    else
    usernameField.style.backgroundColor = '#C5FFB9';

    flag2 = valid;
    if (check_flags()) enable_signup_btn();
    else disable_signup_btn();

}

function check_email() {
    if (emailField.value === '') return;
    var xhr = new XMLHttpRequest();
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email = emailField.value.trim();
    let valid = mailformat.test(email);

    if (valid) {
    xhr.open("POST", "/check-email", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 403) {
                emailField.value = 'Email Already Exists!';
                valid = false;
                emailField.style.backgroundColor = '#FFC6B9';
        }
    }
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("email=" + email);
    }
    if (!valid)
    emailField.style.backgroundColor = '#FFC6B9';
    else
    emailField.style.backgroundColor = '#C5FFB9';

    flag3 = valid;
    if (check_flags()) enable_signup_btn();
    else disable_signup_btn();
}

function check_name() {
    let name = nameField.value.trim();
    if (name === '') return;
    let nameformat = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
    let valid = nameformat.test(name);
    if (valid)
    nameField.style.backgroundColor = '#C5FFB9';
    else
    nameField.style.backgroundColor = '#FFC6B9';

    flag1 = valid;
    if (check_flags()) enable_signup_btn();
    else disable_signup_btn();
}

function check_mobile() {
    let mobile = mobileField.value.trim();
    if (mobile === '') return;
    let mobileformat = /^\d{10}$/;
    let valid = mobileformat.test(mobile);
    if (valid)
    mobileField.style.backgroundColor = '#C5FFB9';
    else
    mobileField.style.backgroundColor = '#FFC6B9';

    flag5 = valid;
    if (check_flags()) enable_signup_btn();
    else disable_signup_btn();
}

function check_password() {
    if (passwordField.value === '' && password_cnfField.value === '') return;
    let valid = (passwordField.value === password_cnfField.value);
    if (!valid) {
    password_cnfField.style.backgroundColor = '#FFC6B9';
    passwordField.style.backgroundColor = '#FFC6B9';

    }
    else {
    password_cnfField.style.backgroundColor = '#C5FFB9';
    passwordField.style.backgroundColor = '#C5FFB9';
    }
    flag4 = valid;
    if (check_flags()) enable_signup_btn();
    else disable_signup_btn();
}
