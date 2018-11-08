$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        getShows(searchText);
        e.preventDefault();
    })
});

function getMovies(searchText) {
    let page = 1
    axios.get('https://www.omdbapi.com/?s=' + searchText + '&page='+page+'&type=movie&apikey=8932b140')
        .then((response) => {
            console.log(response);
            let allMovies = response.data.Search;

            let output = '';

            if(response.data.Response === "False"){
                output += `
                <div class="error">
                <h1>-Invalid Entry-</h1>
                <h4>Please Enter a Valid Search</h4>
                </div>`
            }else{

                const movies = allMovies.filter(function(movie){
                    if(movie.Type === "movie"){
                        return true;
                    }
                });

                
                $.each(movies, (index, movie) => {
                    output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}" alt="pic">
                        <div class="content">
                            <h5>${movie.Title}</h5>
                            <h5>${movie.Year}</h5>
                            <div id="genre"></div>
                            
                        </div>
                        <div class="botton">
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-dark" href="#">Movie Details</a>
                        </div>
                    </div>
                </div>
                `;
                });
            }

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err)
        });
        page++
}

function movieSelected(id) {
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {

    let movieID = sessionStorage.getItem('movieID');

    let page = 1
    axios.get('https://www.omdbapi.com?i=' + movieID + '&page='+page+'&apikey=8932b140')
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
            <div class="row">
                <div class="col-md-4">
                     <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="well2">
                <div class="detail_content">
                    <h3>Plot</h3>
                    <p>${movie.Plot}</p>
                    <hr>
                    <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-dark">View IMDB</a>
                     <a onclick="window.history.back(); return false;" href="#" class="btn btn-primary">Go Back To Search</a>
                     </div>
                </div>
            </div>
            `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });

}



function getShows(searchText) {
    axios.get('https://www.omdbapi.com/?s=' + searchText + '&type=series&apikey=8932b140')
        .then((response) => {
            console.log(response);
            let allShows = response.data.Search;

            let output = '';

            if(response.data.Response === "False"){
                output += `
                <div class="error">
                <h1>-Invalid Entry-</h1>
                <h4>Please Enter a Valid Search</h4>
                </div>`
            }else{

                const shows = allShows.filter(function(show){
                    if(show.Type == ("series" || "episode")){
                        return true;
                    }
                });

                
                $.each(shows, (index, show) => {
                    output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${show.Poster}" alt="pic">
                        <div class="content">
                            <h5>${show.Title}</h5>
                            <h5>${show.Year}</h5>
                            <div id="genre"></div>
                            
                        </div>
                        <div class="botton">
                        <a onclick="showSelected('${show.imdbID}')" class="btn btn-dark shows" href="#">Show Details</a>
                        </div>
                    </div>
                </div>
                `;
                });
            }

            $('#shows').html(output);
        })
        .catch((err) => {
            console.log(err)
        });
}

function showSelected(id) {
    sessionStorage.setItem('showID', id);
    window.location = 'show.html';
    return false;
}

function getShow() {

    let showID = sessionStorage.getItem('showID');

    axios.get('https://www.omdbapi.com?i=' + showID + '&apikey=8932b140')
        .then((response) => {
            console.log(response);
            let show = response.data;

            let output = `
            <div id="shows">
            <div class="row">
                <div class="col-md-4">
                     <img src="${show.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${show.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${show.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${show.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${show.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${show.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${show.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${show.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${show.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="well2">
                <div class="detail_content">
                    <h3>Plot</h3>
                    <p>${show.Plot}</p>
                    <hr>
                    <a href="http://imdb.com/title/${show.imdbID}" target="_blank" class="btn btn-dark">View IMDB</a>
                     <a href="index.html" class="btn btn-primary">Go Back To Search</a>
                     </div>
                </div>
            </div>
            </div>
            `;

            $('#show').html(output);
        })
        .catch((err) => {
            console.log(err);
        });

}