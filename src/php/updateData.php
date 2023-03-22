<?php
    //Include functions library
    include './libraryFunctions.php';

    //Operation Switcher
    if(isset($_POST['operation'])) {
        $operation = $_POST['operation'];
        switch($operation) {
            case 'update_item': 
                //Get data from user
                $id = $_POST['id'];
                $stock_count = $_POST['stock_count'];
                $name = $_POST['name'];
                $price = $_POST['price'];
                $product_code = $_POST['product_code'];
                $image_url = $_POST['image_url'];
                $details = $_POST['details'];

                //Set new values
                $toSetArray = [
                    'stock_count' => (int)$stock_count, 
                    'name' => $name, 
                    'price' => (int)$price,
                    'product_code' => $product_code,
                    'image_url' => $image_url,
                    'details' => $details
                ];

                updateDatabase('items', $id, $toSetArray );      //Updata item data
                break;

            case 'update_user':
                $name = $_POST['name'];
                $surname = $_POST['surname'];
                $email = $_POST['email'];
                $address = $_POST['address'];
                $id = $_POST['id'];
            
                //Set new values
                $toSet = [
                    'name' => $name,
                    'surname' => $surname,
                    'email' => $email,
                    'address' => $address
                ];
            
                updateDatabase('accounts', $id, $toSet);        //Updata user data          
        }
    }

?>