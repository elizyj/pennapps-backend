const signupButton = document.getElementById("login-btn");

const showError = (form, fieldName) => {
    const ele = form[fieldName];
    const message = document.getElementById(ele.name + "-error");
    message.removeAttribute("class");
    if (!ele.checkValidity()) {
        message.setAttribute("class", "visible-error-message");
        return false;
    } else {
        message.setAttribute("class", "hidden-error-message");
        return true;
    }
};

signupButton.onclick = () => {
    const fields = ["username", "email", "firstName", "lastName", "password", "confirmedPassword"];
    const form = document.forms[0]; //only one form so just get it

    const validations = fields.map(field => showError(form, field));
    let validated = validations.reduce(
        (acc, val) => acc && val,
        true
    );


    if (form["password"].value !== form["confirmedPassword"].value) {
        const message = document.getElementById("confirmedPassword" + "-error");
        message.removeAttribute("class");
        message.setAttribute("class", "visible-error-message");
        validated = false;
    }

    return validated;
}

