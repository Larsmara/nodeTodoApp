jQuery(document).ready(function(){

    $(".todo").on("click", "li", function () {
        $(this).toggleClass("completed");
    });

    $("ul").on("click", "span", function(){
        const id = $(this).attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: 'todo/' + id,
            success: function(respone){
                alert("Deleted");
                window.location.href="/";
            },
            error: function(err){
                console.log(err);
            }
        });
    })

});