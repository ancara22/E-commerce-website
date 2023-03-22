<?php
    //Include library
    include '../php/libraryRenders.php';

    //Style and script Links
    $links = $cmsStyle;
    $scripts = $functionsScript.$cmsScript;

    //Page Body
    $pageBody = <<<XML
        <div class="nav-cms">
            <div class="logo">CMS</div>
            <a href="./cms-orders.php">Orders</a>
                <div class="search_panel margin-auto">
                    <form action="">
                        <input type="text" placeholder='Type' class='margin-auto'>
                        <button  type="submit">Search</button>
                    </form>
                </div>
            <div class="icons">
                <div id="add_product">+<span> add</span></div>
                <button id="logout_btn">Logout</button>
            </div>
        </div>
        <div id="edit_box_background">
            <div id="edit_box" class='margin-auto'>
                <button id="close_btn">X</button>
                <div id="image_box">
                    <img id="edit_box_image" src="" alt="Sunglasses">
                </div>
                <div id="edit_box_detailes">
                    <div >
                        <label for="name">Name:</label>
                        <input id="edit_name" name="name" type="text" require>
                    </div>
                    <div>
                        <label for="code">Code:</label>
                        <input id="edit_code" name="code" type="text" require>
                    </div>
                    <div>
                        <label for="price">Price:</label>
                        <input id="edit_price" name="price" type="text" require>
                    </div>
                    <div>
                        <label for="stock">Stock count:</label>
                        <input id="edit_stock" name="stock" type="text" require>
                    </div>
                    <div>
                        <label for="image">Image url:</label>
                        <input id="edit_image" name="image" type="text" require>
                    </div>
                    <div>
                        <label for="description">Description:</label>
                        <textarea id="edit_description" name="description"  rows="5" cols="33"> </textarea>
                    </div>
                    <button id="save_btn">Save</button>
                </div>
            </div>
        </div>
        <div class="products_box margin-auto"></div>
    XML;

    //Render calls
    renderHtmlTop("CMS", $links);               //Render HTMl top
    renderBody($pageBody);                      //Render HTMl Body
    renderFooter();                             //Render HTMl foooter
    renderHtmlBottom($scripts);                 //Render HTMl bottom, document close
?>