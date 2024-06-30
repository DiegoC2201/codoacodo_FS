class Producto{

    constructor(id,producto,marca,peso,cantidad=1){
        this.id=id;
        this.producto=producto;
        this.marca=marca;
        this.peso=peso;
        this.cantidad=cantidad;
    }

}


function showProductos(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    //buscar elemento HTML donde quiero insertar los productos
    const tbodyProductos = document.querySelector('#list-table-products tbody');

    //limpio el contenido de la tabla
    tbodyProductos.innerHTML = '';
    productos.forEach(product => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${product.producto}</td>
                        <td>${product.marca}</td>
                        <td>${product.peso}</td>
                        <td>${product.cantidad}</td>                        
                        <td>
                            <button type="button" class="button-editar" onclick='updateProducto(${product.id})'><i class="fa fa-pencil" ></button></i>
                        </td>
                        <td>
                            <button type="button" class="button-eliminar" onclick='deleteProducto(${product.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyProductos.insertAdjacentHTML('beforeend',tr);
    });

}

/* funcion que permite agregar un producto al listado de productos almacenado en el localstorage */

function saveProducto(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-carrito');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-producto');
    const inputProducto = document.querySelector('#producto');
    const inputMarca = document.querySelector('#marca');
    const inputPeso = document.querySelector('#peso');
    const inputCantidad = document.querySelector('#cantidad');    
    // const inputBanner = document.querySelector('#banner-form');

    //Realizo una validación simple de acuerdo al contenido del value del input del producto evitando campos vacíos o ceros
    if(inputProducto.value.trim() == '' || inputMarca.value.trim() == '' || inputPeso.value.trim() < 1 || inputCantidad.value.trim() < 1){

        Swal.fire({
            title: 'Error!',
            text: 'Por favor corrija el o los campos incorrectos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })

        
    }else{
        //Busca en localstorage el item productos, si no existe asigna el array vacio.
        let productos = JSON.parse(localStorage.getItem('productos')) || [];

        if(inputId.value!==""){
            //Busco dentro del arraya de productos el objeto a editar
            const productFind = productos.find(producto => producto.id == inputId.value);
            //Si existe actualizo el objeto
            if (productFind) {
              productFind.producto = inputProducto.value;
              productFind.marca = inputMarca.value;
              productFind.cantidad = inputCantidad.value;
              productFind.peso = inputPeso.value;
            }
        }else{
            let newProducto = new Producto(
                productos.length+1,
                inputProducto.value,
                inputMarca.value,
                inputPeso.value,
                inputCantidad.value,
            );
            productos.push(newProducto);
        }

       

        //Se actualiza el array de productos en el localstorage
        localStorage.setItem('productos',JSON.stringify(productos));
        showProductos();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            title: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }

}


/** 
*Function que permite cargar el formulario para editar un producto de acuedo al id del producto
*@param {number} productId id producto que se va a actualizar 
*/

function updateProducto(productId){
    let productos = JSON.parse(localStorage.getItem('productos'));
    //se utiliza el metodo find para poder asegurarnos que exista el producto con el id que queremos aditar.
    let productToUpdate = productos.find(producto => producto.id===productId);
    if(productToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-producto');
        const inputProducto = document.querySelector('#producto');
        const inputMarca = document.querySelector('#marca');
        const inputPeso = document.querySelector('#peso');
        const inputCantidad = document.querySelector('#cantidad');  
        //Se cargan los inputs con los valores del producto encontrado
        inputId.value = productToUpdate.id;
        inputProducto.value = productToUpdate.producto;
        inputMarca.value = productToUpdate.marca;
        inputPeso.value = productToUpdate.peso;
        inputCantidad.value = productToUpdate.cantidad;
    }
}


/**  
* Function que permite eliminar un producto del array del localstorage de acuedo al indice del mismo
* @param {number} productId id producto que se va a eliminar
*/

function deleteProducto(productId){
    let productos = JSON.parse(localStorage.getItem('productos'));
    //se utiliza el metodo find para poder asegurarnos que exista un producto con el id que queremos eliminar.
    let productToDelete = productos.find(producto => producto.id===productId);
    if(productToDelete){
        //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
        productos = productos.filter(producto => producto.id !== productToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('productos',JSON.stringify(productos));
        showProductos();
        Swal.fire({
            title: 'Exito!',
            text: 'El producto fue eliminada.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}



// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveProducto = document.querySelector('#btn-save-producto');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveProducto.addEventListener('click',saveProducto);
    showProductos();
});