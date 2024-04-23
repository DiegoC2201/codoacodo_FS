const grande = document.querySelector('.grande');
const punto = document.querySelectorAll('.punto');

//Cuando hago CLICK en un punto quiero
    // Saber la posición del punto
    // Aplicar un transform translateX al grande
    // Quitar la clase ACTIVO a todos los puntos
    // Añadir la clase ACTIVO al punto seleccionado

punto.forEach( (cadaPunto, i)=> {
    punto[i].addEventListener('click', ()=>{

        let posicion = i
        //queremos que cuando la posiión sea 0, el transformX sea 0
        //cuando la posició>n sea 1, el transformX sea -20%
        //cuando la posició>n sea 2, el transformX sea -40%
        //cuando la posició>n sea 3, el transformX sea -60%
        //cuando la posició>n sea 4, el transformX sea -80%
        //por lo tanto la operación debería ser posicion * -20%
        let operacion = posicion * -20

        //movemos el div grande
        grande.style.transform = `translateX(${ operacion }%)`

        //quito la clase activo a todos los puntos
        punto.forEach( (cadaPunto, i)=>{
            punto[i].classList.remove('activo')
        })
        // y solo se la agrego al punto en el que se hizo click
        punto[i].classList.add('activo')
    })
})