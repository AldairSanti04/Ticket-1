//Utilidades
let mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
let mesSelector = 0;
let firstCol = true;
let numCols = 0;

class Presupuesto{

    //Funciones para Agregar Columnas a todas las Tablas
    agregarColumnas() {
        if(firstCol){
            Swal.fire({
            title: 'Selecciona el Mes Inicial',
            input: 'select',
            inputOptions: {
                0: 'Enero',
                1: 'Febrero',
                2: 'Marzo',
                3: 'Abril',
                4: 'Mayo',
                5: 'Junio',
                6: 'Julio',
                7: 'Agosto',
                8: 'Septiembre',
                9: 'Octubre',
                10: 'Noviembre',
                11: 'Diciembre',
            },
            showCancelButton: true,
                inputValidator: (value) => {
                    mesSelector = value;
                    this.addColEditYN('TableFlujo', 'input-flujo', mes[value]);
                    this.addColNoEdit('TableEstado', 'input-estado', mes[value]);
                    this.addColEditExtra('TableIngresos', 'input-ingresos', mes[value]);
                    this.addColEditExtra('TableDirectos', 'input-directos', mes[value]);
                    this.addColEditExtra('TableAdministrativos', 'input-admon', mes[value]);
                    this.addColEditExtra('TableAsignacion', 'input-asignacion', mes[value]);
                    this.addColNoEditV2('TableCostos', 'input-costos', mes[value]);
                    this.addColNoEditV2('TableRCostos', 'input-resumen', mes[value]);
                    firstCol = false;
                    numCols++
                }
            })
        } else {
            if(mesSelector == 11){
                mesSelector = 0;
                this.addColEditYN('TableFlujo', 'input-flujo', mes[mesSelector]);
                this.addColNoEdit('TableEstado', 'input-estado', mes[mesSelector]);
                this.addColEditExtra('TableIngresos', 'input-ingresos', mes[mesSelector]);
                this.addColEditExtra('TableDirectos', 'input-directos', mes[mesSelector]);
                this.addColEditExtra('TableAdministrativos', 'input-admon', mes[mesSelector]);
                this.addColEditExtra('TableAsignacion', 'input-asignacion', mes[mesSelector]);
                this.addColNoEditV2('TableCostos', 'input-costos', mes[mesSelector]);
                this.addColNoEditV2('TableRCostos', 'input-resumen', mes[mesSelector]);
                numCols++
            } else {
                mesSelector++;
                this.addColEditYN('TableFlujo', 'input-flujo', mes[mesSelector]);
                this.addColNoEdit('TableEstado', 'input-estado', mes[mesSelector]);
                this.addColEditExtra('TableIngresos', 'input-ingresos', mes[mesSelector]);
                this.addColEditExtra('TableDirectos', 'input-directos', mes[mesSelector]);
                this.addColEditExtra('TableAdministrativos', 'input-admon', mes[mesSelector]);
                this.addColEditExtra('TableAsignacion', 'input-asignacion', mes[mesSelector]);
                this.addColNoEditV2('TableCostos', 'input-costos', mes[mesSelector]);
                this.addColNoEditV2('TableRCostos', 'input-resumen', mes[mesSelector]);
                numCols++
                }
            }
        }

    addColEditYN(tableID, selector, mes) {
        var table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        var rowCount = table.rows.length;
        for(var i=0; i<rowCount; i++){   
            var row = table.rows[i];         
            if(i === 0){
                let newCell = row.insertCell(countCol-1);
                newCell.textContent = `${mes}`
            } else if(i === rowCount-3) {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" disabled type="number" class="form-control ${selector}-egresos" step="any">`
            } else if(i === (rowCount-2)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" disabled type="number" class="form-control ${selector}-total-mes" step="any">`
            } else if(i === (rowCount-1)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" disabled type="number" class="form-control ${selector}-acumulado-mes" step="any">`
            } else {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}-ingresos" step="any">`
            }
        }
    }
    
    addColNoEdit(tableID, selector, mes) {
        var table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        var rowCount = table.rows.length;
        for(var i=0; i<rowCount; i++){   
            var row = table.rows[i];         
            if(i === 0){
                let newCell = row.insertCell(countCol-1);
                newCell.textContent = `${mes}`
            } else if(i === (rowCount-1)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" disabled type="number" class="form-control ${selector}-total-mes" step="any">`
            } else if(i === (rowCount-2)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" disabled type="number" class="form-control ${selector}-margen-mes" step="any">`
            } else if(i === rowCount-3) {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" disabled type="number" class="form-control ${selector}-costos" step="any">`
            } else {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" disabled type="number" class="form-control ${selector}-ventas" step="any">`
            }
        }
    }

    addColEditExtra(tableID, selector, mes) {
        var table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        var rowCount = table.rows.length;
        for(var i=0; i<rowCount; i++){   
            var row = table.rows[i];         
            if(i === 0){
                let newCell = row.insertCell(countCol-2);
                newCell.textContent = `${mes}`
            } else if(i === (rowCount-1)){
                let newCell = row.insertCell(countCol-2);
                newCell.innerHTML = `<input disabled value="0" class="form-control ${selector}-total-mes" step="any">`
            }
            else {
                let newCell = row.insertCell(countCol-2);
                newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}" step="any" min="0">`
            }
        }
    }
    
    addColNoEditV2(tableID, selector, mes) {
        var table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        var rowCount = table.rows.length;
        for(var i=0; i<rowCount; i++){   
            var row = table.rows[i];         
            if(i === 0){
                let newCell = row.insertCell(countCol-1);
                newCell.textContent = `${mes}`
            } else if(i === (rowCount-1)){
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input disabled value="0" class="form-control ${selector}-total-mes" step="any">`
            }
            else {
                let newCell = row.insertCell(countCol-1);
                newCell.innerHTML = `<input value="0" disabled class="form-control ${selector}" step="any">`
            }
        }
    }

    //Funciones para eliminar las columnas
    eliminarColumnas(){
        if(numCols == 0){
            Swal.fire({
            icon: 'error',
            title: 'No se puede realizar la acción',
            text: 'No hay columnas que se puedan eliminar',
            })
        } else {
            Swal.fire({
            title: '¿Seguro que quiere eliminar la última columna?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    numCols--;
                    this.eliminarCol('TableFlujo');
                    this.eliminarCol('TableEstado');
                    this.eliminarCol2('TableIngresos');
                    this.eliminarCol2('TableDirectos');
                    this.eliminarCol2('TableAdministrativos');
                    this.eliminarCol2('TableAsignacion');
                    this.eliminarCol('TableCostos');
                    this.eliminarCol('TableRCostos');
                    if(mesSelector == 0){
                        mesSelector = 11;
                    } else {
                        mesSelector--;
                    }
                    if(numCols == 0){
                        firstCol = true;
                    }
                }
            })
        }        
    }
        
    eliminarCol(tableID){
        var table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        var rowCount = table.rows.length;
        for(var i=0; i<rowCount; i++){   
            var row = table.rows[i].cells[countCol-2];    
            row.remove(countCol-1);
        }
    }
        
    eliminarCol2(tableID){
        var table = document.getElementById(tableID);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        var rowCount = table.rows.length;
        for(var i=0; i<rowCount; i++){   
            var row = table.rows[i].cells[countCol-3];    
            row.remove(countCol-2);
        }
    }

    //Funciones para agregar Filas
    agregarFila(tableID, selector) {
        Swal.fire({
            title: 'Ingrese el Concepto',
            input: 'text',
            showCancelButton: true,
            inputValidator: (concepto) => {
                if (!concepto) {
                    return 'Se requiere ingresar el nombre del Concepto'
                } else {
                    var tableRef = document.getElementById(tableID);
                    var newRow   = tableRef.insertRow(1);
                    let countCol = document.getElementById(tableID).rows[0].cells.length
                    for(let i = 0; i < countCol; i++){
                        if(i === 0){
                            var newCell  = newRow.insertCell(i);
                            newCell.textContent = `${concepto}`
                        } else if(i === (countCol-1)){
                            var newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<div class="text-center"><button class="borrar-fila btn btn-outline-danger"><i class='bx bxs-trash-alt'></i></button></div>`
                        } else if(i === (countCol-2)){
                            var newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<input disabled value="0" type="number" class="form-control ${selector}-total-concepto" step="any">`
                        } else {
                            var newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}" step="any">`
                        }
                    }
                }
            }
        })
    }

    addRowExtra(tableID, selector) {
        Swal.fire({
            title: 'Ingrese el Concepto',
            input: 'text',
            showCancelButton: true,
            inputValidator: (concepto) => {
                if (!concepto) {
                    return 'Se requiere ingresar el nombre del Concepto'
                } else {
                    var tableRef = document.getElementById(tableID);
                    var newRow   = tableRef.insertRow(1);
                    let countCol = document.getElementById(tableID).rows[0].cells.length
                    for(let i = 0; i < countCol; i++) {
                        if(i === 0){
                            var newCell  = newRow.insertCell(i);
                            newCell.textContent = `${concepto}`
                        } else if(i == 1) {
                            var newCell  = newRow.insertCell(i);
                            newCell.innerHTML = '<select class="form-select"><option>Opcion 1</option><option>Opcion 2</option><option>Opcion 3</option></select>'
                        } else if(i === (countCol-1)){
                            var newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<div class="text-center"><button class="borrar-fila btn btn-outline-danger"><i class='bx bxs-trash-alt'></i></button></div>`
                        } else if(i === (countCol-2)){
                            var newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<input disabled value="0" type="number" class="form-control ${selector}-total-concepto" step="any">`
                        } else {
                            var newCell  = newRow.insertCell(i);
                            newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}" step="any">`
                        }
                    }
                }
            }
        })
    }

    addRows() {
        Swal.fire({
            title: 'Rol del Recurso',
            input: 'text',
            showCancelButton: true,
            inputValidator: (concepto) => {
                if (!concepto) {
                    return 'Se requiere ingresar el Rol del Recurso'
                } else { 
                    Swal.fire({
                        title: 'Costo Mensual',
                        input: 'number',
                        showCancelButton: true,
                        inputValidator: (costo) => {
                            if (!costo) {
                            return 'Se requiere ingresar el Costo Mensual'
                            } else {
                                this.addRowRecursos('TableAsignacion', 'input-asignacion', concepto, costo)
                                this.addRowHijosRecursos('TableCostos', 'input-costos', concepto)
                                this.addRowHijosRecursos('TableRCostos', 'input-resumen', concepto)
                            }
                        }
                    })
                }
            }
        })
    }

    addRowRecursos(tableID, selector, rol, costo) {
        var tableRef = document.getElementById(tableID);
        var newRow   = tableRef.insertRow(1);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        for(let i = 0; i < countCol; i++){
            if(i === 0){
                var newCell  = newRow.insertCell(i);
                newCell.textContent = `${rol}`
            } else if(i === (countCol-1)){
                var newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<div class="text-center"><button class="borrar-fila btn btn-outline-danger"><i class='bx bxs-trash-alt'></i></button></div>`
            } else if(i === (countCol-2)){
                var newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<input disabled value="0" type="number" class="form-control ${selector}-total-concepto" step="any">`
            } else if(i === 1){
                var newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<input disabled value="${costo}" type="number" class="form-control ${selector}-costo-mensual" step="any">`
            } else {
                var newCell  = newRow.insertCell(i);
                //Cambiar a Porcentaje
                newCell.innerHTML = `<input value="0" type="number" class="form-control ${selector}" step="any">`
            }
        }
    }
        
    addRowHijosRecursos(tableID, selector, rol) {
        var tableRef = document.getElementById(tableID);
        var newRow   = tableRef.insertRow(1);
        let countCol = document.getElementById(tableID).rows[0].cells.length
        for(let i = 0; i < countCol; i++){
            if(i === 0){
                var newCell  = newRow.insertCell(i);
                newCell.textContent = `${rol}`
            } else if(i === (countCol-1)){
                var newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<input disabled value="0" type="number" class="form-control ${selector}-total-concepto" step="any">`
            } else {
                var newCell  = newRow.insertCell(i);
                newCell.innerHTML = `<input value="0" disabled type="number" class="form-control ${selector}" step="any">`
            }
        }
    }
    
    //Funciones para eliminar Filas
    eliminarFila(event){
        Swal.fire({
        title: '¿Seguro que quiere eliminar la fila seleccionada?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                event.preventDefault();
                if(event.target.classList.contains('borrar-fila')){
                    event.target.parentElement.parentElement.parentElement.remove();
                } else if(event.target.parentElement.classList.contains('borrar-fila')) {
                    event.target.parentElement.parentElement.parentElement.parentElement.remove();
                }
            }
        })
    }

    eliminarFilas(event){
        Swal.fire({
        title: '¿Seguro que quiere eliminar la fila seleccionada?',
        text: 'Esta acción eliminara las filas de las siguientes 2 tablas',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                event.preventDefault();
                if(event.target.classList.contains('borrar-fila')){
                    event.target.parentElement.parentElement.parentElement.remove();
                } else if(event.target.parentElement.classList.contains('borrar-fila')) {
                    event.target.parentElement.parentElement.parentElement.parentElement.remove();
                }
            }
        })
    }
}