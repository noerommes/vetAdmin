// CLASES Y OBJETOS A UTILIZAR EN EL PROYECTO.

// Clase Citas.
class Citas {

    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita ];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }

}

// Clase UI.
class UI {

   
    mostrarAlerta(mensaje, tipo) {

        //Crear el div para añadir las citas al panel de las citas.
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase según el tipo de alerta.
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //Agregar el contenido de la alerta.
        divMensaje.textContent = mensaje;

        //Agregar la alerta.
        formulario.querySelector('#leyenda').insertAdjacentElement('afterend', divMensaje);

        //Borrar la alerta tras 3 segundos.
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarCitas({citas}) {

        //Limpiar las citas del panel de las citas para agregar el array de citas completo.
        this.limpiarHTML();

        citas.forEach((cita) => {

            //Destructuring de cada cita para manipular los elementos de la cita.
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita.
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';

            //Agregar la función eliminarCita() onclick().
            btnEliminar.onclick = () => eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 7.125l-1.687 1.688M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>';

            //Agregar la función cargarEdicion() onclick().
            btnEditar.onclick = () => cargarEdicion(cita);

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        });

        //Sincronizar en el localStorage los elementos del array Citas una vez mostrados en el panel.
        sincronizarStorage();
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

// Objeto cita.
const cita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
};





// LAS VARIABLES DEL PROYECTO.
const inputMascota = document.querySelector('#mascota');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHoras = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;





// TODOS LOS EVENTLISTENERS.
eventListeners();

function eventListeners() {
    inputMascota.addEventListener('input', datosCita);
    inputPropietario.addEventListener('input', datosCita);
    inputTelefono.addEventListener('input', datosCita);
    inputFecha.addEventListener('input', datosCita);
    inputHoras.addEventListener('input', datosCita);
    inputSintomas.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        // Recupera los tweets del almacenamiento local y los inicializa si es nulo
        administrarCitas.citas = JSON.parse(localStorage.getItem('citas')) || [];
        ui.mostrarCitas(administrarCitas);
        
    });
}





// DECLARACIONES DE LOS NUEVOS OBJETOS.
const ui = new UI();
const administrarCitas = new Citas();





// TODAS LAS FUNCIONES DEL PROYECTO.

// Función para llenar cada propiedad del objeto cita según el e.target.
function datosCita(e) {
    cita[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas.
function nuevaCita(e) {

    e.preventDefault();

    //Destructuring del objeto cita.
    const { mascota, propietario, telefono, fecha, hora, sintomas } = cita;

    // Validar los campos del formulario.
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || sintomas === '' || hora === '') {

        // Ante campos vacíos, que UI muestre una alerta.
        ui.mostrarAlerta('Todos los campos son obligatorios.', 'error');
        return;

    }

    if (editando) {

        // Editar la cita ya que se está editando.
        administrarCitas.editarCita({ ...cita });
        // Alerta para mostrar que se ha editado correctamente.
        ui.mostrarAlerta('Editado Correctamente.');
        // Cambiar texto del boton.
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        // Una vez editado pasa editar a falso.
        editando = false;

    }else{

        // Generar un id único.
        cita.id = Date.now();
        // Añadir las citas.
        administrarCitas.agregarCita({ ...cita });
        // Alerta para mostrar que se ha añadido correctamente.
        ui.mostrarAlerta('Se agregó correctamente.');

    }

    // Reiniciar tanto el formulario como el objeto para crear una cita.
    formulario.reset();
    reiniciarObjeto();

    // Mostrar todas las citas
    ui.mostrarCitas(administrarCitas);

}

// Función para que se reinicie también el objeto.
function reiniciarObjeto() {
    
    //Recorrer todas las propiedades del objeto cita para vaciarlos.';
    Object.keys(cita).forEach((propiedad) => {
        cita[propiedad] = '';
    });

}

//Función para que se borre una cita a través del id proporcionado.
function eliminarCita(id) {

    //Para borrar del array la cita seleccionada.
    administrarCitas.eliminarCita(id);

    //Para volver a mostrar las citas después que de borrar la seleccionada.
    ui.mostrarCitas(administrarCitas);

}

//Función para editar la cita.
function cargarEdicion(citaRecibida) {

    //Editando pasa a ser true.
    editando = true;

    //Destructuring de el objeto citaRecibida.
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = citaRecibida;

    //LLenar los inputs.
    inputMascota.value = mascota;
    inputPropietario.value = propietario;
    inputTelefono.value = telefono;
    inputFecha.value = fecha;
    inputHoras.value = hora;
    inputSintomas.value = sintomas;

    //Volver a llenar el objeto cita con los valores de la citaRecibida.
    cita.mascota = mascota;
    cita.propietario = propietario;
    cita.telefono = telefono;
    cita.fecha = fecha;
    cita.hora = hora;
    cita.sintomas = sintomas;
    cita.id = id;

    //Cambiar el texto del botón.
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
}

//Función para agrega las citas actuales al storage.
function sincronizarStorage() {
    localStorage.setItem('citas', JSON.stringify(administrarCitas.citas));
}
