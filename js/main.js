let entradasCompradas = JSON.parse(localStorage.getItem('entradasCompradas')) || [];
let sectoresDisponibles = [];
let preciosUnitarios = [];
let capacidadSectores = [];

async function cargarDatosDesdeJSON() {
    try {
        const response = await fetch('js/data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos desde JSON:', error);
        return null;
    }
}

async function inicializarDatos() {
    const data = await cargarDatosDesdeJSON();
    if (data) {
        sectoresDisponibles = data.sectoresDisponibles;
        preciosUnitarios = data.preciosUnitarios;
        capacidadSectores = data.capacidadSectores;
    } else {
        console.error('No se pudieron cargar los datos desde JSON. Se usarán valores predeterminados.');
    }
}


inicializarDatos();


function eliminarEntradas() {
    entradasCompradas = [];
    localStorage.removeItem('entradasCompradas');
    actualizarCarrito();
}


document.getElementById('eliminarEntradas').addEventListener('click', function () {
    if (entradasCompradas.length > 0) {
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres eliminar todas las entradas del carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarEntradas();
                mostrarConfirmacionEliminado();
            }
        });
    }
});


function mostrarConfirmacionEliminado() {
    Swal.fire(
        'Eliminado',
        'Todas las entradas del carrito han sido eliminadas.',
        'success'
    );
}


function agregarAlCarrito() {
    const sectorSelect = document.getElementById('sectorSelect');
    const cantidadInput = document.getElementById('cantidadInput');
    let cantidad = parseInt(cantidadInput.value);
    let sector = sectorSelect.value;
    let precioUnitario = obtenerPrecioUnitario(sector);

    if (!isNaN(cantidad) && cantidad > 0 && cantidad <= 4 && precioUnitario !== null) {
        let entradasDisponibles = verificarEntradasDisponibles(sector);
        if (entradasDisponibles >= cantidad) {
            let nuevaEntrada = { cantidad, sector, precioUnitario };
            entradasCompradas = [...entradasCompradas, nuevaEntrada];
            localStorage.setItem('entradasCompradas', JSON.stringify(entradasCompradas));
            actualizarCarrito();
            mostrarMensajeToastify('Entrada agregada al carrito', '#4CAF50');
        } else {
            mostrarMensaje(`Lo sentimos, el sector ${sector.toUpperCase()} está agotado. Quedan ${entradasDisponibles} entradas disponibles.`);
        }
    }
}


function mostrarMensajeToastify(mensaje, color) {
    Toastify({
        text: mensaje,
        duration: 1000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: color,
        stopOnFocus: true, 
    }).showToast();
}


function obtenerPrecioUnitario(sector) {
    let indice = sectoresDisponibles.indexOf(sector.toLowerCase());
    return indice !== -1 ? preciosUnitarios[indice] : null;
}


function filtrarPorSector(sector) {
    return entradasCompradas.filter(entrada => entrada.sector === sector);
}


function verificarEntradasDisponibles(sector) {
    let indice = sectoresDisponibles.indexOf(sector.toLowerCase());
    if (indice !== -1) {
        let entradasCompradasEnSector = filtrarPorSector(sector).reduce((total, entrada) => total + entrada.cantidad, 0);
        return capacidadSectores[indice] - entradasCompradasEnSector;
    }
    return 0;
}


function actualizarCarrito() {
    const carritoUl = document.getElementById('carrito');
    carritoUl.innerHTML = '';
    entradasCompradas.forEach((entrada, index) => {
        const li = document.createElement('li');
        li.textContent = `Sector: ${entrada.sector.toUpperCase()}, Cantidad: ${entrada.cantidad}, Precio: ${entrada.precioUnitario * entrada.cantidad} EUR`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.style.backgroundColor = '#ff5c5c'; 
        eliminarBtn.style.color = 'white'; 
        eliminarBtn.addEventListener('click', () => eliminarEntrada(index));
        li.appendChild(eliminarBtn);    

        carritoUl.appendChild(li);
    });
}


function mostrarMensaje(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('mensaje');
    mensajeDiv.textContent = mensaje;
    document.body.insertBefore(mensajeDiv, document.getElementById('sectores'));
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}


function eliminarEntrada(index) {
    entradasCompradas.splice(index, 1);
    localStorage.setItem('entradasCompradas', JSON.stringify(entradasCompradas));
    actualizarCarrito();
    mostrarMensajeToastify('Entrada eliminada del carrito', '#FF0000'); // Rojo
}


function finalizarCompra() {
    entradasCompradas = [];
    localStorage.removeItem('entradasCompradas');
    actualizarCarrito();
    Swal.fire(
        '¡Compra Exitosa!',
        'Esperamos disfrutes el juego.',
        'success'
    );
}