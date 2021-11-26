var moviesArray = [];
var oldTitle;
var pageStatus = "INSERT";
var elementToModify;
var component;

class Movie{

    static counterMovies = 0;

    constructor(title, genre, description){
        this._title = title;
        this._genre = genre;
        this._description = description;
        this._idMovie = ++Movie.counterMovies;
    }
    
    get title(){
        return this._title;
    }
    set title(title){
        this._title = title;
    }
    get genre(){
        return this._genre;
    }
    set genre(genre){
        this._genre = genre;
    }
    get description(){
        return this._description;
    }
    set description(desciption){
        this._description = desciption;
    }
    get idMovie(){
        return this._idMovie;
    }
}

class UI {
    addMovie(movieTitle,movieGenre,movieDescription){
        const movieList = document.getElementById("movies-list");
        const element = document.createElement("div");
        var repeated = false;

        if (moviesArray.length == 0){
            const movie = new Movie(movieTitle,movieGenre,movieDescription);
            moviesArray.push(movie);
        }else{
            moviesArray.forEach(element=>{
                if(element.title.toLowerCase() == movieTitle.toLowerCase()){
                    repeated = true;
                    this.showMessage("Título repetido", "warning");
                }
            });
            if(!repeated){
                const movie = new Movie(movieTitle,movieGenre,movieDescription);
                moviesArray.push(movie);
            }
        }
        var lastMovie = moviesArray.length-1;
        if(!repeated){
            element.innerHTML = `
            <div class="card text-center mb-2">
                <div class="card-body" id="${moviesArray[lastMovie].idMovie}">
                    <strong>Título: </strong> ${moviesArray[lastMovie].title}
                    <strong>Género: </strong> ${moviesArray[lastMovie].genre}
                    <strong>Descripción: </strong> ${moviesArray[lastMovie].description}
                    &nbsp;&nbsp;
                    <a href="#top" class="btn btn-warning" name="edit">
                        Editar
                    </a>
                    &nbsp;&nbsp;
                    <a href="#top" class="btn btn-danger" name="delete">
                        Borrar
                    </a>
                </div>
            </div>
        `;
        movieList.appendChild(element);
        getMovieCount(); 
        this.showMessage("Película guardada", "success");
        }     
    }

    updateMovie(movieTitle,movieGenre,movieDescription){
        var timesRepeated = 0;
        const movieList = document.getElementById("movies-list");
        const element = document.createElement("div");

        moviesArray[elementToModify].title = movieTitle;
        moviesArray[elementToModify].genre = movieGenre;
        moviesArray[elementToModify].description = movieDescription;
        var lastMovie = moviesArray.length-1;
            element.innerHTML = `
            <div class="card text-center mb-2">
                <div class="card-body" id="${moviesArray[lastMovie].idMovie}">
                    <strong>Título: </strong> ${moviesArray[lastMovie].title}
                    <strong>Género: </strong> ${moviesArray[lastMovie].genre}
                    <strong>Descripción: </strong> ${moviesArray[lastMovie].description}
                    &nbsp;&nbsp;
                    <a href="#top" class="btn btn-warning" name="edit">
                        Editar
                    </a>
                    &nbsp;&nbsp;
                    <a href="#top" class="btn btn-danger" name="delete">
                        Borrar
                    </a>
                </div>
            </div>
        `;
        component.parentElement.parentElement.parentElement.remove();
        movieList.appendChild(element); 
        this.showMessage("Película guardada", "success"); 
        pageStatus = "INSERT";
        getMovieCount();
    }

    resetForm(){
        document.getElementById("movie-form").reset();
    }

    deleteMovie(element){
        if(element.name === "delete"){
         element.parentElement.parentElement.parentElement.remove();
         this.showMessage("Película eliminada", "danger");
         getMovieCount();
        }
        resetForm();
    }

    editMovie(element){
        if(element.name === "edit"){
            elementToModify = element.parentElement.id-1;
            document.getElementById("title").value = moviesArray[elementToModify].title;
            document.getElementById("genre").value = moviesArray[elementToModify].genre;
            document.getElementById("description").value = moviesArray[elementToModify].description;
            pageStatus = "UPDATE";
            getMovieCount();
        }
    }

    showMessage(message, style){
        const div = document.createElement("div");
        div.className = `alert alert-${style}`;
        div.appendChild(document.createTextNode(message));
        //Showing in DOM
        const container = document.querySelector(".main-container");
        const row = document.querySelector(".row");
        container.insertBefore(div,row);
        setTimeout(()=>{
            document.querySelector(".alert").remove();
        },2000);
    }
}

//DOM
function getMovieCount(){
    const movieList = document.getElementById("movies-list");
    var movieCount = movieList.childElementCount;
    document.getElementById("movie-count").innerHTML = "Total de películas agregadas: " + movieCount;
}

getMovieCount();

document.getElementById("movie-form")
    .addEventListener("submit", (e)=>{
    e.preventDefault();
    const movieTitle = document.getElementById("title").value;
    const movieGenre = document.getElementById("genre").value;
    const movieDescription = document.getElementById("description").value;
    const ui = new UI();
    if(movieTitle === "" || movieDescription === "" || movieGenre === ""){
        ui.showMessage("Faltan datos por llenar", "warning");
    }else{
        if(pageStatus == "INSERT"){
            ui.addMovie(movieTitle,movieGenre,movieDescription);
            ui.resetForm();
        }else{
            ui.updateMovie(movieTitle,movieGenre,movieDescription);
            ui.resetForm();
        }
    }
});

document.getElementById("movies-list").addEventListener("click",(e)=>{
    const ui = new UI();
    const deleteBtn = e.target;
    ui.deleteMovie(deleteBtn);
});

document.getElementById("movies-list").addEventListener("click",(e)=>{
    const ui = new UI();
    const editBtn = e.target;
    component = editBtn;
    ui.editMovie(editBtn);
});

