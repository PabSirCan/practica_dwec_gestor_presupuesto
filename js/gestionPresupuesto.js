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
function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
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

    if (typeof fecha !== 'string' || (isNaN(Date.parse(fecha)))){
        this.fecha = Date.now(); 
    }
    else {
        this.fecha = Date.parse(fecha);
    }

    if (valor >= 0 && !isNaN(valor))
    {
        this.valor = valor;
    }

    else{
        this.valor = 0;
    }

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

                if (parEtiquetas[i] === this.etiquetas[j] ){

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
       let mFecha = new Date (this.fecha); 

        let ret = 'Gasto correspondiente a '+ this.descripcion + ' con valor ' + this.valor + ' €.' + '\nFecha: ' + mFecha.toLocaleString() + '\nEtiquetas:\n';

        for (let i = 0; i < this.etiquetas.length; i++){

            ret += '- ' + this.etiquetas[i] + '\n';
        }

        return ret;
    }

    this.actualizarFecha = function(parAct){

        // if (typeof parAct === 'string' && isNaN(Date.parse(fecha))){

        //     this.fecha = Date.parse(parAct); 
        // }

        if (Date.parse(parAct))
        {
            this.fecha = Date.parse(parAct);
        }
    }

    this.borrarEtiquetas = function(...parEtiquetas){

        for (let i = 0; i < parEtiquetas.length; i++)
        {

            for (let j = 0; j < this.etiquetas.length; j++)
            {
                if (parEtiquetas[i] === this.etiquetas[j])
                {
                    this.etiquetas.splice(j,1);
                    break;
                }
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(parPeriodo)
    {
        let fecha1 = new Date (this.fecha);
        let ret = String(fecha1.getFullYear());
        if (parPeriodo === "anyo"){
            return ret;
        } else if (parPeriodo === "mes") {
            ret += "-";
            if (fecha1.getMonth() + 1 < 10) {
                ret += "0";
            }
            return ret += fecha1.getMonth() + 1;
        } else if (parPeriodo === "dia") {
            ret += "-";
            if (fecha1.getMonth() + 1 < 10) {
                ret += "0";
            }
            ret += fecha1.getMonth() + 1 + "-";
            if (fecha1.getDate() < 10) {
                ret += "0";
            }
            return ret += fecha1.getDate();
        }
    }

    // this.obtenerPeriodoAgrupacion = function(parPeriodo)
    // {
    //     let fecha1 = new Date (this.fecha);
    //     let ret = String(fecha1.getFullYear());
    //     if (parPeriodo === "anyo"){
    //         return ret;
    //     } else if (parPeriodo === "mes") {
    //         ret += "-";
    //         if (fecha1.getMonth() + 1 < 10) {
    //             ret += "0";
    //         }
    //         return ret += fecha1.getMonth() + 1;
    //     } else if (parPeriodo === "dia") {
    //         ret += "-";
    //         if (fecha1.getMonth() + 1 < 10) {
    //             ret += "0";
    //         }
    //         ret += fecha1.getMonth() + 1 + "-";
    //         if (fecha1.getDate() < 10) {
    //             ret += "0";
    //         }
    //         return ret += fecha1.getDate();
    //     }
    // }
}

function filtrarGastos({fechaDesde,
    fechaHasta,
    valorMinimo,
    valorMaximo,
    descripcionContiene,
    etiquetasTiene})
{
    let ret = gastos.filter(function(gasto)
    {
        let anyade = true;
        /*Si tengo uno de los dos requisitos en valor o en fecha, se tiene que cumplir y el otro se 
        puede omitir. Si te dan los 2, se tienen que cumplir los 2*/

        if (fechaDesde)
        {
            if (gasto.fecha < Date.parse(fechaDesde))
            {
                anyade = false;
            }
        }

        if (fechaHasta)
        {
            if (gasto.fecha > Date.parse(fechaHasta))
            {
                anyade = false;
            }
        }
        
        if (valorMinimo)
        {
            if (gasto.valor < valorMinimo)
            {
                anyade = false;
            }
        }
        
        if (valorMaximo)
        {
            if (gasto.valor > valorMaximo)
            {
                anyade = false;
            }
        }

        if (descripcionContiene)
        {
            if (!(gasto.descripcion.toUpperCase()).includes(descripcionContiene.toUpperCase()))
            {
                anyade = false;
            }
        }

        if (etiquetasTiene)
        {
            let existe = false;

            for (let i = 0; i < etiquetasTiene.length; i++)
            {
                for (let j = 0; j < gasto.etiquetas.length; j++)
                {
                    if (etiquetasTiene[i] === gasto.etiquetas[j])
                    {
                        existe = true;
                    }
                }
            }
            if (existe === false)
            {
                anyade = false;
            }
        }

        return anyade;
    });

    return ret;
}

function agruparGastos(periodos = "mes", etiquetas, fechaDesde, fechaHasta)
{   
    let condiciones = {
        
        fechaDesde:fechaDesde,
        fechaHasta:fechaHasta,
        etiquetasTiene:etiquetas,

    }

    let subGastos = filtrarGastos(condiciones);

    return subGastos.reduce(function(acc, gasto)
    {
        if (typeof acc[gasto.obtenerPeriodoAgrupacion(periodos)]!='number')
        {
            acc[gasto.obtenerPeriodoAgrupacion(periodos)] = 0;
        }

        acc[gasto.obtenerPeriodoAgrupacion(periodos)] += gasto.valor;

        return acc;
    },{});
}

function listarGastos(){

    return gastos;
}

function anyadirGasto(gasto){

    gasto.id = idGasto;

    idGasto++;
    
    gastos.push(gasto);

}

function borrarGasto(parId)
{
    for ( let i = 0; i < gastos.length; i++)
    {
        if (gastos[i].id === parId)
        {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos()
{
    let total = 0;
    
    for (let i = 0; i < gastos.length; i++)
    {
        total += gastos[i].valor;
    }

    return total;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}

function transformarListadoEtiquetas (etiqContiene)
{
    let filtrado = /\s*[,\s.:;]+\s*/;

    let filtroSinSeparacion = etiqContiene.replace(filtrado, ',');

    let filtroSeparado = filtroSinSeparacion.split(',');

    return filtroSeparado;
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
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
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
