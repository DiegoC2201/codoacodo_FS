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
        if( nombre === '' || nombre.length < 3) {
            Swal.fire({
                title: "No indicaste tu nombre!",
                text: "Asegurate de completar el casillero correctamente!",
                icon: "error"
              });
            return false;
        } else if(apellido === '' || apellido.length < 3){
           Swal.fire({
            title: "No indicaste tu apellido!",
            text: "Asegurate de completar el casillero correctamente!",
            icon: "error"
          });
            return false;
        }else if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)/.test(email)) ){
            Swal.fire({
                title: "No indicaste tu mail!",
                text: "Asegurate de completar el casillero correctamente!",
                icon: "error"
              });
            return false;
        }else if (indice == null || indice == 0){
            Swal.fire({
                title: "No indicaste tu consulta!",
                text: "Debes elegir una de las opciones!",
                icon: "error"
              });
            return false;
        }
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Su conslta fue enviada!",
            showConfirmButton: false,
            timer: 15000
          });
        return true
}

//  Expreciones generales que encontre
 
//  !(/\w+([-+.']\w+)*@\w+([-.]\w+)/.test(email)) verificacion de email Ej: "asd@asd.com"
//  indice == null || indice == 0 verifica que se haya elejido una opcion de un menu
