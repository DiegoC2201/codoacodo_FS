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


},2500);


// AGREGAR NOTA - DETALLE PRODUCTOS

//se usa el "." cuando hacemos referencia a una clase
//se usa el "#" cuando hacemos referencia a un id

const parrafo = document.querySelector("#nota");


    
function addNote(){
    parrafo.innerHTML = "A la espera de aprender <br>carga dinámica de datos con JS";
    console.log('hola');
}

//const enlace =  document.querySelector(".pendiente");
//enlace.addEventListener("click", addNote);



addNote();
