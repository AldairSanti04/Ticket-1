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

    // AGREGAR COLUMNAS
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
}