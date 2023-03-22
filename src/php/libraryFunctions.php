<?php
    require __DIR__.'/../../vendor/autoload.php';

    //Connection MongoDb server 
    //@params, colection name
    function connectToDataBase($collection_name) {
        //Connection to remote database
        //$client = new MongoDB\Client('mongodb+srv://newuser:FXLVd3FZme18xsmG@cluster0.dt82rvs.mongodb.net/?retryWrites=true&w=majority');
        
        $client = new MongoDB\Client();             //Connection to local server
        $collection = $client->eCommerce->$collection_name;

        return $collection;
    }

    //Update products data
    //@params, collection name, item id, new item data
    function updateDatabase($collection_name, $id, $toSet) {
        $findBy = ['_id' => new \MongoDB\BSON\ObjectID($id)];
        $set =  ['$set' => $toSet];
        $collection = connectToDataBase($collection_name);
        
        $collection->updateOne($findBy, $set);              //update element
    }

    //Create a new account
    //@params, collection name, data to be inserted
    function insertOneData($collection_name, $data) {
        $collection = connectToDataBase($collection_name);  //Connect to database

        try {
            $collection->insertOne($data);                  //Insert one data
            return true;
        } catch (Exception $e) {
            return false;
        } 
    }

    //Request user from database
    //@params, user email, user password
    function requestUsers($email, $password) {
        $collection = connectToDataBase('accounts');

        $user = array('email' => $email, 'password' => $password);
        $userData = $collection->findOne($user);
        $string = '['.json_encode($userData).']';

        if(strLen($string) > 10 && str_contains($string, $email) && str_contains($string, $password)) {
            return $string;
        } else {
            return false;
        }
    }

    //Reguest data from database
    //@params, collection name
    function requestDataJSON($collection_name) {
        $collection = connectToDataBase($collection_name);
        $jsonData = "[";

        if(isset($_POST['name'])) {
            $input = $_POST["name"];
            $search = array('$text' => ['$search' => $input, '$caseSensitive' => false, 
            '$diacriticSensitive'=> false ]);
        } else if(isset($_POST['product'])) {
            $search = ['_id' => new MongoDB\BSON\ObjectId($_POST['product'])];
       
        } else if(isset($_POST['id'])) {
            $id = $_POST['id'];
            $search = array('customer_id' => new MongoDB\BSON\ObjectId($id));
        } else {
            $search = array();
        }

        foreach($collection->find($search) as $row) {
            $jsonData .= json_encode($row);
            $jsonData .= ",";
        }

        $jsonData = substr($jsonData, 0, strlen($jsonData) - 1);
        $jsonData .= "]";

        return $jsonData;
    }


?>

