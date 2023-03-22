<?php 
    //Include functions library
    include './libraryFunctions.php';

    //Operation Switcher
    if(isset($_POST['operation'])) {
        $operation = $_POST['operation'];

        switch($operation) {
            case 'request_items': 
                echo requestDataJSON('items');
                break;
            case 'request_orders': 
                echo requestDataJSON('orders_history');
                break;
        }
    }
    
?>