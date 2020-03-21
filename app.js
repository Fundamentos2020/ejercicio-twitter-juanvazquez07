const listaTweets = document.getElementById('lista-tweets');


eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    
    listaTweets.addEventListener('click', borrarTweet);

    document.addEventListener('DOMContentLoaded', localStorageListo);

}
//Añadir el tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    
    //crear elemento y añadirle el contenido de la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    li.innerHTML='<img src="https://picsum.photos/200" class="izquierda"/>';

    //añade el boton de borrar el tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //añadir a local storage
    agregarTweetLocalStorage(tweet);
}

function agregarFoto(){

}

function borrarTweet(e){
   e.preventDefault();
   
   if(e.target.className == 'borrar-tweet'){
    e.target.parentElement.remove();
    console.log(e.target.parentElement.textContent);
    borrarTweetLocalStorage(e.target.parentElement.innerText);
   }
}

function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
    
        //crear elemento y añadirle el contenido de la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        li.innerHTML='<img src="https://picsum.photos/200" class="izquierda"/>';


        //añade el boton de borrar el tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.push(tweet);

    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function obtenerTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets') == null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;

    tweetBorrar = tweet.substring(0, tweet.length-1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar == tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}
