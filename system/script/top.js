var productsArray = [];
var counter = 1;

$(document).ready(function(){
	getPages();
	generateListField();

	$("#add-product").click(function(){
		generateListField();
	}); // end $("#add-product").click(function(){

	$("#list").click(function(){

		if(document.getElementById("page-type").value != "list"){

			counter = 1;
			productsArray = [];

			$("#title").addClass("hide");
			$("#add-product").removeClass("hide");
			$(".delete-button").removeClass("hide");

			var classList = document.getElementById("list").classList;

			$("#list").removeClass("page-type-inactive");
			$("#list").addClass("page-type-active");

			$("#topic").removeClass("page-type-active");
			$("#topic").addClass("page-type-inactive");

			document.getElementById("page-type").value = "list";

			document.getElementById("products").innerHTML = "";

			generateListField();

		} // end if(document.getElementById("page-type").value != "list"){

	}); // end $("#list").click(function(){

	$("#topic").click(function(){

		if(document.getElementById("page-type").value != "topic"){

			counter = 1;
			productsArray = [];

			$("#title").removeClass("hide");
			$("#add-product").addClass("hide");
			$(".delete-button").addClass("hide");

			var classList = document.getElementById("topic").classList;

			$("#topic").removeClass("page-type-inactive");
			$("#topic").addClass("page-type-active");

			$("#list").removeClass("page-type-active");
			$("#list").addClass("page-type-inactive");

			document.getElementById("page-type").value = "topic";

			document.getElementById("products").innerHTML = "";

			generateTopicFiled();

		} // end if(document.getElementById("page-type").value != "topic"){

	}); // end $("#topic").click(function(){
}); // end $(document).ready(function(){

function generateListField(){
	$("#products").append(
		'<div>'+
			'<div class="select">'+
				'<input id="' + counter + '" type="hidden" value="">'+
				'<div class="select-styled" onclick="toggleDropdown(this);">'+
					'選択してください。'+
				'</div>'+
				'<ul class="select-options" style="display: none; max-height: 200px; overflow-y: scroll; overflow-x: hidden;">'+
					'<li rel="hide">選択してください。</li>'+
				'</ul>'+
			'</div>'+
			'<div onclick="deleteDiv(this.parentNode);" class="delete-button button">'+
				'-'+
			'</div>'+
			'<br/> &nbsp;'+
		'</div>'
	); // end $("#products").append(
	productsArray.push(counter.toString());
	counter++;
}

function generateTopicFiled(){

	$("#products").append(
		'<div>'+
			'<div class="select">'+
				'<input id="' + counter + '" type="hidden" value="">'+
				'<div class="select-styled" onclick="toggleDropdown(this);">'+
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
}

function deleteDiv(div){
	var childDiv = div.children[0];
	var inputId = childDiv.children[0].id.toString();

	productsArray = $.grep(productsArray, function(value) {
		return value != inputId;
	});

	div.remove();
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

function getText(x){

	var text = $(x).find("span").text();

	var ul = x.parentNode;

	parentDiv = ul.parentNode;

	$(parentDiv).find("div").text(text);

	parentDiv.children[0].value = x.value;

	toggleDropdown(parentDiv.children[1]);

}

function getProducts(x){
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
									'<img src="http://139.162.25.179/pepper/junry/product/images/' + data[index].productFileName + '" height="42" width="42" style="margin-left: 0;">'+
								'</td>'+
								'<td>'+
									'<span style="text-align: left; font-size: 15px;">' + data[index].productName + '</span>' +
								'</td>'+
							'</tr>'+
						'</table>'+
					'</li>'
				);

			}
		},
		error: function(e){
			alert('商品情報が取得できませんでした。再度、選択してください。');
		}
	});
}

function getPages(){
	$.ajax({
		url: './php/GetPages.php',
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			for (index = 0; index < data.length; index++) {
				$("#page-list").append(
					'<tr style="height: 10px;">'+
						'<td style="font-size: 12px; width: 70%; padding-left: 1em;">'+
							'<span style="text-align: left; font-size: 15px;">' + data[index].pageButtonName + '</span>' +
						'</td>'+
						'<td>'+
							'<div id="' + data[index].pageId + '" class="edit-button button">編集</div>'+
						'</td>'+
					'</tr>'
				);
			}
		},
		error: function(e){
			alert('ページ情報が取得できませんでした。再度、選択してください。');
		}
	});
}

function submitPage(){
	var pageButtonName = $("#button-title").val();
	var pagePepperText = $("#pepper-text").val();
	var pageTitle = "";
	var pageType = "";
	var pageId = 1;

	if($("#page-type").val() == "topic"){
		pageType = "topic";
		pageTitle = $("#page-title").val();
	}

	$.ajax({
		url: './php/SavePage.php',
		data: "pageButtonName=" + pageButtonName + "&pagePepperText=" + pagePepperText + "&pageTitle=" + pageTitle + "&pageType=" + pageType + "&pageId=" + pageId,
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			if(data == "Success"){
				for(i = 0; i < productsArray.length; i++){
					// alert($("#"+productsArray[i]).val());
					var listProduct = $("#"+productsArray[i]).val();
					$.ajax({
						url: './php/SaveList.php',
						data: "listPage=" + pageId + "&listProduct=" + listProduct,
						type: 'POST',
						dataType: 'json',
						success: function(data1) {
							if(data1 == "Success"){
								alert("Page saved!");
							}
							else{
								alert(data1);
							}
						},
						error: function(e){
							alert("通信に問題が発生しました。再度、登録してください。");
						}
					});
				}
			}
			else{
				alert(data);
			}
		},
		error: function(e){
			alert("通信に問題が発生しました。再度、登録してください。");
		}
	});
}
