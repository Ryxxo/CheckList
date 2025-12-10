let productos = JSON.parse(localStorage.getItem("inventario")) || [];
let modoComprar = false;

function guardar() {
  localStorage.setItem("inventario", JSON.stringify(productos));
}

function render() {
  const tabla = document.getElementById("lista");
  tabla.innerHTML = "";

  productos.forEach((p, i) => {
    if (modoComprar && !p.comprar) return;

    const row = `
      <tr>
        <td><img src="${p.foto}" class="product-img"></td>
        <td>${p.nombre}</td>
        <td><input value="${p.cantidad}" oninput="actualizarCantidad(${i}, this.value)"></td>
        <td><input type="checkbox" ${p.comprar ? "checked" : ""} onchange="toggleComprar(${i})"></td>
        <td><button class="delete-btn" onclick="eliminar(${i})">X</button></td>
      </tr>
    `;

    tabla.innerHTML += row;
  });
}

function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;
  const archivoFoto = document.getElementById("foto").files[0];

  if (!nombre || !cantidad || !archivoFoto) {
    alert("Faltan datos o la foto.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    productos.push({
      nombre,
      cantidad,
      foto: e.target.result,
      comprar: false
    });

    guardar();
    render();
  };

  reader.readAsDataURL(archivoFoto);

  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("foto").value = "";
}

function actualizarCantidad(i, val) {
  productos[i].cantidad = val;
  guardar();
}

function toggleComprar(i) {
  productos[i].comprar = !productos[i].comprar;
  guardar();
}

function eliminar(i) {
  productos.splice(i, 1);
  guardar();
  render();
}

function mostrarComprar() {
  modoComprar = !modoComprar;
  render();
}

render();
