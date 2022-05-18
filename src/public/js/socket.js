var socket = io();

var text;
document.getElementById('search').addEventListener('keyup', function() {
    if(this.value != ''){
        socket.emit('titulo', this.value);
    }else{
        console.log('debe escribir un titulo');
    }
});


socket.on('resultados_db', (data) => {
    // console.log(data.length);

    for(const index in data){
        const card_search = document.getElementById('output');

        card_search.innerHTML = `
        <div class="card">
        <div class="card-image">
            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data[index].poster_path}" alt="">
        </div>
        <div class="card-info">
            <span>${data[index].original_title}</span>
            <span>Año: ${data[index].release_date}</span>
            <span>idioma: ${data[index].original_language}</span>
        </div>
    </div>
        `
    }
})