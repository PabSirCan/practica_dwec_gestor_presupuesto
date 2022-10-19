// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let gastos = new Array();
let presupuesto = 0;
let idGasto = 0;


function actualizarPresupuesto(parametroAct) {
    // TODO

    if (parametroAct >= 0 && typeof parametroAct === "number")
    {
        presupuesto = parametroAct;
        return presupuesto;
    }
    else
    {
        console.log('Error: El valor introducido es negativo o no es válido');
        return -1;
    }
}

//revisar
function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

// revisar
function CrearGasto(descripcion, valor, fecha = Date.parse(Date.now()), ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    this.valor = valor;
    let id;


    if (etiquetas === undefined){
        this.etiquetas = new Array();
    }
    else{
        this.etiquetas = [...etiquetas];
    }

    if (fecha === undefined){
        this.fecha = Date.parse(Date.now()); 
    }

    if (typeof fecha !== 'string' || (! isNaN(Date.parse(fecha)))){
        this.fecha = Date.parse(Date.now()); 
    }
    else {
        this.fecha = fecha;
    }

    if (valor >= 0 && !isNaN(valor))
    {
        this.valor = valor;
    }

    else{
        this.valor = 0;
    };

    this.setId = function(id){
        this.id = id;
    }

    this.mostrarGasto = function(){
        return 'Gasto correspondiente a '+ this.descripcion + ' con valor ' + this.valor + ' €';
    }

    this.actualizarDescripcion = function(descripcionAct){
        this.descripcion = descripcionAct;
    }

    this.actualizarValor = function(valorAct){

        if (valorAct >= 0)
        {
            this.valor = valorAct;
        }

        else
        {
            console.log('Error: El valor introducido es negativo o no es un valor apto');
        }
    } 

    this.anyadirEtiquetas = function(...parEtiquetas){
        for (let i = 0; i < parEtiquetas.length; i++){
            let exArray = false; 
            for (let j = 0; j < this.etiquetas.length; j++ ){
                if (parEtiquetas[i] == this.etiquetas[j] ){
                    exArray = true;
                    break;
                }

            }
            if (!exArray){
                this.etiquetas.push(parEtiquetas[i]);
            }
        }
    }

    this.mostrarGastoCompleto = function(){
        const event = new Date(Date.UTC(fecha));

        let ret = 'Gasto correspondiente a ' + this.descripcion +' con valor ' + this.valor + '€. \n Fecha: ' + this.fecha.toLocaleString()  + 'Etiquetas: \n';

        for (let i = 0; i < this.etiquetas.length; i++){
            ret += '-' + this.etiquetas[i] + '\n';
        }

        return ret;
    }

    this.actualizarFecha = function(parAct){

        if (typeof parAct === 'string' && isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(parAct); 
        }

    }

    this.borrarEtiquetas = function(...parEtiquetas){

        for (let i = 0; i < parEtiquetas.length; i++){
            for (let j = 0; j < this.etiquetas.length; j++ ){
                if (parEtiquetas[i] == this.etiquetas[j] ){
                    this.etiquetas.splice(parEtiquetas[i]);
                    break;
                }

            }
        }

    }

}

function listarGastos(){

    return gastos;
}

function anyadirGasto(gasto){
    gasto.setId(idGasto);
    idGasto++;
    gastos.push(gasto);
}

/* 
this.etiquetas = etiquetas;
this. etiquetas = [...etiquetas];
*/

function borrarGasto(parId){

    gastos.splice(parId);

}

function calcularTotalGastos(){

        let total = 0;
    
    for (let i = 0; i < gastos.length; i++){
        total += gastos[i].valor;
    }

    return total;
}

function calcularBalance(){
    
    return presupuesto - calcularTotalGastos();

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
