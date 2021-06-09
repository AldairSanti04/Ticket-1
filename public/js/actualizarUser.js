let form = document.getElementById('formModificar');
let nombres = document.getElementById('nombres');
let apellidos = document.getElementById('apellidos');
let usuario = document.getElementById('usuario');
let pass = document.getElementById('password');

class Usuarios {
    constructor(){
        this.id = "",
        this.nombre = "",
        this.user = "",
        this.email = "",
        this.token = ""
    }

    static async guardaUsuario (usuario) {
        localStorage.setItem("dataUsuario", JSON.stringify(usuario))
    }

    static async recuperaUsuario () {
        let resultado = await JSON.parse(localStorage.getItem('dataUsuario'))
        return resultado
    }
}

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let info = await Usuarios.recuperaUsuario();
    let id = info.id;
    let email = info.email;
    let resultado = await fetch("http://localhost:3000/usuario/" + id, { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "nombres": nombres.value,
            "apellidos": apellidos.value,
            "usuario": usuario.value,
            "email": email,
            "pass": pass.value
        })
    })
    let vuelta = await resultado.json();
    if(vuelta.error){
        Swal.fire({
            title: `${vuelta.error}`,
            icon: "error",
          });
    } else {
        let data = await Usuarios.recuperaUsuario();
        data.user = vuelta.user.usuario;
        data.id = vuelta.user.id;
        data.email = vuelta.user.email;
        data.nombre = vuelta.user.nombres + " " + vuelta.user.apellidos;
        data.token = vuelta.token;
        Usuarios.guardaUsuario(data);
            location.href = '/index'
    }
})

function cancelUpdate() {
    Swal.fire({
        title: '¿Seguro que quiere salir?',
        text: 'Los cambios no se van a guardar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location = '/index'
            }
        })
}

function eliminar(id) {
    Swal.fire({
        title: '¿Seguro que quiere eliminar su cuenta?',
        text: 'Esta acción no se puede cambiar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    let resultado = fetch("http://localhost:3000/delete/" + id, {
                    method: 'get',
                    headers: {
                        "Accept": "application/json, text/plain, *,*",
                        "Content-Type": "application/json",
                    }
                    })
                    if(resultado.status == 400){
                        Swal.fire({
                            title: "No tienes permiso para eliminar usuarios" ,
                            icon: "error",
                          });
                    } else {
                        Swal.fire({
                            title: "Usuario Eliminado Correctamente",
                            icon: "success",
                        });
                        localStorage.removeItem('dataUsuario');
                        setTimeout(() => {
                        window.location = '/login'
                        }, 1500);
                    }
        
                } catch (error) {
                    Swal.fire({
                        title: "No tienes permiso para eliminar usuarios",
                        icon: "error",
                      });
                }
            } else {
                Swal.fire({
                    title: "Usuario no eliminado",
                    icon: "success",
                  });
            }
        })
}