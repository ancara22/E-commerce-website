<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style and script Links
    $links = $cmsLoginStyle.$footerStyle;
    $scripts = $cmsLoginScript;

    //Page Body
    $pageBody = <<<XML
        <h1 class='margin-auto'>CMS</h1>
        <form id="cms-login" class='margin-auto' action=''>
            <h2>Login</h2>
            <input id="cms_username" type="text" name="username" placeholder="username">
            <input id="cms_password" type="text" name="password" placeholder="password">
            <button id="cms_submit_btn" >Login</button>
            <span id='cms_message'></span>
        </form>
    XML;

    //Renders
    renderHtmlTop("CMS Login", $links);        //Render HTMl top
    renderBody($pageBody);                     //Render HTMl Body
    renderFooter();                            //Render HTMl foooter
    renderHtmlBottom($scripts);                //Render HTMl bottom, document close

?>



