$(document).ready(function () {

    $("#button-id").on("click", function (event) {

        // console.log("entered jquery thing");
        $.get("/scrape")
            .then(function (data) {
                // $("#article-div").append(`<p>${data.title}</p>`)
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    
                    $("#article-id")
                        .append("<p data-id='"
                            + data[i]._id + "'>"
                            + data[i].title + "<br />"
                            + data[i].summary + "<br />"
                            + data[i].link + "</p>");
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    })

});