let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Actualiza el botón del carrito al cargar la página
document.querySelector('.boton-carrito').innerText = `🛒 Carrito (${carrito.length})`;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio }); // Asegúrate de que el precio sea un número
    alert(`${nombre} ha sido agregado al carrito.`);
    
    // Actualizar el texto del carrito en el header
    document.querySelector('.boton-carrito').innerText = `🛒 Carrito (${carrito.length})`;
    // Guardar el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = ''; // Limpiar la lista de productos
    let total = 0;

    // Mostrar los productos en el carrito
    carrito.forEach((producto, index) => {
        listaProductos.innerHTML += `
            <div class="producto-carrito">
                <p>${producto.nombre} - $${producto.precio.toLocaleString('es-CO')}</p>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </div>`;
        total += producto.precio; // Sumar el precio al total
    });

    // Mostrar el total formateado en pesos colombianos
    document.getElementById('total').innerText = `Total: $${total.toLocaleString('es-CO')}`;
}

function eliminarProducto(index) {
    // Eliminar el producto del carrito
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el localStorage
    mostrarCarrito(); // Volver a mostrar el carrito actualizado
    document.querySelector('.boton-carrito').innerText = `🛒 Carrito (${carrito.length})`; // Actualizar el texto del carrito
}

function finalizarCompra() {
    alert("Gracias por tu compra! Tu pedido será entregado pronto.");
    carrito = []; // Vaciar el carrito
    localStorage.removeItem('carrito'); // Limpiar el localStorage
    mostrarCarrito(); // Actualizar vista del carrito
}

// Llama a mostrarCarrito() en la página de carrito para mostrar los productos.
if (document.title === "Carrito de Compras") {
    mostrarCarrito();
}