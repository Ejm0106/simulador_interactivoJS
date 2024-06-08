document.addEventListener('DOMContentLoaded', () => {
    const sectoresDisponibles = ["general", "preferencial", "vip", "vip premium"];
    const nombresSectores = ["General", "Preferencial", "VIP", "VIP Premium"];
    const preciosImagenes = [
        { sector: "general", img: "./resources/General.jpg" },
        { sector: "preferencial", img: "./resources/Preferencial.jpg" },
        { sector: "vip", img: "./resources/VIP.jpg" },
        { sector: "vip premium", img: "./resources/VIP-premiun-este-norte.png"},
    ];

    const sectoresDiv = document.getElementById('sectores');
    preciosImagenes.forEach(({ sector, img }) => {
        const sectorContainer = document.createElement('div');
        sectorContainer.classList.add('sector-container');

        const sectorImg = document.createElement('img');
        sectorImg.src = img;
        sectorImg.alt = `Sector ${nombresSectores[sectoresDisponibles.indexOf(sector)]}`;
        sectorImg.classList.add('sector-image');

        const sectorLabel = document.createElement('span');
        sectorLabel.classList.add('sector-label');
        sectorLabel.textContent = nombresSectores[sectoresDisponibles.indexOf(sector)];

        sectorContainer.appendChild(sectorImg);
        sectorContainer.appendChild(sectorLabel);
        sectoresDiv.appendChild(sectorContainer);
    });

    const compraDiv = document.getElementById('compra');
    compraDiv.innerHTML = `
        <label for="sectorSelect">Seleccione el sector:</label>
        <select id="sectorSelect">
            ${sectoresDisponibles.map(sector => `<option value="${sector}">${nombresSectores[sectoresDisponibles.indexOf(sector)]}</option>`).join('')}
        </select>
        <label for="cantidadInput">Cantidad de entradas:</label>
        <input type="number" id="cantidadInput" min="1" max="4" value="1">
        <button id="agregarCarrito">Agregar al Carrito</button>
    `;

    const agregarCarritoBtn = document.getElementById('agregarCarrito');
    const comprarBtn = document.getElementById('comprar');
    
    agregarCarritoBtn.addEventListener('click', agregarAlCarrito);
    comprarBtn.addEventListener('click', finalizarCompra);

    actualizarCarrito();
});