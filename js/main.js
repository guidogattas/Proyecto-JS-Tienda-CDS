// LISTA DE PRODUCTOS
class Productos {
  constructor(id, nombre_artista, nombre_album, imgSrc, precio, stock) {
    this.id = id;
    this.nombre_artista = nombre_artista;
    this.nombre_album = nombre_album;
    this.imgSrc = imgSrc;
    this.precio = precio;
  }
}

let lista_productos = [];

lista_productos.push(
  new Productos(
    "CD001",
    "Faith No More",
    "King For A Day",
    "./images/faith-no-more-king-for-a-day.png",
    3000
  )
);
lista_productos.push(
  new Productos(
    "CD002",
    "Iron Maiden",
    "Fear of the Dark",
    "./images/iron-maiden-fear.jpg",
    3500
  )
);
lista_productos.push(
  new Productos(
    "CD003",
    "Primus",
    "Antipop",
    "./images/primus-antipop.jpeg",
    4000
  )
);
lista_productos.push(
  new Productos("CD004", "AC/DC", "Live", "./images/ac-dc-live", 3800)
);
lista_productos.push(
  new Productos(
    "CD005",
    "Guns 'N' Roses",
    "Apetite for Destruction",
    "./images/guns-n-roses-apetite.jpg",
    3600
  )
);
lista_productos.push(
  new Productos(
    "CD006",
    "At The Drive In",
    "Relationship of Command",
    "./images/at-the-drive-in-relationship.webp",
    2600
  )
);
lista_productos.push(
  new Productos(
    "CD007",
    "Slipknot",
    "Day of the Gusano",
    "./images/slipknot-day.jpg",
    3600
  )
);
lista_productos.push(
  new Productos(
    "CD008",
    "Stone Temple Pilots",
    "Core",
    "./images/stone-temple-pilots-core.webp",
    3750
  )
);
lista_productos.push(
  new Productos(
    "CD009",
    "Soundgarden",
    "Badmotorfinger",
    "./images/soundgarden-badmotorfinger.jpg",
    3750
  )
);
lista_productos.push(
  new Productos(
    "CD010",
    "Iron Maiden",
    "The Number of the Beast",
    "./images/iron-maiden-the-number-of-the-beast.jpg",
    3650
  )
);
lista_productos.push(
  new Productos(
    "CD011",
    "Dropkick Murphys",
    "The Gang's All Here",
    "./images/dropkick-murphys-gangsallhere.jpg",
    2800
  )
);
lista_productos.push(
  new Productos(
    "CD012",
    "Alice In Chains",
    "Dirt",
    "./images/alice-in-chains-dirt.webp",
    3550
  )
);
// RENDER PRODUCTOS

let productos_agregar = document.querySelector(".productos");

function renderizarProductos() {
  lista_productos.forEach((producto) => {
    productos_agregar.innerHTML += `
    <div class='card'>
    <img src='${producto.imgSrc}' class='card-img-top card_img' alt='imagen ${producto.nombre}'>
    <div class='card_body'>
      <h4 class='card_title_artista'>${producto.nombre_artista}</h4>
      <h5 class='card_title_album'>${producto.nombre_album}</h5>
      <h5 class='card_precio'>${producto.precio}$</h5>
      <h6 id='card_id'>${producto.id}</h6>

      <button class='btn_agregar_carrito'>AGREGAR AL CARRITO</button>

    </div>

  </div>
    `;
  });
}

renderizarProductos();

const guardarSession = () => {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
};

// TOTAL CARRITO

const carrito_total = () => {
  const valor_total = document.getElementById("carrito_precio_total");

  let total_a_pagar = 0;
  carrito.forEach((item) => {
    const precio = parseInt(item.precio);
    const cantidad = parseInt(item.cantidad);
    total_a_pagar += precio * cantidad;
  });

  valor_total.innerHTML = `$${total_a_pagar}`;
  guardarSession();
};

// CARRITO

let btn_agregar = document.querySelectorAll(".btn_agregar_carrito");

for (let btn of btn_agregar) {
  btn.addEventListener("click", agregar_a_carrito);
}

// AGREGAR A CARRITO

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

function agregar_a_carrito(e) {
  let button = e.target;

  let idProducto = button.parentElement.querySelector("#card_id").textContent;
  let nombreProductoArtista = button.parentElement.querySelector(
    ".card_title_artista"
  ).textContent;
  let nombreProductoAlbum =
    button.parentElement.querySelector(".card_title_album").textContent;
  let precioProducto =
    button.parentElement.querySelector(".card_precio").textContent;
  let imagenProducto =
    button.parentElement.parentElement.querySelector("img").src;

  let producto_carrito = {
    idProducto: idProducto,
    nombre_artista: nombreProductoArtista,
    nombre_album: nombreProductoAlbum,
    precio: precioProducto,
    cantidad: 1,
    img: imagenProducto,
  };

  aumentar_producto__carrito(producto_carrito);
}

// AUMENTAR PRODUCTO CARRITO

function aumentar_producto__carrito(producto_carrito) {
  const inputProductoUnidades =
    document.getElementsByClassName("input_unidades");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].idProducto === producto_carrito.idProducto) {
      carrito[i].cantidad++;
      const inputValorNuevoUnidades = inputProductoUnidades[i];
      inputValorNuevoUnidades.value++;
      carrito_total();
      return null;
    }
  }

  carrito.push(producto_carrito);
  render_carrito();
  guardarSession();
}

render_carrito();

// RENDER CARRITO

function render_carrito() {
  let tabla = document.getElementById("carrito-items");
  tabla.innerHTML = "";

  for (let producto of carrito) {
    let fila = document.createElement("tr");
    fila.innerHTML = `<td><img src="${producto.img}" width="80px">
                      <p class="id_producto">${producto.idProducto}</p></td>
                      <td><p class="nombre_producto_artista">${producto.nombre_artista}</p></td>
                      <td><p class="nombre_producto_album">${producto.nombre_album}</p></td>
                      <input type="number" min="1" class="input_unidades" value=${producto.cantidad}>
                      <td class="prod_carrito_precio">${producto.precio}</td>
                      <button class="btn btn-danger button btn_borrar_elemento">ELIMINAR</button>`;

    tabla.append(fila);
    carrito_total();
    guardarSession();
  }

  // AUMENTAR CLICKEANDO BOTON INPUT

  let btn_input = document.querySelectorAll(".input_unidades");

  for (let btn of btn_input) {
    btn.addEventListener("change", sumaCantidad);
  }

  function sumaCantidad(e) {
    const input = e.target;
    const id = input.parentElement.querySelector(".id_producto").textContent;


    carrito.forEach((producto) => {
        input.value < 1 ? (input.value = 1) : input.value;
        producto.cantidad = input.value;
        carrito_total();
    });
  }

  // BORRAR ELEMENTOS

  let btn_borrar_elemento = document.querySelectorAll(".btn_borrar_elemento");

  for (let btn of btn_borrar_elemento) {
    btn.addEventListener("click", eliminar_producto);
  }

  function eliminar_producto(e) {
    let padre = e.target.parentNode;
    let producto_eliminar = padre.querySelector(".id_producto").textContent;

    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].idProducto === producto_eliminar) {
        carrito.splice(i, 1);
        padre.remove();
        carrito_total();
      }
    }
  }

  carrito_total();
}

carrito_total();
guardarSession();

console.log (carrito);