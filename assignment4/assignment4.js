/*
assignment4.js
This document contains all javascript functions required for validation for assignment4.html
Matthew Van Boxtel, 2015.03.21: Created
*/

// this function is called on load of the page, it simply sets the first name field as the starting cursor field
function focusFirstField()
{
    var start = document.getElementById("firstname")
    start.focus();
}

// these 3 variables hold regular expressions which are used to test input in the validateForm funtion
var nameReg = /^[A-Z][a-z]+$/
var emailReg = /^[A-z\d_0-9]+[@][A-z]+\.[a-z]+$/
var postalCodeReg = /^[A-Z]\d[A-Z]\s\d[A-Z]\d$/

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

    // the following if statements simply check if a field is empty, if it is the error "no field" is appended to the
    // error message
    if ($("#firstname").val() == "")
    {
        errorMessage += "No fist name entered" + "\n";
        valid = false;
        firstOffender.push("firstname");
    }
    // test regex against entered value, if result does not match the pattern, the if statement will evaluate to true and enter
    else if (!(nameReg.test($("#firstname").val())))
    {
        errorMessage += "First name must be all letters and capitalized" + "\n";
        valid = false;
        firstOffender.push("firstname");
    }
    if ($("#lastname").val() == "")
    {
        errorMessage += "No last name entered" + "\n";
        valid = false;
        firstOffender.push("lastname");
    }
    // test regex against entered value, if result does not match the pattern, the if statement will evaluate to true and enter
    else if (!(nameReg.test($("#lastname").val())))
    {
        errorMessage += "Last name must be all letters and capitalized" + "\n";
        valid = false;
        firstOffender.push("lastname");
    }
    if ($("#emailid").val() == "")
    {
        errorMessage += "No email entered" + "\n";
        valid = false;
        firstOffender.push("email")
    }
    // test regex against entered value, if result does not match the pattern, the if statement will evaluate to true and enter
    else if (!(emailReg.test($("#emailid").val())))
    {
        errorMessage += "Email can only contain letters, numbers, underscores and must end with @somedomainname.domain" + "\n";
        valid = false;
        firstOffender.push("emailid");
    }
    if ($('input[name=citizen]:checked', '#orderform').val() == "no")
    {
        errorMessage += "You must be a Canadian Citizen to order" + "\n";
        valid = false;
    }
    if ($("#address").val() == "")
    {
        errorMessage += "No address entered" + "\n";
        valid = false;
        firstOffender.push("address");
    }
    if ($("#city").val() == "")
    {
        errorMessage += "No city entered" + "\n";
        valid = false;
        firstOffender.push("city");
    }
    // test regex against entered value, if result does not match the pattern, the if statement will evaluate to true and enter
    else if (!(nameReg.test($("#city").val())))
    {
        errorMessage += "City must be all letters and capitalized" + "\n";
        valid = false;
        firstOffender.push("city");
    }
    if ($("#province option:selected").text() == "Select Province")
    {
        errorMessage += "No province selected" + "\n";
        valid = false;
    }
    if ($("#postalcode").val() == "")
    {
        errorMessage += "No postal code entered" + "\n";
        valid = false;
        firstOffender.push("postalcode");
    }
    // test regex against entered value, if result does not match the pattern, the if statement will evaluate to true and enter
    else if (!(postalCodeReg.test($("#postalcode").val())))
    {
        errorMessage += "Invalid postal code entered" + "\n";
        valid = false;
        firstOffender.push("postalcode");
    }
    if ($("#numberofproducts").val() == "" || isNaN($("#numberofproducts").val()))
    {
        errorMessage += "You must enter the number of products you would like to order" + "\n";
        valid = false;
        firstOffender.push("numberofproducts");
    }
    if ($("#producttype option:selected").text() == "Select Type")
    {
        errorMessage += "No product type selected" + "\n";
        valid = false;
    }
    if (errorMessage != "")
    {
        alert(errorMessage);
        var focusError = document.getElementById(firstOffender[0]);
        focusError.focus();
    }
    return valid;
}