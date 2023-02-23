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
    1,
    "Faith No More",
    "King For A Day",
    "./images/faith-no-more-king-for-a-day.png",
    3000,
  )
);
lista_productos.push(
  new Productos(
    2,
    "Iron Maiden",
    "Fear of the Dark",
    "./images/iron-maiden-fear.jpg",
    3500,
  )
);
lista_productos.push(
  new Productos(
    3,
    "Primus",
    "Antipop",
    "./images/primus-antipop.jpeg",
    4000,
    )
);
lista_productos.push(
  new Productos(
    4,
    "AC/DC",
    "Live",
    "./images/ac-dc-live",
    3800,
    )
);
lista_productos.push(
  new Productos(
    5,
    "Guns 'N' Roses",
    "Apetite for Destruction",
    "./images/guns-n-roses-apetite.jpg",
    3600,
  )
);
lista_productos.push(
  new Productos(
    6,
    "Pearl Jam",
    "Ten",
    "./images/pearl-jam-ten.jpg",
    3900,
    )
);

console.log(lista_productos);

// RENDER PRODUCTOS

let productos_agregar = document.querySelector(".productos");
function renderizarProductos() {
  lista_productos.forEach((producto) => {
    productos_agregar.innerHTML += `
    <div class='card' style='width: 18rem;'>
    <img src='${producto.imgSrc}' class='card-img-top card_img' alt='imagen ${producto.nombre}'>
    <div class='card_body'>
      <h4 class='card_title_artista'>${producto.nombre_artista}</h4>
      <h5 class='card_title_album'>${producto.nombre_album}</h5>
      <h5 class='card_precio'>${producto.precio}$</h5>

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

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

let btn_agregar = document.querySelectorAll(".btn_agregar_carrito");

for (let btn of btn_agregar) {
  btn.addEventListener("click", agregar_a_carrito);
}

function agregar_a_carrito(e) {
  let button = e.target;

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
    nombre_artista: nombreProductoArtista,
    nombre_album: nombreProductoAlbum,
    precio: precioProducto,
    cantidad: 1,
    img: imagenProducto,
  };
  carrito.push(producto_carrito);
  mostrar_total_carrito();
  mostrar_carrito();
  guardarSession();
}

mostrar_carrito();

function mostrar_carrito() {
  let tabla = document.getElementById("carrito-items");
  tabla.innerHTML = "";

  for (let producto of carrito) {
    let fila = document.createElement("tr");
    fila.innerHTML = `<td><img src="${producto.img}" width="80px"></td>
                      <td><p class="nombre_producto_artista">${producto.nombre_artista}</p></td>
                      <td><p class="nombre_producto_album">${producto.nombre_album}</p></td>
                      <td class="prod_carrito_unidades">Unidades: ${producto.cantidad}</td>
                      <td class="prod_carrito_precio">${producto.precio}</td>
                      <button class="btn btn-danger button btn_borrar_elemento">ELIMINAR</button>`;

    tabla.append(fila);
    
  }

}

// let precioTotal = carrito.reduce((acc, prod) => acc + prod.precio, 0)
// console.log(precioTotal);




let btn_borrar_elemento = document.querySelectorAll(".btn_borrar_elemento");

for (let btn of btn_borrar_elemento) {
  btn.addEventListener("click", eliminar_producto);
}

function eliminar_producto(e) {
  e.target.parentNode.remove();
  console.log("BORRANDO");
  //  mostrar_carrito ();
}

console.log(carrito);

const mostrar_total_carrito = () => {

const total_a_pagar = carrito.reduce((acc, item) => acc + parseInt(item.precio), 0);

document.getElementById("carrito_precio_total").innerHTML = `$${total_a_pagar}`;
console.log(total_a_pagar);
}

