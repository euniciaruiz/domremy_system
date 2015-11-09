$(document).ready(function(){
	refreshProductList();
	registerMode();

});

//register a product
function register() {
	console.log("registering...")
	var productName = $("#productName").val();
	var image = $("#image")[0].files.length;
	var detail = $("#detail").val();
	var pepperText = $("#pepperText").val();
	if(productName == "" || image == 0 || detail == "" || pepperText == ""){
		validateProductRegistration(productName, image, detail, pepperText);
	}
	else{
		Load(true);

					var fd = new FormData();
					fd.append( 'product', $('#productName').val());
					fd.append( 'detail', $('#detail').val());
					fd.append( 'pepperText', $('#pepperText').val());
					fd.append( 'file', $('#image')[0].files[0]);

					$.ajax({
						url: "php/upload.php",
						type: "POST",
						data: fd,
						enctype: 'multipart/form-data',
						processData: false,
						contentType: false
					}).done(function( data ) {
						console.log(data);
							// if(data == '新しい商品を追加しました'){
							if(data == '1'){
								emptyForms();
								refreshProductList();
								$("#addSuccess").css("display", "inherit");
								console.log("success");
							}
							else{
								Load(false);
								console.log("error");
								$("#addFailed").css("display", "inherit");
							}
			});
	}

		}

		//edit a product
		function edit(id){
			if(checkEmptyInputFieldsonEdit() == 0){
				Load(true);
				var data = new FormData();
				data.append( 'id', id);
					data.append( 'name', $('#productName').val());
					data.append( 'detail', $('#detail').val());
					data.append( 'pepperText', $('#pepperText').val());
					data.append( 'file', $('#editImg')[0].files[0]);

					$.ajax({
						url: "php/edit.php",
						type: "POST",
						data: data,
						enctype: 'multipart/form-data',
						processData: false,
						contentType: false
					}).done(function( data ) {
						alert(data);

							if(data == '商品情報を更新しました'){
								refreshProductList();
								registerMode();
				}
							else{
								Load(false);
							}
					});
			}
		}

//fetch product for edit
function fetchDataToEdit(id){

	editMode();
	emptyForms();
	$("#btn_edit").attr("onclick","edit("+id+")");

	getProduct(id, function(result) {
		if (result) {
			var product = jQuery.parseJSON(result);

			//put data to the inputs
			$('#productName').val(product.name);
			$('#detail').val(product.detailText);
			$('#pepperText').val(product.pepperText);
			// $('#img img').attr('src','images/'+product.fileName+'');
			convertImgToBase64('images/'+product.fileName,'#img img');
		}
	});
}

		//delete a product
		function deleteProduct(id){
			//ask confirmation
			if (confirm("Are You Sure!") == true) {
				Load(true);
				$.ajax({
						url: "php/deleteProduct.php",
						type: "POST",
						data: {'id':id}
					}).done(function(data) {
						registerMode();
						console.log(data);
						if(data == "削除が完了しました"){
							$("#deleteSuccess").css("display", "inherit");
						}else {
							$("deleteFailed").css("display", "inherit");
						}
						refreshProductList(); //refresh product list

					});
		}

		}

		//get only one product
		function getProduct(id, callback){
			Load(true);
			$.ajax({
					url: "php/getData.php",
					type: "POST",
					data: {'id':id}
				}).done(function(data) {
					Load(false);
					callback(data);
				});
		}

		//get all the products
		function getAllProducts(callback){
			Load(true);
			var datas;
			$.ajax({
					url: "php/getAllProducts.php",
					type: "POST",
				}).done(function(data) {
					Load(false);
					callback(data);
				});
		}

		//refresh Product list
	// 	function refreshProductList(){
	// 		var html = " ";
	// 		var data;

	// 		getAllProducts(function(result) {
	// 		if (result) {
	// 				var products = jQuery.parseJSON(result);

	// 				$.each(products, function(idx,product){

	// 				html += "<div class='list'>\
	// 							<img src='images/"+product.fileName+"'/>\
	// 						<div id='name'>"+product.name+"</div>\
	// 						<button class='button_ListEdit wiggle-me' onclick='fetchDataToEdit("+product.id+");'><i class='fa fa-pencil fa-lg'></i></button>\
	// 						<button class='button_ListDelete wiggle-me' onclick='deleteProduct("+product.id+");'><i class='fa fa-trash fa-lg'></i></button>\
	// 					</div>";
	// 		});

	// 		$("#productList").html(html);
	// 		}
	// });
	// $("#productList").html(html);
	// 	}
//refresh Product list
function refreshProductList(){
	var html = " ";
	var data;

	getAllProducts(function(result) {
	    if (result) {
	    	$("#productList").html(" ");
	        var products = jQuery.parseJSON(result);

        	$.each(products, function(idx,product){
        		var base64;
        		var imageUrl = 'images/'+product.fileName;


			    html = "<div id='"+product.id+"' class='list'>\
			    			<img src=''/>\
							<div id='name'>"+product.name+"</div>\
							<button class='button_ListEdit' onclick='fetchDataToEdit("+product.id+");'><i class='fa fa-pencil fa-lg'></i></button>\
							<button class='button_ListDelete' onclick='deleteProduct("+product.id+");'><i class='fa fa-trash fa-lg'></i></button>\
						</div>";
			    $("#productList").append(html);
			    convertImgToBase64(imageUrl,'#'+product.id+" img");
			});
	    }
	});
}
function convertImgToBase64(url,id){
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
	    var canvas = document.createElement('CANVAS');
	    var ctx = canvas.getContext('2d');
		canvas.height = this.height;
		canvas.width = this.width;
	  	ctx.drawImage(this,0,0);
	  	var dataURL = canvas.toDataURL('image/png');

	  	$(id).attr('src', dataURL);

	  	canvas = null;
	};
	img.src = url;
}

//empty all forms
function emptyForms(){
	$('#productName').val("");
		$('#detail').val("");
		$('#pepperText').val("");
		$('#image').val("");
		$('.images').css('display','none');
		removeError();
}

//remove all error indication
function removeError(){
	$('input').css("border-color","#FFB295");
	$('textarea').css("border-color","#FFB295");
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

//mode for edit
function editMode(){
	$("#btn_register").css("display", "none");
	$("#btn_edit").css("display", "block");

	$("#chooseImage").css("display", "none");
	$("#img").css("display", "block");
}

//mode for register
function registerMode(){
	emptyForms();
	$("#btn_register").css("display", "block");
	$("#btn_edit").css("display", "none");

	$("#chooseImage").css("display", "block");
	$("#img").css("display", "none");
}

//get the url or path of the image
function readURL(input) {
				if (input.files && input.files[0]) {
						var reader = new FileReader();

						reader.onload = function (e) {
								$('.previewImage')
										.attr('src', e.target.result)
						};
						$('.images').css('display','block');
						reader.readAsDataURL(input.files[0]);
				}
		}

		//find empty fields
function checkEmptyInputFieldsonRegistration(){
			var product = $('#productName').val();
			var details = $('#detail').val();
			var pepperText =  $('#pepperText').val();
			var image = $('#image').val();
			var error = 0;
			var e = " ";

				if(product == ''){
					error += 1;
					e += "商品名を入力してください\n";
		$('#productName').css("border","1px solid #df000f");
				}
				if(details == ''){
					error += 1;
					e += "テキストを入力してください\n";
		$('#detail').css("border","1px solid red");
				}

	if(pepperText == ''){
		error += 1;
		e += "Pepperテキストを入力してください\n";
		$('#pepperText').css("border","1px solid #df000f");
				}

				if(image == ''){
					error += 1;
					e += "画像を選択してください\n";
		$('#image').css("border","1px solid #df000f");
				}
				if(error != 0){
					alert(e);
				}
				return error;
		}
function checkEmptyInputFieldsonEdit(){
	var product = $('#productName').val();
    var details = $('#detail').val();
    var pepperText =  $('#pepperText').val();
    var error = 0;
    var e=" ";

    if(product == ''){
    	error += 1;
    	e += "Please Fill Product Name\n";
		$('#productName').css("border","1px solid red");
    }
    if(details == ''){
    	error += 1;
    	e += "Please Fill Detail\n";
		$('#detail').css("border","1px solid red");
    }

	if(pepperText == ''){
		error += 1;
		e += "Please Fill Pepper Text\n";
		$('#pepperText').css("border","1px solid red");
    }
    if(error != 0){
    	alert(e);
    }
    return error;
}
