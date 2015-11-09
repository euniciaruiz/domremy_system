var productsArray = [];
var counter = 1;

$(document).ready(function(){
	generateListField();
	getCurrentTop();

	$("#add-product").click(function(){
		generateListField();
	}); // end $("#add-product").click(function(){
}); // end $(document).ready(function(){

function getCurrentTop(){
	Load(true);
	$.ajax({
        url: "php/getTop.php",
        type: "POST",
    }).done(function(data) {

    	var top = jQuery.parseJSON(data);

        $('#_title').val(top.title);
        $('#product').val(top.productID);
        $('#toggle').html(top.productName);
        Load(false);
        
    });
}

function generateListField(){ 
	$("#products").append(
		'<div>'+
			'<div class="select" style="width:100%;">'+
				'<input id="product" type="hidden" value="">'+
				'<div id="toggle" class="select-styled" onclick="toggleDropdown(this);">'+
					'選択してください。'+
				'</div>'+
				'<ul class="select-options" style="display: none; max-height: 200px; overflow-y: scroll; overflow-x: hidden;">'+
					'<li rel="hide">選択してください。</li>'+
				'</ul>'+
			'</div>'+
			'<br/> &nbsp;'+
		'</div>'
	); // end $("#products").append(
	productsArray.push(counter.toString());
	counter++;
}

function toggleDropdown(div){
	$('#toggle').css("border","none");
	var parentDiv = div.parentNode;
	if(div.classList.contains("active")){
		$(div).removeClass("active");
		$(parentDiv).find("ul").css("display","none");
	}
	else{
		if(div.classList.contains("data-present")){

		}
		else{
			getProducts(div);
			$(div).addClass("data-present");
		}
		
		$(div).addClass("active");
		$(parentDiv).find("ul").css("display","block");
	}
}

function getText(x){

	var text = $(x).find("span").text();

	var ul = x.parentNode;

	parentDiv = ul.parentNode;

	$(parentDiv).find("div").text(text);

	parentDiv.children[0].value = x.value;

	toggleDropdown(parentDiv.children[1]);

}

function getProducts(x){
	Load(true);
	var parentDiv = x.parentNode;

	var ul = $(parentDiv).find("ul");

	$.ajax({
		url: './php/GetProducts.php',
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			for (index = 0; index < data.length; index++) {

				$(ul).append(
					'<li onclick="getText(this);" value="' + data[index].productId + '">'+
						'<table>'+
							'<tr>'+
								'<td style="width: 54px;">'+
									'<img src="./images/' + data[index].productFileName + '" height="42" width="42" style="margin-left: 0;">'+
								'</td>'+
								'<td>'+
									'<span style="text-align: left; font-size: 15px;">' + data[index].productName + '</span>' +
								'</td>'+
							'</tr>'+
						'</table>'+
					'</li>'
				);

			}
			Load(false);
		},
		error: function(e){
			alert('Something went wrong! GetProducts');
			Load(false);
		}
		

	});

}

function register(){
	if(checkEmptyFields() == 0){
		Load(true);
		var title = $("#_title").val();
		var productID = $("#product").val();

		var fd = new FormData();
	    fd.append( 'title', title);
	    fd.append( 'productID', productID);

	    $.ajax({
	        url: "./php/top_register.php",
	        type: "POST",
	        data: fd,
	        enctype: 'multipart/form-data',
	        processData: false,
	        contentType: false 
	    }).done(function( data ) {
	    	Load(false);
	        alert(data);
	        getCurrentTop();
	    });
	}
}
function checkEmptyFields(){
	var title = $('#_title').val();
	var productID = $("#product").val();
	var error = 0;
	var e = " ";

	if(title == ""){
		error += 1;
		e+="Please Fill Title \n";
		$('#_title').css("border","1px solid red");
	}
	if(productID == ""){
		error += 1;
		e+="Please Select Product \n";
		$('#toggle').css("border","1px solid red");
	
	}

	if(error !=0){
		alert(e);
	}
	return error;
}
function highlight(id){	
    $('#'+id).css("border-color","black");
}
function emptyForms(){
    $('#_title').val("");
    $('#product').val("");
    $('#toggle').html("選択してください。");
}

 function Load(bool){
    if (bool) {
        $.blockUI({
            message: '<br/> &nbsp; Please Wait...<br/> &nbsp;',
            css: { border: '2px solid #B8B8B8 ', cursor: 'wait', backgroundColor: '#FFFFFF' },
            overlayCSS: { backgroundColor: '#B8B8B8 ', opacity: 0.2, cursor: 'wait' }
        });
    } 
    else {
        $.unblockUI();
    }
}
