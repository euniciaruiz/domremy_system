var productsArray = [];
var listCounter = 1;
var pageId = 1;
var dropDownString = "";

$(document).ready(function(){
	getPages();
	preLoadProducts();
	setPageId(pageId);

	$("#add-product").click(function(){
		generateListField();
	}); // end $("#add-product").click(function(){

	$("#list").click(function(){

		if(document.getElementById("page-type").value != "list"){

			// counter = 1;
			// productsArray = [];
			changeViewToList();
			// generateListField();

		} // end if(document.getElementById("page-type").value != "list"){

	}); // end $("#list").click(function(){

	$("#topic").click(function(){

		if(document.getElementById("page-type").value != "topic"){

			// counter = 1;
			// productsArray = [];
			changeViewToTopic();
			// generateTopicField();

		} // end if(document.getElementById("page-type").value != "topic"){

	}); // end $("#topic").click(function(){

}); // end $(document).ready(function(){

function changeViewToList(){

	// document.getElementById("page-title").value = "";

	$("#title").addClass("hide");
	$("#add-product").removeClass("hide");
	$(".delete-button").removeClass("hide");

	var classList = document.getElementById("list").classList;

	$("#list").removeClass("page-type-inactive");
	$("#list").addClass("page-type-active");

	$("#topic").removeClass("page-type-active");
	$("#topic").addClass("page-type-inactive");

	document.getElementById("page-type").value = "list";

	// document.getElementById("products").innerHTML = "";

	$("#products-list").removeClass("hide");
	$("#products-topic").addClass("hide");

}

function changeViewToTopic(){

	$("#title").removeClass("hide");
	$("#add-product").addClass("hide");
	$(".delete-button").addClass("hide");

	var classList = document.getElementById("topic").classList;

	$("#topic").removeClass("page-type-inactive");
	$("#topic").addClass("page-type-active");

	$("#list").removeClass("page-type-active");
	$("#list").addClass("page-type-inactive");

	document.getElementById("page-type").value = "topic";

	// document.getElementById("products").innerHTML = "";

	$("#products-topic").removeClass("hide");
	$("#products-list").addClass("hide");

}

function preLoadProducts(){
	$.ajax({
		url: './php/GetProducts.php',
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			for (index = 0; index < data.length; index++) {

				// dropDownString += '<li onclick="getText(this);" value="' + data[index].productId + '">'+
				dropDownString += '<li onclick="getText(this, \'images/' + data[index].productFileName + '\');" value="' + data[index].productId + '">'+
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
					'</li>';

			}
		},
		error: function(e){
			alert('Something went wrong! GetProducts');
		}
	});
}

function generateListField(){

	$("#products-list").append(
		'<div>'+
			'<div class="select">'+
				'<input id="' + listCounter + '" type="hidden" value="">'+
				'<div class="select-styled" onclick="toggleDropdown(this);">'+
					'選択してください。'+
				'</div>'+
				'<ul class="select-options" style="display: none; max-height: 200px; overflow-y: scroll; overflow-x: hidden;">'+
				'</ul>'+
			'</div>'+
			'<div onclick="deleteDiv(this.parentNode);" class="delete-button button html-btn">'+
				'-'+
			'</div><div class="emptyInput" id="listCounter_'+listCounter+'"></div>'+
			'<br/> &nbsp;'+
		'</div>'
	); // end $("#products").append(
	productsArray.push(listCounter.toString());
	listCounter++;

}

function generateTopicField(){

	$("#products-topic").append(
		'<div>'+
			'<div class="select">'+
				// '<input id="' + counter + '" type="hidden" value="">'+
				'<input id="_1" type="hidden" value="">'+
				'<div class="select-styled" onclick="toggleDropdown(this);">'+
					'選択してください。'+
				'</div>'+
				'<ul class="select-options" style="display: none; max-height: 200px; overflow-y: scroll; overflow-x: hidden;">'+
					'<li rel="hide">選択してください。</li>'+
				'</ul>'+
			'</div><div class="emptyInput" id="topicDropdownError"></div>'+
			'<br/> &nbsp;'+
		'</div>'
	); // end $("#products").append(

	// productsArray.push(counter.toString());

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
			// nothing to do here
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

	var parentDiv = x.parentNode;
	var ul = $(parentDiv).find("ul");

	$(ul).append(dropDownString);

}

function getPages(){
	Load(true);

	document.getElementById("page-list").innerHTML = "";

	// Get all Pages
	$.ajax({
		url: './php/GetPages.php',
		type: 'POST',
		dataType: 'json',
		async: false,
		success: function(data) {
			for (index = 0; index < data.length; index++) {
				$("#page-list").append(
					'<tr style="height: 10px;">'+
						'<div style="background-color: ;border-style: solid; border-color: #000000; border-width: 1px;">'+
						'<td style="font-size: 12px; width: 70%; padding-left: 1em;">'+
							'<span style="text-align: left; font-size: 15px;">' + data[index].pageButtonName + '</span>' +
						'</td>'+
						'<td>'+
							'<div class="edit-button button wiggle-me" onclick="setPageId(' + data[index].pageId + ');"><i class="fa fa-pencil"></i></div>'+
						'</td>'+
						'</div>'+
					'</tr>'
				);
			}
			Load(false);
		},
		error: function(e){
			alert('ページ情報が取得できませんでした。再度、選択してください。');
		}
	});
}

function setPageId(x){
	pageId = x;
	fillFields(pageId);
}

function fillFields(x){
	Load(true);

	document.getElementById("products-list").innerHTML = "";
	document.getElementById("products-topic").innerHTML = "";
	document.getElementById("page-title").value = "";

	// Get specific Page
	$.ajax({
		url: './php/GetPage.php',
		data: "pageId=" + pageId,
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			document.getElementById("button-title").value = data[0].pageButtonName;
			document.getElementById("pepper-text").value = data[0].pagePepperText;

			if(data[0].pageType == "topic"){
				pageType = "topic";
				generateListField();
				$.ajax({
					url: './php/GetLists.php',
					data: "pageId=" + pageId,
					type: 'POST',
					dataType: 'json',
					async: false,
					success: function(data1) {
						// listCounter = 1;
						// productsArray = [];

						changeViewToTopic();

						document.getElementById("page-title").value = data[0].pageTitle;

						if(data1.length != 0){
							for (index = 0; index < data1.length; index++) {
								generateTopic(data1[index].productId, data1[index].productName, data1[index].productFileName);
								if(index == data1.length - 1){
									Load(false);
								}
							}
						}
						else{
							generateTopicField()
							Load(false);
						}
					},
					error: function(e){
						alert('リスト情報が取得できませんでした。再度、選択してください。');
						Load(false);
					}
				});

			}
			else{
				pageType = "list";
				generateTopicField();

				// Get Lists of Page
				$.ajax({
					url: './php/GetLists.php',
					data: "pageId=" + pageId,
					type: 'POST',
					dataType: 'json',
					async: false,
					success: function(data1) {
						listCounter = 1;
						productsArray = [];

						changeViewToList();

						if(data1.length != 0){
							for (index = 0; index < data1.length; index++) {
								generateLists(data1[index].productId, data1[index].productName, data1[index].productFileName);
								if(index == data1.length - 1){
									Load(false);
								}
							}
						}
						else{
							generateListField();
							Load(false);
						}
					},
					error: function(e){
						alert('リスト情報が取得できませんでした。再度、選択してください。');
						Load(false);
					}
				});
			}

		},
		error: function(e){
			alert('Something went wrong! GetPage');
			Load(false);
		}
	});
}

function generateLists(id, name, fileName){
	$("#products-list").append(
		'<div>'+
			'<div class="select">'+
				'<input id="' + listCounter + '" type="hidden" value="' + id + '">'+
				'<div class="select-styled" onclick="toggleDropdown(this);">'+
					'<img id="' + listCounter + '_image" src="images/' + fileName + '" height="42" width="42" style="margin-left: 0;">' + name +
				'</div>'+
				'<ul class="select-options" style="display: none; max-height: 200px; overflow-y: scroll; overflow-x: hidden;">'+
				'</ul>'+
			'</div>'+
			'<div onclick="deleteDiv(this.parentNode);" class="delete-button button html-btn">'+
				'-'+
			'</div><div class="emptyInput" id="listCounter_'+listCounter+'"></div>'+
			'<br/> &nbsp;'+
		'</div>'
	); // end $("#products").append(
	productsArray.push(listCounter.toString());
	listCounter++;
}

function generateTopic(id, name, fileName){
	$("#products-topic").append(
		'<div>'+
			'<div class="select">'+
				'<input id="_1" type="hidden" value="' + id + '">'+
				'<div class="select-styled" onclick="toggleDropdown(this);">'+
					'<img id="_1_image" src="images/' + fileName + '" height="42" width="42" style="margin-left: 0;">' + name +
				'</div>'+
				'<ul class="select-options" style="display: none; max-height: 200px; overflow-y: scroll; overflow-x: hidden;">'+
					'<li rel="hide">選択してください。</li>'+
				'</ul>'+
			'</div><div class="emptyInput" id="topicDropdownError"></div>'+
			'<br/> &nbsp;'+
		'</div>'
	); // end $("#products").append(

	// productsArray.push(counter.toString());
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

function submitPage(){

	var pageButtonName = "";
	var pagePepperText = "";
	var pageTitle = "";
	var pageType = "";

	pageButtonName = $("#button-title").val();
	pagePepperText = $("#pepper-text").val();


	if($("#page-type").val() == "topic"){
		pageType = "topic";
		pageTitle = $("#page-title").val();

		if(pageButtonName != "" && pagePepperText != "" && pageTitle != "" && $("#_1").val() != ""){
			Load(true);
			save(pageButtonName, pagePepperText, pageTitle, pageType);
		} // end if(pageButtonName != "" || pagePepperText != ""){
		else{
			var dropdownProduct =  $("#_1").val();
			topicPageValidation(pageButtonName, pagePepperText, pageTitle, dropdownProduct);
		}
	}
	else{
		if(pageButtonName != "" && pagePepperText != "" && productsArray.length != 0){

			var bull = true;
			var empty = true;
			var identifier = true;

			while(bull){
				for(i = 0; i < productsArray.length; i++)
				{
					if($("#"+productsArray[i]).val() != ""){
						// bull = true;
						document.getElementById("listCounter_"+productsArray[i]).innerHTML = " ";
						if(i == productsArray.length - 1){
							if(identifier){
								Load(true);
								save(pageButtonName, pagePepperText, pageTitle, pageType);
							}
						}
					}
					else{
						empty = false;
						identifier = false;
						// bull = false;
						document.getElementById("listCounter_"+productsArray[i]).innerHTML = "表示する商品を選択してください";
					}
				}
				bull = false;
			}

		} // end if(pageButtonName != "" || pagePepperText != ""){
		else{
			listPageValidation(pageButtonName, pagePepperText);
		}
	}
}

function topicPageValidation(pageButtonName, pagePepperText, pageTitle, dropdown){
	if(pageButtonName == ""){
		_("buttonTitleError").innerHTML = "ボタンタイトルを入力してください。";
	}else {
		_("buttonTitleError").innerHTML = "";

	}
	if(pagePepperText == ""){
		_("pagePepperTextError").innerHTML = "Pepperテキストを入力してください";
	}else {
		_("pagePepperTextError").innerHTML = "";

	}
	if(pageTitle == "")
	{
		_("pageTitleError").innerHTML = "タイトルを入力してください";

	}else {
		_("pageTitleError").innerHTML = "";

	}

	if(dropdown == ""){
		_("topicDropdownError").innerHTML = "表示する商品を選択してください";
	}else {
		_("topicDropdownError").innerHTML = "";

	}

}

function listPageValidation(pageButtonName, pagePepperText){
 if(pageButtonName == ""){
	 _("buttonTitleError").innerHTML = "ボタンタイトルを入力してください";
 }else {
 	_("buttonTitleError").innerHTML = "";
 }
 if(pagePepperText == ""){
	 _("pagePepperTextError").innerHTML = "Pepperテキストを入力してください";
 }else {
 	_("pagePepperTextError").innerHTML = "";
 }
}

function _(id){
	return document.getElementById(id);
}



function save(_pageButtonName, _pagePepperText, _pageTitle, _pageType){
	// Save Page
	$.ajax({
		url: './php/SavePage.php',
		data: "pageButtonName=" + _pageButtonName + "&pagePepperText=" + _pagePepperText + "&pageTitle=" + _pageTitle + "&pageType=" + _pageType + "&pageId=" + pageId,
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			if(data == "Success"){
				if(_pageType == "topic"){
					var listProduct = $("#_1").val();

					// Save Topic for Page
						$.ajax({
							url: './php/SaveList.php',
							data: "listPage=" + pageId + "&listProduct=" + listProduct,
							type: 'POST',
							dataType: 'json',
							async: false,
							success: function(data1) {
								alert(data1);
								Load(false);
								getPages();
							},
							error: function(e){
								alert("Something went wrong! Can't connect to SaveList.php");
								Load(false);
							}
						});
				}
				else{
					for(i = 0; i < productsArray.length; i++){
						var listProduct = $("#"+productsArray[i]).val();

						// Save List for Page
						$.ajax({
							url: './php/SaveList.php',
							data: "listPage=" + pageId + "&listProduct=" + listProduct,
							type: 'POST',
							dataType: 'json',
							async: false,
							success: function(data1) {
								if(i == productsArray.length - 1){
									alert(data1);
									Load(false);
									getPages();
								}
							},
							error: function(e){
								if(i == productsArray.length - 1){
									alert("通信に問題がありました。再度登録をお願いいたします。");
									Load(false);
								}

							}
						});
					} // end of for(i = 0; i < productsArray.length; i++){
				}
			}
			else{
				alert(data);
				Load(false);
			}
		},
		error: function(e){
			alert("通信に問題がありました。再度登録をお願いいたします。");
			Load(false);
		}
	});
}
