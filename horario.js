const eventos = [
{
materia:"Sistemas Operativos",
grupo:"3",
tipo:"Clase",
horario:"2:00 pm - 5:00 pm",
fechas:["2026-03-16","2026-03-30","2026-04-20","2026-05-04","2026-05-25","2026-06-08"]
},
{
materia:"Sistemas Operativos",
grupo:"3",
tipo:"Convocatoria",
horario:"Convocatoria Final",
fechas:["2026-06-22"]
},
{
materia:"Sistemas Operativos",
grupo:"4",
tipo:"Clase",
horario:"2:00 pm - 5:00 pm",
fechas:["2026-03-16","2026-03-30","2026-04-20","2026-05-04","2026-05-25","2026-06-08"]
},
{
materia:"Sistemas Operativos",
grupo:"4",
tipo:"Convocatoria",
horario:"Convocatoria Final",
fechas:["2026-06-22"]
},
{
materia:"Gestión de Información",
grupo:"2",
tipo:"Clase",
horario:"7:00 pm - 10:00 pm",
fechas:["2026-03-05","2026-03-19","2026-04-09","2026-04-23","2026-05-07","2026-05-28"]
},
{
materia:"Gestión de Información",
grupo:"2",
tipo:"Convocatoria",
horario:"Convocatoria Final",
fechas:["2026-06-11"]
},
{
materia:"Gestión de Información",
grupo:"4",
tipo:"Clase",
horario:"7:00 pm - 10:00 am",
fechas:["2026-03-16","2026-03-30","2026-04-20","2026-05-04","2026-05-25","2026-06-08"]
},
{
materia:"Gestión de Información",
grupo:"4",
tipo:"Convocatoria",
horario:"7:00 pm - 10:00 am",
fechas:["2026-06-22"]
},
{
materia:"Auditoría de Sistemas de Información",
grupo:"1",
tipo:"Clase",
horario:"7:00 pm - 10:00 pm",
fechas:["2026-03-04","2026-03-18","2026-04-08","2026-04-22","2026-05-06","2026-05-27","2026-06-10"]
},
{
materia:"Auditoría de Sistemas de Información",
grupo:"1",
tipo:"Convocatoria",
horario:"Convocatoria Final",
fechas:["2026-06-23"]
}
];

function calcularEstado(fechaStr){

let hoy = new Date();
hoy.setHours(0,0,0,0);

let fecha = new Date(fechaStr);
fecha.setHours(0,0,0,0);

let diferencia = (fecha - hoy) / (1000 * 60 * 60 * 24);

if(diferencia === 0){
return "rojo";
}
else if(diferencia <= 8 && diferencia > 0){
return "amarillo";
}
else{
return "verde";
}
}

function mostrarFechas(){

let materiaSeleccionada = document.getElementById("materiaSelect").value;
let contenedor = document.getElementById("resultado");
contenedor.innerHTML = "";

if(!materiaSeleccionada) return;

let datos = eventos.filter(e => e.materia === materiaSeleccionada);

let grupos = {};

datos.forEach(ev=>{
if(!grupos[ev.grupo]){
grupos[ev.grupo] = [];
}
ev.fechas.forEach(f=>{
grupos[ev.grupo].push({
fecha:f,
tipo:ev.tipo,
horario:ev.horario
});
});
});

Object.keys(grupos).forEach(grupo=>{

let card = document.createElement("div");
card.className="card";

let titulo = document.createElement("div");
titulo.className="grupo-title";
titulo.textContent = "Grupo " + grupo;
card.appendChild(titulo);

grupos[grupo].sort((a,b)=> new Date(a.fecha)-new Date(b.fecha));

grupos[grupo].forEach(item=>{

let estado = calcularEstado(item.fecha);

let div = document.createElement("div");
div.className = "fecha " + estado;

div.innerHTML = `
${new Date(item.fecha).toLocaleDateString('es-ES',{weekday:'long', year:'numeric', month:'long', day:'numeric'})}
<br>
<span class="tipo">${item.tipo} - ${item.horario}</span>
`;

card.appendChild(div);

});

contenedor.appendChild(card);

});

}