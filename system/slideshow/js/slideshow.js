$(function() {

  var dialog;
  $("#file").on("change", function(){
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        if (/^image/.test( files[0].type)){ // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onloadend = function(){ // set image data as background of div
                $("#imagePreview").css("background-image", "url("+this.result+")");
                $("#imagePreview").css("-webkit-filter", "grayscale(0%)");
                $("#imagePreview").css("opacity", "1");
            }
        }
    });

  $(".deleteImageFromSlideShow").click(function(){
    var id = this.id.split('-');
    if(confirm("Are you sure you want to delete this image from the slideshow?") == true){
      $.ajax({
        type: "POST",
        url: "php/deleteSlide.php",
        data: "imageId="+id[1],
        dataType: "json",
        success: function(data){
          console.log(data);
          if(data.indexOf("error") > -1){

            document.getElementById("failedDeletingImage").style.display = "inherit";
          }else{
            document.getElementById("successDeletingImage").style.display = "inherit";
          }
          location.reload();
        }
      });
    }
  });


  $("#slideShowForm").on('submit', (function(e){
    e.preventDefault();
    $.ajax({
      url: "php/uploadSlide.php",
      type: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function(data){

        console.log(data);
        if(data.indexOf("error") > -1){
          document.getElementById("failedAddingImage").style.display = "inherit";
        }else {
          document.getElementById("successAddingImage").style.display = "inherit";
        }
        location.reload();
      }
    });
  }));

});
