let entradasCompradas = [];
let sectoresDisponibles = ["general", "preferencial", "vip", "vip premium"];
let preciosUnitarios = [20, 30, 50, 100];
let nombresSectores = ["General", "Preferencial", "VIP", "VIP Premium"];

function obtenerPrecioUnitario(sector) {
    let indice = sectoresDisponibles.indexOf(sector.toLowerCase());
    if (indice !== -1) {
        return preciosUnitarios[indice];
    }
    return null;
}

function filtrarPorSector(sector) {
    return entradasCompradas.filter(entrada => entrada.sector === sector);
}

function verificarEntradasDisponibles(sector) {
    let entradasDisponibles = 0;
    let indice = sectoresDisponibles.indexOf(sector);
    if (indice !== -1) {
        let entradasCompradasEnSector = filtrarPorSector(sector).reduce((total, entrada) => total + entrada.cantidad, 0);
        entradasDisponibles = entradasCompradasEnSector < preciosUnitarios[indice] ? preciosUnitarios[indice] - entradasCompradasEnSector : 0;
    }
    return entradasDisponibles;
}

function iniciarCompra() {
    let cantidad = parseInt(prompt("Ingrese la cantidad de entradas que desea comprar (máximo 4):"));

    if (!isNaN(cantidad) && cantidad > 0 && cantidad <= 4) {
        let sector = prompt("Seleccione el sector (General, Preferencial, VIP, VIP Premium):").toLowerCase();

        let precioUnitario = obtenerPrecioUnitario(sector);

        if (precioUnitario !== null) {
            let entradasDisponibles = verificarEntradasDisponibles(sector);
            if (entradasDisponibles >= cantidad) {
                let totalCompra = cantidad * precioUnitario;
                alert(`¡Compra exitosa! Ha comprado ${cantidad} entradas en el sector ${sector.toUpperCase()}. Total: $${totalCompra}`);
                let nuevaEntrada = { cantidad: cantidad, sector: sector, precioUnitario: precioUnitario };
                entradasCompradas.push(nuevaEntrada);
            } else {
                alert(`Lo sentimos, el sector ${sector.toUpperCase()} está agotado. Quedan ${entradasDisponibles} entradas disponibles.`);
            }
        } else {
            alert("El sector ingresado no es válido. Por favor, seleccione entre General, Preferencial, VIP o VIP Premium.");
        }
    } else {
        alert("Por favor, ingrese una cantidad válida de entradas (máximo 4).");
    }

    alert("Gracias por visitar el Santiago Bernabéu. ¡Hala Madrid!");
    mostrarEntradasCompradas();
}

function mostrarEntradasCompradas() {
    console.log("Entradas compradas:");
    nombresSectores.forEach(sector => {
        let entradasPorSector = filtrarPorSector(sector.toLowerCase());
        entradasPorSector.forEach((entrada, index) => {
            console.log(`Entrada ${index + 1}: Cantidad: ${entrada.cantidad}, Sector: ${entrada.sector}, Precio Unitario: $${entrada.precioUnitario}`);
        });
    });
}