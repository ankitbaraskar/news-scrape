$( document ).ready(function() {
   
    $("#button-id").on("click", function(event){
        
        console.log("entered jquery thing");
        $.get( "/scrape")
        .then(function(data){
            // $("#article-div").append(`<p>${data.title}</p>`)
            console.log(data);
        })
        .catch(function(error){
            console.error(error);
        });
    })

});