// ACORDEON - SECCIóN SERVICIOS

const bloque = document.querySelectorAll('.bloque-h');
const titular = document.querySelectorAll('.titular');
const descipcion = document.querySelectorAll('.descripcion-acord');

//cuando haga click en TITULAR,
    //Quitamos la clase ACTIVO de todos los BLOQUE
    //Añadimos la clase ACTIVO al BLOQUE con la posición del TITULAR seleccionado

//recorro todos los titulares
titular.forEach( (cadaTitular, i)=>{
    //asigno un click a cada titular
    titular[i].addEventListener('click', ()=>{
        //recorro todos los bloques
        bloque.forEach( (cadaBloque, i)=>{
            // remuevo la clase activo de cada bloque
            bloque[i].classList.remove('activo')
        })
        //añado la clase activo al bloque cuya posición sea la del titular seleccionado
        bloque[i].classList.add('activo')
    })
});

//cuando haga click en la DESCRIPCION,
    //Quitamos la clase ACTIVO de todos los BLOQUE

//recorro todos las descripciones
descipcion.forEach( (cadaDescripcion, i)=>{
    //asigno un click a cada descripción
    descipcion[i].addEventListener('click', ()=>{
        //recorro todos los bloques
        bloque.forEach( (cadaBloque, i)=>{
            // remuevo la clase activo de cada bloque
            bloque[i].classList.remove('activo')
        })
    })
});


// CARROUSEL - SECCIóN SERVICIOS

const grande = document.querySelector('.grande');
const punto = document.querySelectorAll('.punto');


let i = 0;
let posicion = 0;

//queremos que cuando la posiión sea 0, el transformX sea 0
//cuando la posició>n sea 1, el transformX sea -20%
//cuando la posició>n sea 2, el transformX sea -40%
//cuando la posició>n sea 3, el transformX sea -60%
//cuando la posició>n sea 4, el transformX sea -80%
//por lo tanto la operación debería ser posicion * -20%

setInterval(function(){
    if (grande) {
        grande.style.transform = `translateX(${ posicion }%)`;

        //quito la clase activo a todos los puntos
        punto.forEach( (cadaPunto, i)=>{
        punto[i].classList.remove('activo')
        });
        // y solo se la agrego al punto que corresponde según donde vaya i
        punto[i].classList.add('activo');
    
        //cuando transcurre el tiempo incremento i en 1 y calculo la nueva posición
        i++;
        posicion = i * -20;
    
        //reinicio i cuando llego al final del carrusel
        if(i>(punto.length-1)){
            i=0
            posicion = i * -20;
        }    
    }
},2500);


// AGREGAR NOTA - DETALLE PRODUCTOS

//se usa el "." cuando hacemos referencia a una clase
//se usa el "#" cuando hacemos referencia a un id

const parrafo = document.querySelector("#nota");
    
function addNote() {
    // la funcion verifica que elemento parrafo se encuentre en el DOM
    if (parrafo) {
        parrafo.innerHTML = "A la espera de aprender <br>carga dinámica de datos con JS";
        console.log('Nota agregada');
    } else {
        console.error('El elemento #nota no se encuentra en el DOM');
    }
}

//const enlace =  document.querySelector(".pendiente");
//enlace.addEventListener("click", addNote);

addNote();


// EFECTO QUE MUESTRA U OCULTA LA NAV OCULTA EN DISPOSITIVOS MOVILES
// Muestra la barra de navegación cuando se hace clic en el logo y la cierra cuando se hace clic en cualquier elemento del menú.

//se ejecuta cuando todo el HTML del documento ha sido completamente cargado 
document.addEventListener('DOMContentLoaded', function() {
    // verifica el ancho de la pantalla coicida con dispositivos moviles y que el usuario se encuentre en index.html (de lo contrario, en otros dispositivos o cuando el usuario se encuentra en otra pagina del sitio, al hacer clic sobre el logo se redirija al index,html)
    if (window.matchMedia("(max-width: 575px)").matches && window.location.pathname.endsWith('/index.html')) {
        // se seleccionan los elementos del DOM
        const logo = document.querySelector('#logo a');
        const nav = document.querySelector('nav');
        const navItems = document.querySelectorAll('nav ul li a');

        // se escucba el click sobre el logo
        logo.addEventListener('click', function(event) {
            // se previene el comportamiento por defecto del click en el logo que es un enlace
            event.preventDefault();
            // se agrega la clase active al nav para que puedan aplicarse los estilos establecidos en el css y el nav se muestre
            nav.classList.toggle('active');
        }); 

        // se recorren todos los elementos del nav
        navItems.forEach(function(item) {
            // se escucha el click en cada elemento
            item.addEventListener('click', function() {
                // cuando ocurre el click en algun elemento, se quita la clase active a la nev, lo que permite que se oculte
                nav.classList.remove('active');
            });
        });
    }
});

