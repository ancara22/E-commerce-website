<?php 
    //Include functions library
    include './libraryFunctions.php';

    //Operation Switcher
    if(isset($_POST['operation'])) {
        $operation = $_POST['operation'];

        switch($operation) {
            case 'login_user': 
                //Get data from AJAX
                $email = $_POST["email"];
                $password = $_POST["password"];

                if(isset($email) && isset($password)) {
                    $result = requestUsers($email, $password);  //Search user in databae
                    if($result !== false) {
                        echo $result;
                    } else {
                        echo '[{"status": false}]';
                    }
                } else {
                    echo '[{"status": false}]';
                }
                break;

            case 'new_user': 
                //Get data from AJAX
                $fname = $_POST["name"];
                $surname = $_POST["surname"];
                $password = $_POST["password"];
                $email = $_POST["email"];
                $address = $_POST["address"];
                $repeat_password = $_POST["repeat_password"];
                $acces = 'basic';

                //Set account/check inputs/validations
                if(isset($fname) && isset($surname) && isset($password) && isset($email) && isset($address)) {
                    $emailPattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i";
                    
                    if((bool)preg_match($emailPattern, $email)) {
                        if(strlen($password) > 8) {
                            if($password == $repeat_password) {
                                //New account
                                $data = [
                                    'name' => $fname,
                                    'surname' => $surname, 
                                    'password' => $password, 
                                    'email' => $email, 
                                    'address' => $address,
                                    'acces' => $acces
                                ];

                                //Insert account in database
                                echo insertOneData('accounts', $data) ? 'Succes!' : 'Error!';
                            } else {
                                echo 'Passwords do NOT match!';
                            }
                        } else {
                            echo'Password is too short!';
                        }
                    } else {
                        echo 'Incorrect email format!';
                    }
                } else {
                    echo 'Compleate all inputs please!';
                }
                break;
        }
    }
?>