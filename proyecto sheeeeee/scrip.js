

let seleccionar = "peliculas.json"; 
let alertBox = document.getElementById('alerta');
let infoContainer = document.getElementById('info-container');
let infoPopup = document.createElement('div');
infoPopup.classList.add('info-popup');
infoContainer.appendChild(infoPopup);

let selector = document.getElementById('tipo');
selector.addEventListener('change', (event) => {
    let nuevoSeleccion = event.target.value;
    if (seleccionar !== nuevoSeleccion) {
        seleccionar = nuevoSeleccion;
        showAlert(`Se ha cambiado a ${nuevoSeleccion === 'peliculas.json' ? 'Películas' : 'Series'}`);
    }
});


function showAlert(message) {
    alertBox.textContent = message;
    alertBox.classList.add('visible');

    setTimeout(() => {
        alertBox.classList.remove('visible');
    }, 2000);
}

let searchInput = document.getElementById('titulo');
let searchButton = document.getElementById('buscar');
let resultados = document.getElementById('resultados');

searchButton.addEventListener('click', buscar);

function buscar() {
    let query = searchInput.value.toUpperCase().trim();
    resultados.innerHTML = '';

    fetch(seleccionar)
        .then(response => {
            if (!response.ok) throw new Error('Error en la red');
            return response.json();
        })
        .then(data => {
            let items = data;
            let foundItems = items.filter(item => item.titulo.toUpperCase().startsWith(query));

            if (foundItems.length > 0) {
                foundItems.forEach(item => {
                    let li = document.createElement('li');
                    li.textContent = item.titulo;
                    li.dataset.info = JSON.stringify(item);

                    li.addEventListener('mouseover', showInfo);
                    li.addEventListener('mouseout', hideInfo);

                    resultados.appendChild(li);
                });
            } else {
                resultados.innerHTML = '<li>No se encontraron resultados.</li>';
            }
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function showInfo(event) {
    let item = JSON.parse(event.currentTarget.dataset.info);
    infoPopup.innerHTML = `
        <h3>${item.titulo}</h3>
        <p>${item.descripcion}</p>
        <p>Año: ${item.año}</p>
        <p>Actores: ${item.actores.join(', ')}</p>
    `;
    infoPopup.classList.add('visible');
}

function hideInfo() {
    infoPopup.classList.remove('visible');
}
