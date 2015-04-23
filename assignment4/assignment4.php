<?php
    /*
    assignment4.php
    This document contains all the php required to create a receipt for assignment4.html
    Matthew Van Boxtel, 2015.03.21: Created
    */
    
    // The following variable declarations get values from the html form for thier respective fields.
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $citizen = $_POST["citizen"];
    $address = $_POST["naddress"];
    $city = $_POST["ncity"];
    $province;
    $postalcode = $_POST["npostalcode"];
    $numberofproducts = $_POST["nnumberofproducts"];
    $producttype = $_POST["nproducttype"];
    
    $initial;
    $tax;
    $shipping;
    $delivery;
    
    /*
     * This switch statement gets the value of the selection for product type and calculates the
     * initial cost, which is simply the cost of one item times the number of items the customer
     * has entered in the number of products field.
     */
    switch($_POST["nproducttype"])
    {
        case 1:
            $initial = 2.50 * number_format($numberofproducts, 2);
            break;
        case 2:
            $initial = 15.00 * number_format($numberofproducts, 2);
            break;
        case 3:
            $initial = 30.00 * number_format($numberofproducts, 2);
            break;
        case 4:
            $initial = 65.00 * number_format($numberofproducts, 2);
            break;
        case 5:
            $initial = 100.00 * number_format($numberofproducts, 2);
            break;
        default:
            print("You did not select a product type!");
    }
    
    // This if statement determines the range of the initial cost, and assigns shipping cost and delivery time
    // based on the range it is in.
    if($initial <= 25.00)
    {
        $shipping = 3.00;
        $delivery = 1;
    }
    elseif($initial <= 50.00)
    {
        $shipping = 4.00;
        $delivery = 1;
    }
    elseif($initial <= 75.00)
    {
        $shipping = 5.00;
        $delivery = 3;
    }
    else
    {
        $shipping = 6.00;
        $delivery = 4;
    }
    
    // here we add the shipping cost to the initial cost.
    $initial += $shipping;
    
    // This function calculates the tax and province and returns both values in an array.
    function calculate_tax()
    {
        // we must set these variables as globals to make sure they change outside the function.
        global $province;
        global $tax;
        global $initial;
        /*
         * This switch statement takes a province value from html and assigns the province based on that value.
         * The tax is equal to the tax rate times the initial cost of the goods calculated earlier. 
         */
        switch ($_POST["nprovince"])
        {
            case 1:
                $province = "Ontario";
                $tax = 0.13 * $initial;
                return array($province, $tax);
            case 2:
                $province = "Quebec";
                $tax = 0.14975 * $initial;
                return array($province, $tax);
            case 3:
                $province = "British Columbia";
                $tax = 0.12 * $initial;
                return array($province, $tax);
            case 4:
                $province = "Alberta";
                $tax = 0.05 * $initial;
                return array($province, $tax);
            case 5:
                $province = "Saskatchewan";
                $tax = 0.1 * $initial;
                return array($province, $tax);
            case 6:
                $province = "Manitoba";
                $tax = 0.13 * $initial;
                return array($province, $tax);
            case 7:
                $province = "Nova Scotia";
                $tax = 0.15 * $initial;
                return array($province, $tax);
            case 8:
                $province = "Prince Edward Island";
                $tax = 0.14 * $initial;
                return array($province, $tax);
            case 9:
                $province = "New Brunswick";
                $tax = 0.13 * $initial;
                return array($province, $tax);
            case 10:
                $province = "Newfoundland";
                $tax = 0.13 * $initial;
                return array($province, $tax);
            case 11:
                $province = "Yukon";
                $tax = 0.05 * $initial;
                return array($province, $tax);
            case 12:
                $province = "Northwest Territories";
                $tax = 0.05 * $initial;
                return array($province, $tax);
            case 13:
                $province = "Nunavut";
                $tax = 0.05 * $initial;
                return array($province, $tax);
            default:
                print("You did not enter a province!");
        }
    }
    
    // province and tax values are set by calling the calculate_tax method and specifying the value in the array
    // that it will return. Province is the 1st index in the array and tax is the second.
    $province = calculate_tax()[0];
    $tax = calculate_tax()[1];
    // create an array which holds all info related to the user, this will make printing easier.
    $userinfo = array("$fname $lname", $email, $address, "$city, $province", $postalcode);
    // add tax to the initial cost to find the total cost
    $total = $initial + $tax;
    // create an array which holds all info related to billing, this will make printing easier.
    $billinginfo = array("You have ordered $numberofproducts type $producttype products",
                         "Shipping cost to be added is $$shipping", "Your total before tax is $$initial",
                         "Tax to be added is $$tax", "Your total cost is $$total");

    // system time can be unreliable for the date method, so declare default timezone as toronto timezone.
    date_default_timezone_set('America/Toronto');
    // assign the delivery date as today's date + the time it takes to deliver based on cost. this was assigned
    // earlier in the program.
    $deliverydate = date('Y-m-d', strtotime("+$delivery days"));
    
    // print statements that generate the reciept. The titles are followed by loops which loop through the arrays
    // declared above ($userinfo and $billinginfo).
    print("Shipping to:<br>");
    for($i = 0; count($userinfo) > $i; ++$i)
    {
        print("$userinfo[$i] <br>");
    }
    print("<br>");
    print("Order Information:<br>");
    for($i = 0; count($billinginfo) > $i; ++$i)
    {
        print("$billinginfo[$i] <br>");
    }
    print("<br>");
    print("Your order will arive on $deliverydate");
?>