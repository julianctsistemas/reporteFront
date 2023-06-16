//url de la api.
//Al desplegarla en el servidor colocar la api del servidor
const url = 'http://localhost:8082/api/reporte'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //obtener respuesta y convertirla a json
    .then(function(data) {
        let listaReportes = data.reportes
        return listaReportes.map(function(reporte) {
            respuesta += `<tr><td>${reporte.direccion}</td>`+
                    `<td>${reporte.longitud}</td>`+
                    `<td>${reporte.latitud}</td>`+
                    `<td>${reporte.descripcion}</td>`+
                    `<td>${reporte.fechaReporte}</td>`+
                    `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(reporte)})'>Editar</a> 
                    <a class="waves-effect waves-light btn modal-danger red" href="#" onclick='eliminar(${JSON.stringify(reporte._id)})'>Eliminar</a></td></tr>`
                
            body.innerHTML = respuesta

        })
    })
}



const registrar = async () => {

    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitud').value
    let descripcion = document.getElementById('descripcion').value

   
        let reporte = {
            direccion: direccion,
            latitud: latitud,
            longitud: longitud,
            descripcion: descripcion
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(reporte),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            console.log(json.msg)
            //alert(json.msg)//Mensaje que retorna la API
            Swal.fire(
                json.msg,
                '',
                'success'
              )
              setTimeout(() => {
                window.location.href = "listarDatos.html";
              }, 2000); // Cambia el tiempo de espera si es necesario
        })
        
   
          
    }


const editar = (reporte) => {

    document.getElementById('direccion').value =''
    document.getElementById('latitud').value =''
    document.getElementById('longitud').value =''
    document.getElementById('descripcion').value =''
    document.getElementById('id').value =''


    document.getElementById('id').value = reporte._id
    document.getElementById('direccion').value = reporte.direccion
    document.getElementById('latitud').value = reporte.latitud
    document.getElementById('longitud').value = reporte.longitud
    document.getElementById('descripcion').value = reporte.descripcion
}

const actualizar = async () => {
    let id = document.getElementById('id').value;
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitud').value
    let descripcion = document.getElementById('descripcion').value

        let reporte = {
            direccion: direccion,
            latitud: latitud,
            longitud: longitud,
            descripcion: descripcion
        }
        fetch(url + `?id=${id}`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(reporte),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            Swal.fire(
                json.msg,
                '',
                'success'
              ).then(() => {
                location.reload();
              })
        })
    
    }


    


    const eliminar = (id) => {
        Swal.fire({
            title: '¿Está seguro de realizar la eliminación?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let reporte = {
                    _id: id
                };

                fetch(url + `?id=${id}`, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then((resp) => resp.json())
                .then(json => {
                    Swal.fire(
                        json.msg,//mensaje que retorna la
                        '',
                        'success'
                    ).then(() => {
                        location.reload();//Para recargar la pagina
                    });
                });
            }
        });
    };








if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar').addEventListener('click', registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}

if (url.includes("/listarDatos")) {
    // Analizar la cadena de consulta de la URL
    var queryString = url.split('?')[1];
    var params = new URLSearchParams(queryString);
    // Leer el valor del parámetro "parametro1"
    var reporte = params.get('reporte');
    consultarEmpleado(reporte);
  }



