function validar() {

    let nombreDueno = document.getElementById("nombre-dueno").value
    let nombreMascota = document.getElementById("nombre-mascota").value
    let telefono = document.getElementById("telefono").value
    let email = document.getElementById("email").value
    let fecha = document.getElementById("fecha").value;
    let hoy = new Date().toISOString().split('T')[0];
    let hora = document.getElementById("hora").selectedIndex
    let checkboxes = document.querySelectorAll('.tipo-servicio');
    let algunCheckboxMarcado = Array.from(checkboxes).some(checkbox => checkbox.checked);

    if (nombreDueno === "") {
        document.getElementById("error-nombre-dueno").innerHTML = "Campo obligatorio";
        return false;
    } else {
        document.getElementById("error-nombre-dueno").innerHTML = "";
    }

    if (nombreMascota === "") {
        document.getElementById("error-nombre-mascota").innerHTML = "Campo obligatorio";
        return false;
    } else {
        document.getElementById("error-nombre-mascota").innerHTML = "";
    }

    if (telefono === "") {
        document.getElementById("error-tel").innerHTML = "Campo obligatorio";
        return false;
    } else {
        document.getElementById("error-tel").innerHTML = "";
    }

    if (email === "") {
        document.getElementById("error-email").innerHTML = "Campo obligatorio";
        return false;
    } else if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)/.test(email))) {
        document.getElementById("error-email").innerHTML = "Ingrese un mail válido";
        return false;
    } else {
        document.getElementById("error-email").innerHTML = "";
    }

    if (!algunCheckboxMarcado) {
        document.getElementById("error-servicio").innerHTML = "Elija al menos un servicio";
        return false;
    }

    if (fecha === "") {
        document.getElementById("error-fecha").innerHTML = "Seleccione una fecha";
        return false;
    } else if (fecha < hoy) {
        document.getElementById("error-fecha").innerHTML = "Fecha inválida";
        return false;
    } else {
        document.getElementById("error-fecha").innerHTML = "";
    }

    if (hora == null || hora == 0) {
        document.getElementById("error-hora").innerHTML = "Seleccione un horario";
        return false;
    }

    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Turno reservado exitosamente!",
        showConfirmButton: true
      });

    return true;
}