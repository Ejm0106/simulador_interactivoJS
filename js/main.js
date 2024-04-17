function iniciarCompra() {
    let continuar = true;

    while (continuar) {
        let cantidad = prompt("Ingrese la cantidad de entradas que desea comprar:");
        cantidad = parseInt(cantidad);

        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, ingrese una cantidad válida de entradas.");
            continue;
        }

        let sector = prompt("Seleccione el sector (General, Preferencial, VIP):").toLowerCase();

        let precioUnitario;

        switch (sector) {
            case "general":
                precioUnitario = 20;
                break;
            case "preferencial":
                precioUnitario = 30;
                break;
            case "vip":
                precioUnitario = 50;
                break;
            default:
                alert("El sector ingresado no es válido. Por favor, seleccione entre General, Preferencial o VIP.");
                continue;
        }

        let totalCompra = cantidad * precioUnitario;
        alert(`¡Compra exitosa! Ha comprado ${cantidad} entradas en el sector ${sector.toUpperCase()}. Total: $${totalCompra}`);

        continuar = confirm("¿Desea realizar otra compra?");
    }

    alert("Gracias por visitar el Santiago Bernabéu. ¡Hala Madrid!");
}
