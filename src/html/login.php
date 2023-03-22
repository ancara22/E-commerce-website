<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style and script Links
    $links = $navBarStyle.$indexStyle;
    $scripts = $loginScript.$functionsScript.$navScript;

    //Page Body
    $pageBody = <<<XML
        <div id="login_form" class='margin-auto form'>
            <span class='margin-auto'>Login</span>
            <form action="">
                <input class='margin-auto' id="email_input" type="text" name="email" placeholder="Email">
                <input class='margin-auto' id="password_input" type="password" name="password" placeholder="Password">
                <button class='margin-auto' id="login_btn" type="submit">Login</button>
            </form>
            <a href="registration.php" class='margin-auto' id="registration_btn">Registration</a>
            <div class='margin-auto' id="message"></div>
        </div>
    XML;

    //Render
    renderPage("Login", $links, $scripts, $pageBody);
?>
