const presupuesto = new Presupuesto();
const tablaFlujo = document.getElementById('TableIngresos');
const tablaCostosDirectos = document.getElementById('TableDirectos');
const tablaAdministrativos = document.getElementById('TableAdministrativos');
const tablaRecursos = document.getElementById('TableAsignacion');
const btnAgregarC = document.getElementById('addColumn');
const btnEliminarC = document.getElementById('delColumn');
const btnIngresos = document.getElementById('agregarIngresos');
const btnDirectos = document.getElementById('agregarDirectos');
const btnAdmin = document.getElementById('agregarAdmin');
const btnRecursos = document.getElementById('agregarRecursos');

cargarEventos();

function cargarEventos() {
    tablaFlujo.addEventListener('click', (e) => { presupuesto.eliminarFila(e) });
    tablaCostosDirectos.addEventListener('click', (e) => { presupuesto.eliminarFila(e) });
    tablaAdministrativos.addEventListener('click', (e) => { presupuesto.eliminarFila(e) });
    tablaRecursos.addEventListener('click', (e) => { presupuesto.eliminarFila(e) });
    btnAgregarC.addEventListener('click', (e) => { presupuesto.agregarColumnas() });
    btnEliminarC.addEventListener('click', (e) => { presupuesto.eliminarColumnas() });
    btnIngresos.addEventListener('click', (e) => { presupuesto.agregarFila('TableIngresos', 'input-ingresos') });
    btnDirectos.addEventListener('click', (e) => { presupuesto.addRowExtra('TableDirectos', 'input-directos') });
    btnAdmin.addEventListener('click', (e) => { presupuesto.addRowExtra('TableAdministrativos', 'input-admon') });
    btnRecursos.addEventListener('click', (e) => { presupuesto.addRows() });
}