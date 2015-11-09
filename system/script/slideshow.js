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
    if(confirm("この写真をスライドショーから削除しますか？") == true){
      $.ajax({
        type: "POST",
        url: "../php/deleteSlide.php",
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
    console.log("entered slideShowForm");
    e.preventDefault();
    $("#wholeContents").hide();
    $("#circularG").show();
    $.ajax({

      url: "../php/uploadSlide.php",
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
      },
      complete: function(){
        $("#wholeContents").show();
        $("#circularG").hide();
      }
    });
  }));

  $("#editTimeOfSlideShow").click(function(){
    document.getElementById("timeOfSlideShow").readOnly = false;
    document.getElementById("timeOfSlideShow").focus();
    document.getElementById("editTimeOfSlideShow").style.display = "none";
    document.getElementById("saveTimeOfSlideShow").style.display = "inline";
  });

  $("#saveTimeOfSlideShow").click(function(){
    console.log("entered saveTimeOfSlideShow");
    var time = $("#timeOfSlideShow").val();
    if(time > 59){
      alert("time should not be more than 59!");
    }else{
      $.ajax({
        url: "../php/updateTime.php",
        type: "POST",
        data: "newTime="+$("#timeOfSlideShow").val(),
        dataType: "json",
        success: function(data){
          console.log(data);
        },
        error: function(data){
          console.log(data);
        }
      });
      document.getElementById("timeOfSlideShow").readOnly = true;
      document.getElementById("editTimeOfSlideShow").style.display="inline";
      document.getElementById("saveTimeOfSlideShow").style.display="none";
    }
  });

});



function pad(){
  var x = document.getElementById("timeOfSlideShow").value;
  if(x.length < 2){
    document.getElementById("timeOfSlideShow").value = "0" + x;
  }else {
    if(x.charAt(0) == 0){
      document.getElementById("timeOfSlideShow").value = x.substr(1);
    }
  }
}
