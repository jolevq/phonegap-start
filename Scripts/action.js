// Global handle to the database
var dbprod;
var tableName='itemTable';
var itemsPerPage=5;
var currentPage;
var pages;
var inited;
var keyword;

// Open the database using Google Gears API and create a table if needed
function openDatabase() {
    var db = google.gears.factory.create('beta.database');
    db.open('itemSet');
    dbprod = db;
}

// Save the selected Items
function saveItems(item1,item2,item3) {
    try {
        // Add the link into the database if the checkbox is checked
        dbprod.execute('insert into Items values (?,?,?)', [item1,item2,item3]);    
    }
    catch (e) {
        alert(e);
    }
}

function loadItems(table, items) {
    try {
    
        // Add the link into the database if the checkbox is checked
        dbprod.execute('insert into Items values (?,?,?)', ['96661','CZ COLOR ME SOFT SOFTLY CHERRY','7.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96703','CYZONE MOMENTS EST ARET X7','19.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96717','ES LL LIQ ROSADO FASHION M','8.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96715','ES LL LIQ ROSA BRIGHT M','8.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96714','ES LL LIQ ARENA SUNSHINE T','8.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96732','CZ BRI MIX N S GRAPE WINE','5']);
        dbprod.execute('insert into Items values (?,?,?)', ['96733','CZ BRI MIX N S BROWN RUSSIAN','5']);
        dbprod.execute('insert into Items values (?,?,?)', ['96736','EZE COL SOM X10 PARADISE OCEAN','14.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96747','CZ TRAX DES MAKE OU FUT 150 ML','18.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96757','EZE COL SOM X10 PARADISE OCEAN','14.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96754','ESIKA OCTETO SOM MAGIC SKY','14.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96763','ES LL LIQ MORADO EMOTION M','8.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96761','ES LL LIQ ROSA BRIGHT M','8.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96762','ES LL LIQ MORADO EMOTION M','8.9']);
        dbprod.execute('insert into Items values (?,?,?)', ['96760','ES LL LIQ ARENA SUNSHINE T','8.9']);
        // Update the table
        
        var rs = dbprod.execute('select * from Items');       
        var nRecords = 0;
        var rsCount = dbprod.execute('select count(*) from Items');
        if (rsCount.isValidRow()) {
            if (rsCount.field(0) > 0){
                nRecords = (rsCount.field(0) - 1);
            }
        }
        rsCount.close();
        Pager(tableName,itemsPerPage);
        init(nRecords);
        showPageNav('pageNavPosition');
        showPage(1);
    }
    catch (e) {
        alert(e);
    }
}

// Display the contents of result search
function populateTable(rs) {
    try {
        // Get a handle to the table
        var linkTable = document.getElementById("itemTable");
        // Execute the database query
        //rs = dbprod.execute(Cadena);
        //var rs = records;

        // Clear the table to prepare for updated results
        linkTable.innerHTML = "";
        
        if (rs.isValidRow()) {
            // Add entries to the table
            while (rs.isValidRow()) {
            linkTable.innerHTML += '<DIV class="up_border1"><A class="list_product_link un_block up_spacer down_spacer" ><SPAN class="list_product_img"><IMG class="list_product_image un_left" alt=' + rs.field(1) + ' border="0" src="Images/D210113003.gif"></SPAN><SPAN class="list_product_descr un_left un_block up_spacer left_spacer5"><SPAN class="list_product_name un_block">'+rs.field(1)+'</SPAN><SPAN class="list_product_details un_block">' + 'Descripcion de: '+rs.field(1)+'</SPAN><SPAN class="list_product_details un_block"><IMG class="product_image" alt="5.0 out of 5" id="product_rating_image" border="0" src="Images/estrellas.gif">('+ rs.field(0) +' reviews)</SPAN><SPAN class="list_product_details un_block">' + 'Precio: '+rs.field(2)+'</SPAN><SPAN class="un_block"><IMG alt="" src="Images/shop.gif"></SPAN></SPAN><SPAN style="height:0" class="clear2"><IMG style="line-height:0;height:0;" alt="" src="./top rated - hair care - Aveda - official site_files/img(1)"></SPAN></A></DIV>'
                rs.next();
            }
            
        
        }
        else {
            // No Items to display
            linkTable.innerHTML = "<tr><td> No saved Itemsssss </td></tr>";
        }
        rs.close();
    } catch (e) {
        alert(e);
    }
}

// Drop the table and recreate it
function clearTable() {
    try {
        dbprod.execute('drop table if exists Items');
        dbprod.execute('create table if not exists Items (CodProd integer unique, DescProd text, PrecProd numeric)');
        //var rs = dbprod.execute('select * from Items');
        //populateTable(rs);
        var rsCount = dbprod.execute('select count(*) from Items');
        if (rsCount.isValidRow()) {
            if (rsCount.field(0) > 0){
                nRecords = (rsCount.field(0) - 1);
            }
        }
        rsCount.close();
        Pager(tableName,itemsPerPage);
        init(nRecords);
        showPageNav('pageNavPosition');
        showPage(1);
    }
    catch (e) {
        alert(e);
    }
}

function init(records) {
        pages = Math.ceil(records / itemsPerPage);
        inited = true;
}

function showPageNav(positionId) {
    	if (!inited) {
    		alert("not inited");
    		return;
    	}
    	var element = document.getElementById(positionId);
    	
    	var pagerHtml = '<span onclick="prev();" class="pg-normal"> &#171 Prev </span> | ';
        for (var page = 1; page <=pages; page++) 
            pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="showPage(' + page + ');">' + page + '</span> | ';
        pagerHtml += '<span onclick="next();" class="pg-normal"> Next &#187;</span>';            
        
        element.innerHTML = pagerHtml;
}

function Search(Keyword, tableName, itemsPerPage){
    
    keyword = Keyword;
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;
    this.nRecords = 0;
    
    var rsCount = dbprod.execute('select count(*) from Items where DescProd like \'%' + Keyword + '%\'');    
    if (rsCount.isValidRow()) {
      
      if (rsCount.field(0) > 0){
      this.nRecords = (rsCount.field(0) - 1);
      }
    }
    rsCount.close();
    Pager(tableName,itemsPerPage);
    init(this.nRecords);
    showPageNav('pageNavPosition');
    showPage(1);
}

function Pager(tableName, itemsPerPage) {
    tableName = tableName;
    itemsPerPage = itemsPerPage;
    currentPage = 1;
    pages = 0;
    inited = false;
}
    
function showRecords(from, to) {            
        try {
        // Get a handle to the table
        var linkTable = document.getElementById("itemTable");

        linkTable.innerHTML = "";
        var i=0;
        var rs=dbprod.execute('select * from Items where DescProd like \'%' + keyword + '%\'')
        if (rs.isValidRow()) {
            // Add entries to the table
            while (rs.isValidRow()) {
                i++;
                if (i>=from && i<=to) {
                    linkTable.innerHTML += '<DIV class="up_border1"><A class="list_product_link un_block up_spacer down_spacer" ><SPAN class="list_product_img"><IMG class="list_product_image un_left" alt=' + rs.field(1) + ' border="0" src="Images/D210113003.gif"></SPAN><SPAN class="list_product_descr un_left un_block up_spacer left_spacer5"><SPAN class="list_product_name un_block">'+rs.field(1)+'</SPAN><SPAN class="list_product_details un_block">' + 'Descripcion de: '+rs.field(1)+'</SPAN><SPAN class="list_product_details un_block"><IMG class="product_image" alt="5.0 out of 5" id="product_rating_image" border="0" src="Images/estrellas.gif">('+ rs.field(0) +' reviews)</SPAN><SPAN class="list_product_details un_block">' + 'Precio: '+rs.field(2)+'</SPAN><SPAN class="un_block"><IMG alt="" src="Images/shop.gif"></SPAN></SPAN><SPAN style="height:0" class="clear2"><IMG style="line-height:0;height:0;" alt="" src="./top rated - hair care - Aveda - official site_files/img(1)"></SPAN><input type="button" value="Eliminar" onclick="deleteItem('+rs.field(0)+')"/></A></DIV>'
                }
                rs.next();
            }
        }
        else {
            // No Items to display
            linkTable.innerHTML = "<tr><td> No saved Itemsssss </td></tr>";
        }
        rs.close();
    } catch (e) {
        alert(e);
    }
}
    
function showPage(pageNumber) {
    	if (!inited) {
    		alert("not inited");
    		return;
    	}
        var from = (pageNumber - 1) * itemsPerPage + 1;
        var to = from + itemsPerPage - 1;
        showRecords(from, to);
    }   
    
function prev() {
        if (currentPage > 1)
            currentPage--;
            showPage(currentPage);
    }
    
function next() {
        if (currentPage < pages) {
            currentPage++;
            showPage(currentPage);
        }
    }                        


function deleteItem(intIdItem) {
    try {
        // Add the link into the database if the checkbox is checked
        dbprod.execute('delete from Items where CodProd='+intIdItem);    
    }
    catch (e) {
        alert(e);
    }
    
}