<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style and script Links
    $links = $indexStyle.$navBarStyle;
    $scripts = $registrationScript.$functionsScript.$navScript;

    //Page Body
    $pageBody = <<<XML
        <div id="registration_form" class='margin-auto form'>
            <span class='margin-auto'>Registration</span>
            <form action="">
                <input id="name_regist" type="text" placeholder="Name">
                <input id="surname_regist" type="text" placeholder="Surname">
                <input id="password_regist" type="password" placeholder="Password">
                <input id="repeat_password_regist" type="password" placeholder="Repeat password">
                <input id="email_regist" type="email" placeholder="Email">
                <input id="address_regist" type="address" placeholder="Address">
                <button id="registration_btn" class='margin-auto' type="submit">Submit</button>
            </form>
            <a href="login.php" class='margin-auto' id="login_btn">Login</a>
            <div class='margin-auto' id="message"></div>
        </div>
    XML;

    //Render calls
    renderPage("Registration", $links, $scripts, $pageBody);
?>