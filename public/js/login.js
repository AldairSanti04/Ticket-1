let form = document.getElementById('formLogin');
let user = document.getElementById('user');
let pass = document.getElementById('password');

class Usuarios {
    constructor(user, pass){
        this.user = user,
        this.pass = pass,
        this.id = "",
        this.nombre = "",
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
    Usuarios.guardaUsuario(new Usuarios(user.value, pass.value));
    let resultado = await fetch("http://localhost:3000/login", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "usuario": user.value,
            "pass": pass.value
        })
    })
    let vuelta = await resultado.json();
    if(vuelta.error){
        swal({
            title: `${vuelta.error}`,
            icon: "error",
          });
    } else {
        let data = await Usuarios.recuperaUsuario();
        data.tipo = vuelta.user.tipo_usuario;
        data.id = vuelta.user.id;
        data.email = vuelta.user.email;
        data.nombre = vuelta.user.nombres + " " + vuelta.user.apellidos;
        data.token = vuelta.token;
        Usuarios.guardaUsuario(data);
            location.href = '/index'
    }
})