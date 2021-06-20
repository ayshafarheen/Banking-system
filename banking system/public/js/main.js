if (window.location.href.indexOf("true") > -1){
    console.log("yed")
    $(".modal").addClass("is-active");
    setTimeout(function(){
        $(".modal").removeClass("is-active");
    }, 1500);
}