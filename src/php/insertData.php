<?php 
    //Include functions library
    include './libraryFunctions.php';

    //Operation Switcher
    if(isset($_POST['operation'])) {
        $operation = $_POST['operation'];

        switch($operation) {
            case 'insert_session': 
                $data = json_decode($_POST['userSession']);          //Get data from AJAX
                echo insertOneData('cart_history', $data) ? 'Succes!' : 'Error!';   //Insert new user session 
                break;

            case 'insert_order': 
                 //Get data from AJAX
                $customer_id = $_POST["customer_id"];
                $shipping_address = $_POST["shipping_address"];
                $date = $_POST["date"];
                $time = $_POST["time"];
                $products = $_POST["products"];
                $total_cost= $_POST["total_cost"];

                $productsArray = array();

                //Format order data
                if(isset($customer_id) && isset($shipping_address) && isset($date) 
                    && isset($time) && isset($products) && isset($total_cost)) {
                    $array = json_decode($products);  

                    foreach($array as $key => $item) {
                        $object = array( "count" => $item[0], "product_id" => new MongoDB\BSON\ObjectId($item[1]));
                        array_push($productsArray, $object);
                    }

                    //Ready Order
                    $data = [
                        'customer_id' => new MongoDB\BSON\ObjectId("".$customer_id),
                        'shipping_address' => $shipping_address, 
                        'date' => $date, 
                        'time' => $time, 
                        'products' => $productsArray,
                        'total_cost' => $total_cost
                    ];
                    
                    //Insert order in database
                    $result = insertOneData('orders_history', $data);

                    if($result !== false) {
                        echo 'true';
                    } else {
                        echo 'false';
                    }
                } else {
                    echo 'false';
                }

                break;
        }
    }
?>