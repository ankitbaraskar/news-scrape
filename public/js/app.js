$( document ).ready(function() {
   
    $("button-id").on("click", function(){

        $.get( "/srape")
        .then(function(data){
            console.log(data);
        })
        .catch(function(error){
            console.error(error);
        });
    })

});