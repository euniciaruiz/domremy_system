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

        $('#title').val(top.title);
        $('#product').val(top.productID);
        $('#toggle').html('<img id="product_image" src="images/' + top.productFileName + '" height="42" width="42" style="margin-left: 0;">' + '&nbsp;' + top.productName);

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

function getText(x, path){

	var text = $(x).find("span").text();

	var ul = x.parentNode;

	parentDiv = ul.parentNode;

	// $(parentDiv).find("div").text(text);
	var inputId = $(parentDiv).find("input").attr('id');
	$(parentDiv).find("div").html('<img id="' + inputId + '_image" src="" height="42" width="42" style="margin-left: 0;">' + text);

	$("#" + inputId + "_image").attr('src', path);

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
					'<li onclick="getText(this, \'images/' + data[index].productFileName + '\');" value="' + data[index].productId + '">'+
						'<table>'+
							'<tr>'+
								'<td style="width: 54px;">'+
									'<img src="images/' + data[index].productFileName + '" height="42" width="42" style="margin-left: 0;">'+
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
			alert('商品情報を取得できませんでした。再度、選択してください。');
			Load(false);
		}


	});

}

function register(){

	var top = $("#title").val();
	if(top == ""){
		document.getElementById("title").value = "";
		document.getElementById("topTitleError").innerHTML = "タイトルを入力してください";
	}else {
		Load(true);
		var title = $("#title").val();
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
	var title = $('#title').val();
	var productID = $("#product").val();
	var error = 0;
	var e = " ";

	if(title == ""){
		error += 1;
		e+="Please Fill Title \n";
		$('#title').css("border","1px solid red");
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

function emptyForms(){
    $('#title').val("");
    $('#product').val("");
    $('#toggle').html("選択してください。");
}



function Load(bool){
	if (bool) {
		$.blockUI({
			message: '<br/> &nbsp; 少々お待ちください<br/> &nbsp;',
			css: { border: '0px', cursor: 'wait', backgroundColor: '#F4E6D9', color: '#724A29', fontSize: '20px', minWidth: '300px'},
			overlayCSS: { backgroundColor: '#f7ebe1 ', opacity: 0.7, cursor: 'wait' }
		});
	}
	else {
		$.unblockUI();
	}
}
