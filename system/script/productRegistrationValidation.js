function validateProductRegistration(productName, image, detail, pepperText) {

  if(productName == ""){
    console.log("empty product name");
    _("productNameError").innerHTML = "商品名を入力してください";
  }else {
    _("productNameError").innerHTML = "";
  }
  if(image == 0){
    console.log("empty image");
    _("imageError").innerHTML = "画像を選択してください";
  }else {
    _("imageError").innerHTML = "";
  }
  if(detail == ""){
    console.log("empty detail");
    _("detailError").innerHTML = "テキストを入力してください";
  }else {
    _("detailError").innerHTML = "";
  }
  if(pepperText == ""){
    console.log("empty pepper text");
    _("pepperTextError").innerHTML = "Pepperテキストを入力してください";
  }else {
    _("pepperTextError").innerHTML = "";

  }
}

function clearProductForm(){
  _("pepperText").value = "";
  _("detail").value = "";
  _("productName").value="";
}

function _(id){
  return document.getElementById(id);
}
