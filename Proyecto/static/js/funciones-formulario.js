//Fucion de validacon
// 
//esta fucion lee los campos por ID y aplica logia a los valores
// si todos los valores son los requeridos devuelve true y permite el envio del formulario
// de lo contrario retorna false y el uuario tiene que verificar el campo indicado

function validacion(){
    let nombre = document.getElementById("firstname").value; 
    let apellido = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let indice = document.getElementById("tipoconsulta").selectedIndex;
        if( nombre == '') {
            //document.querySelector("error-firstname").innerHTML = "Debes completar este casillero!"
            alert("Debe completar el casillero Nombre!")
            return false;
        } else if(apellido == '' ){

            alert("Debe completar el casillero apellido!")
            return false;
        }else if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)/.test(email)) ){
            alert("Ingrese un mail valido!")
            return false;
        }else if (indice == null || indice == 0){
            alert("Debe elegir un tipo de consulta!")
            return false;
        }
        
        return true
}


//  Expreciones generales que encontre
 
//  !(/\w+([-+.']\w+)*@\w+([-.]\w+)/.test(email)) verificacion de email Ej: "asd@asd.com"
//  indice == null || indice == 0 verifica que se haya elejido una opcion de un menu
