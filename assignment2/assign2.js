/*
assign2.js
This document contains all javascript functions required for validation for assign2.html
Matthew Van Boxtel, 2015.02.07: Created
*/

// these 2 variables hold regular expressions which are used to test input in the validateForm funtion
var check_email = /^[A-z\d_0-9]+[@][A-z]+\.[a-z]+$/
var check_city = /^[A-Z][a-z]{2,}$/

// this function is called on load of the page, it simply sets the first name field as the starting cursor field
function focusFirstField()
{
    var start = document.getElementById("firstname");
    start.focus();
}

// this function is called on the postal code field in order to convert all alphabetical characters to uppercase
function changeCase(elem)
{
    elem.value = elem.value.toUpperCase();
}

// this function removes spaces before and after a piece of text, it is called after a user has left a text field
function trimSpaces(elem)
{
    elem.value = elem.value.trim();
}

// this function is called on text fields to capitalize the first letter and convert all subsequent characters to lowercase
function capitalize(elem)
{
    elem.value = elem.value.charAt().toUpperCase() + elem.value.substring(1).toLowerCase();
}

// this large function handles validation for all fields and outputs an error message summarizing the problems with the
// form if there are any, if the form returns valid as true, the fields will be saved to a database if one existed.
function validateForm()
{
    // errorMessage holds all errors which may occur during validation and is shown in an alert at the end if there are
    // errors
    var errorMessage = "";
    // firstOffender is used to find the first error field so that the cursor can be placed there... see bottom of method
    var firstOffender = [];
    // valid is used to return a boolean to the form, if a true return, the form is saved, if false it is not saved
    var valid = true;
    // these 2 variables are used to get a value after comparison with the regexs and used later
    var email = check_email.test(document.userForm.email.value);
    var city = check_city.test(document.userForm.city.value);

    // the following if statements simply check if a field is empty, if it is the error "no field" is appended to the
    // error message
    if (document.userForm.fname.value == "")
    {
        errorMessage += "no first name" + "\n";
        valid = false;
        firstOffender.push("firstname");
    }
    if (document.userForm.lname.value == "")
    {
        errorMessage += "no last name" + "\n";
        valid = false;
        firstOffender.push("lastname");
    }
    if (document.userForm.email.value == "")
    {
        errorMessage += "no email" + "\n";
        valid = false;
        firstOffender.push("emailField");
    }
    // test regex against entered value, if result does not match the pattern, the if statement will evaluate to true and enter
    else if (!email)
    {
        errorMessage += "not a valid email" + "\n";
        valid = false;
        firstOffender.push("emailField");
    }
    if (document.userForm.phone.value == "")
    {
        errorMessage += "no phone number" + "\n";
        valid = false;
        firstOffender.push("phoneNumber");
    }
    if (document.userForm.city.value == "")
    {
        errorMessage += "no city" + "\n";
        valid = false;
        firstOffender.push("cityField");
    }
    // test regex against entered value, if result does not match the pattern, the if statement will evaluate to true and enter
    else if (!city)
    {
        errorMessage += "not a valid city" + "\n";
        valid = false;
        firstOffender.push("cityField");
    }
    alert(errorMessage);
    var focusError = document.getElementById(firstOffender[0]);
    focusError.focus();
    return valid;
}