const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición con fetch con JSON.
 * @param {string} url - la URL a la que se le realizará la petición
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE)
 * @param {string} [data=null] - los datos a enviar en el cuerpo de la petición
 * @returns {Promise<object>} - una promesa que resuelve con la promesa en formato JSON
 */

async function fetchData(url, method, data=null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null, // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
        const response = await fetch(url, options); // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json(); // Devuelve la respuesta en formato JSON
    } catch (error){
        console.error('Fetch error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Ocurrió un error durante la carga de datos. Por favor intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return; 
    }
}

/**
*Funcion que permite crear un elemento <tr> para la tabla de productos por medio del uso de template string de JS.
*/

async function showProductos(){
    let productos = await fetchData(BASEURL+'/api/productos/', 'GET');
    
    //buscar elemento HTML donde quiero insertar los productos
    const tbodyProductos = document.querySelector('#list-table-products tbody');
    
    //limpio el contenido de la tabla
    tbodyProductos.innerHTML = '';
    productos.forEach((product) => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${product.id_producto}</td>
                        <td>${product.nombre}</td>
                        <td>${product.marca}</td>
                        <td>${product.precio}</td>
                        <td>${product.cantidad}</td>                        
                        <td>
                            <button type="button" class="button-editar" onclick='updateProducto(${product.id_producto})'><i class="fa fa-pencil" ></button></i>
                        </td>
                        <td>
                            <button type="button" class="button-eliminar" onclick='deleteProducto(${product.id_producto})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyProductos.insertAdjacentHTML('beforeend',tr);
    });
}    

/**
* Función para comunicarse con el servidor para poder Crear o Actualizar un registro de producto
* @returns
*/

async function saveProducto(){

    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-crud');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-producto').value;
    const inputNombre = document.querySelector('#nombre').value;
    const inputMarca = document.querySelector('#marca').value;
    const inputPrecio = document.querySelector('#precio').value;
    const inputCantidad = document.querySelector('#cantidad').value;    

    console.log("INPUT ID", inputId);

    //Realizo una validación simple de acuerdo al contenido del value del input del nombre del producto evitando campos vacíos o ceros
    if(inputNombre.trim() == '' || inputMarca.trim() == '' || inputPrecio.trim() == '' || inputCantidad.trim() < 1){

        Swal.fire({
            title: 'Error!',
            text: 'Por favor corrija el o los campos incorrectos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    // Crea un objeto con los datos del producto
    const productData = {
        nombre: inputNombre,
        marca: inputMarca,
        precio: inputPrecio,
        cantidad: inputCantidad,
    };

    let result = null;
    
    // Si hay un inputId, realiza una petición PUT para actualizar el producto existente
    if(inputId!==""){
        result = await fetchData(`${BASEURL}/api/productos/${inputId}`, 'PUT', productData);
    }else{
    // Si no hay inputId, realiza una petición POST para crear un nuevo producto
    result = await fetchData(`${BASEURL}/api/productos/`, 'POST', productData);
    }

    //Se limpian los inputs del formulario
    form.reset();
    
    Swal.fire({
        title: 'Producto agregado exitosamente!',
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })

    showProductos();
}    


/**
* Function que permite eliminar un producto del array de acuedo al indice del mismo
* @param {number} productId posición del array que se va a eliminar
*/

function deleteProducto(productId){
    Swal.fire({
        title: "¿Está seguro que desea eliminar el producto seleccionado?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await fetchData(`${BASEURL}/api/productos/${productId}`, 'DELETE');
            showProductos();
            Swal.fire({
                title: 'El producto ha sido eliminado',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
        }
    });
}


/**
* Function que permite cargar el formulario con los datos del producto para su edición
* @param {number} productId id del producto que se quiere editar
*/
async function updateProducto(productId){
    //Buscamos en el servidor el produto de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/productos/${productId}`, 'GET');
    //Se buscan los elementos HTML del input
    const inputId = document.querySelector('#id-producto');
    const inputNombre = document.querySelector('#nombre');
    const inputMarca = document.querySelector('#marca');
    const inputPrecio = document.querySelector('#precio');
    const inputCantidad = document.querySelector('#cantidad');  
    //Se cargan los inputs con los valores del producto encontrada
    inputId.value = response.id_producto;
    inputNombre.value = response.nombre;
    inputMarca.value = response.marca;
    inputPrecio.value = response.precio;
    inputCantidad.value = response.cantidad;
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveProducto = document.querySelector('#btn-save-producto');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveProducto.addEventListener('click',saveProducto);
    showProductos();
});