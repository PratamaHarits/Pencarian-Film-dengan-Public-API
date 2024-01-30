//Function tampilkan movieList
function searchMovies(){
    //Kosongkan movieList
    $('#movieList').html('');
    //Panggil API
    $.ajax({
        type: "get",
        url: "http://www.omdbapi.com/",
        data: {
            'apikey': '532b224c',
            's': $('#inputText').val()
        },
        dataType: "json",
        success: function (result) {
            // console.log(result);
            if(result.Response == "True"){
                let movies = result.Search;
                $.each(movies, function (i, data) { 
                    $('#movieList').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title+`</h5>
                                    <p>Release : `+ data.Year+`<br>Type : `+ data.Type+`</p>
                                    <a href="#" class="btn btn-outline-secondary" id="detailButton" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="`+ data.imdbID+`">Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
                //Kosongkan inputText
                $('#inputText').val('')

            }else{
                // console.log(result.Error);
                $('#movieList').html('<h1 class="text-center text-danger ">'+ result.Error +'</h1>');
                $('#inputText').val('')
            }
        }
    });
}

$('#buttonSearch').on('click', function () {
    searchMovies();
});

//Fungsi enter pada inputText
$('#inputText').on('keyup', function (e) {
    if(e.which == 13){
        searchMovies();
    }
});

//Script detail movie
$('#movieList').on('click', '#detailButton', function () {
    // console.log($(this).data('id'));
    $.ajax({
        type: "get",
        url: "http://www.omdbapi.com/",
        data: {
            'apikey': '532b224c',
            'i': $(this).data('id')
        },
        dataType: "json",
        success: function (movie) {
            if(movie.Response == "True"){
                $('#modalBody').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4"><img src="`+ movie.Poster +`" class="img-fluid"></div>
                            <div class="col-md-8">
                                <h3 class="text-center">`+ movie.Title +`</h3>
                                <hr>
                                <p class="text-center"><b>`+ movie.Director +`</b> | `+ movie.Actors +`</p>
                                <hr>
                                <p class="text-justify"> Sinopsis : `+ movie.Plot +`</p>
                                <hr>
                                <p class="text-center">`+ movie.Rated +` | `+ movie.Runtime +` | `+ movie.Genre +`</p>
                            </div>
                        </div>
                    </div> 
                `);
            }
        }
    });
});
