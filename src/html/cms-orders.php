<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style Links
    $links = $cmsOrdersStyle;
  
    //Scripts Links
    $scripts = <<<XML
    XML;
  
    //Page Body
    $pageBody = <<<XML
    XML;

    //Render calls
    renderHtmlTop("CMS Orders", $links);
    renderBody($pageBody);
    renderFooter();
    renderHtmlBottom($scripts);
?>
