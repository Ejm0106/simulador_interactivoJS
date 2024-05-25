let entradasCompradas = JSON.parse(localStorage.getItem('entradasCompradas')) || [];
let sectoresDisponibles = ["general", "preferencial", "vip", "vip premium"];
let preciosUnitarios = [20, 30, 50, 100];
let capacidadSectores = [100, 100, 50, 50];

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
        } else {
            mostrarMensaje(`Lo sentimos, el sector ${sector.toUpperCase()} está agotado. Quedan ${entradasDisponibles} entradas disponibles.`);
        }
    }
}

function actualizarCarrito() {
    const carritoUl = document.getElementById('carrito');
    carritoUl.innerHTML = '';
    entradasCompradas.forEach((entrada, index) => {
        const li = document.createElement('li');
        li.textContent = `Sector: ${entrada.sector.toUpperCase()}, Cantidad: ${entrada.cantidad}, Precio: ${entrada.precioUnitario * entrada.cantidad} EUR`;
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

function finalizarCompra() {
    entradasCompradas = [];
    localStorage.removeItem('entradasCompradas');
    actualizarCarrito();
    mostrarMensaje('Compra finalizada con éxito.');
}