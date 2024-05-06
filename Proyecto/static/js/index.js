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
    })
    // y solo se la agrego al punto que corresponde según donde vaya i
    punto[i].classList.add('activo')

    //cuando transcurre el tiempo incremento i en 1 y calculo la nueva posición
    i++;
    posicion = i * -20;
    
    //reinicio i cuando llego al final del carrusel
    if(i>(punto.length-1)){
        i=0
        posicion = i * -20;
    }
    

},2500)