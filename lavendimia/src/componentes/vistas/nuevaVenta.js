import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import Autocomplete from '../../../node_modules/react-autocomplete/build/lib/Autocomplete.js';
import InputArticulos from './inputArticulos.js'
import RadioButton from './radioButton.js';
import swal from 'sweetalert';



let id=0,enganche=0,importe_total=0,  bonificacion_enganche=0, total_adeudar=0,tasa=0,plazo=0,folio=0;
let articulos_recibidos=[];
let ids=[{id_cliente:0}];


class nuevaVenta extends Component {
state={
  value:'',
  clientes:[],
  articulos:[],
  articulo:[],
  id_cliente:0,
  articulo_ac:'',
  config:[],
  hide:false,
  tasa:0,
  plazo:0,
  plazos:0,
  total:0
}
componentDidMount(){
  this.getCatalogoC();
    this.getCatalogo();
}
componentWillMount(){
swal("Para actualizar los valores de precios y totales de los articulos, da click en agregar cada que cambies la cantidad.");
}



nuevaVenta = _ => {
  let validacion=0;
  if(articulos_recibidos === null || id===0 || this.state.plazos===0){
    validacion=1;
  }
articulos_recibidos.map((con, i) => {
  if(con.cantidad === 0 ){
    validacion=1
  }
  if(con.precio_iva ===0){
    validacion=1
  }
});
if(validacion ===1){
  swal({
  title: "Cuidado!",
  text: "Los datos ingresados no son correctos o no ha seleccionado una opcion, favor de verificar!",
  icon: "error",
});
}else{

    const plazos= this.state.plazos;
  let precio_contado = parseFloat(total_adeudar / (1 + ((tasa * plazo)/100))).toFixed(2);
  let   total=parseFloat(precio_contado *(1+((tasa * plazos)/100))).toFixed(2);
  const id_ = parseFloat(this.state.value);
  console.log(id,plazos,total,precio_contado);
  fetch(`http://localhost:4003/ventas/nuevaVenta?id_cliente=${id_}&plazos=${plazos}&total=${total}`)
    articulos_recibidos.map((con, i) => {
      fetch(`http://localhost:4003/ventas/nuevaVenta_Articulo?id_venta=${folio.lon}&id_articulo=${con.id_articulo}&cantidad=${con.cantidad}`);
      fetch(`http://localhost:4003/ventas/actualizarArticulo?cantidad=${con.cantidad}&id_articulo=${con.id_articulo}`);
    });
    articulos_recibidos=[];
    id=0;enganche=0;importe_total=0;  bonificacion_enganche=0; total_adeudar=0;tasa=0;plazo=0;folio=0;
    ids=[];
    swal({
  title: "Bien Hecho!",
  text: "Tu venta ha sido registrada correctamente!",
  icon: "success",
});

}
}

getCatalogoC = _ => {
fetch('http://localhost:4003/catalogoClientes')
.then(response => response.json())
.then(response => this.setState({clientes:response.data}))
.catch(err => console.error(err))
}
getCatalogo = _ => {
  fetch('http://localhost:4003/configuracion')
  .then(response => response.json())
  .then(response => this.setState({config:response.data}))
  .catch(err => console.error(err))

}

obtenerRFC(){
   id =parseFloat(this.state.value);
  let rfc='';
 this.state.clientes.map((con, i) => {
    if(id === con.id_cliente){
      rfc=con.RFC;
    }
  });
return rfc;
}
handleRecibi = () =>{
   let longitud=articulos_recibidos.length;

   let ida;
   this.state.articulo.map((art, i) => {
     ida=art.id_articulo;
   });
   let verifica;
   ids.map((art, i) => {
      if(art.id_articulo === ida){
        verifica =1;
        return ;
      }
   });
   if(verifica !== 1){
     ids[longitud]={id_articulo:ida};
   this.state.articulo.map((art, i) => {
    articulos_recibidos[longitud]={lugar:longitud,id_articulo:art.id_articulo, descripcion:art.descripcion,modelo:art.modelo,precio:art.precio,existencia:art.existencia,importe:0, precio_iva:0, cantidad:0};
   });

 }
   }
obtenerCalculos= (e) =>{
let importe=0, precio=0,existencia=0,id_articulo=0,lugar=0,cantidad=0,precio_iva=0;
importe_total=0;
  lugar=e.target.getAttribute('lugar');
  precio =e.target.getAttribute('precio');
  existencia =e.target.getAttribute('existencia');
  cantidad=e.target.value;
  console.log(existencia,cantidad);
  tasa=this.state.config[0].tasa; plazo=this.state.config[0].plazo;
  if(cantidad > existencia){
    swal({
      title: "Cuidado",
      text: "El artículo seleccionado no cuenta con existencia, favor de verificar.",
      icon: "error",
    });
}else{
  precio_iva=parseFloat(precio * (1+(this.state.config[0].tasa * this.state.config[0].plazo)/100)).toFixed(2);
  importe = parseFloat(cantidad * precio_iva).toFixed(2);
  importe_total += parseFloat(importe);
  articulos_recibidos[lugar].importe=importe;
  articulos_recibidos[lugar].precio_iva=precio_iva;
  articulos_recibidos[lugar].cantidad=cantidad;
  this.calculos(importe_total);
}

}
calculos(){
  enganche=0;bonificacion_enganche=0;total_adeudar=0;
  enganche=parseFloat((this.state.config[0].enganche/100) * importe_total ).toFixed(2);
  bonificacion_enganche = parseFloat(enganche *((this.state.config[0].tasa * this.state.config[0].plazo)/100)).toFixed(2);
  total_adeudar= parseFloat(importe_total - enganche - bonificacion_enganche).toFixed(2);



  this.imprimirArticulo();
}

eliminarArticulo (e) {
let lugar=e.target.getAttribute('lugar');
   articulos_recibidos.splice(lugar,1);
   console.log(lugar);

//console.log("se boroo");
//console.log(articulos_recibidos);
 let importe=e.target.getAttribute('importe');
  importe_total -= parseFloat(importe);
  articulos_recibidos.splice(lugar,1);

  ids.splice(lugar,1);
  console.log(articulos_recibidos);
  this.calculos(importe_total);
  this.imprimirArticulo();
}

imprimirArticulo(){
  if(!articulos_recibidos){return null;}
  else{

return   articulos_recibidos.map((art, i) => {
  return (
   <tr key={art.descripcion}>
     <td>
       {art.descripcion}
     </td>
      <td>
        {art.modelo}
      </td>
      <td>
      <input type="number" className="form-control text-center" min="1" id={art.id_articulo}  precio={art.precio} existencia={art.existencia} lugar={art.lugar} onChange={this.obtenerCalculos}/ >
      </td>
      <td >
         {'$' + art.precio_iva}
      </td>
      <td>
          { '$' + art.importe}
      </td>
      <td>
        <button className="btn btn-small btn-danger" id="btn_eliminar"><i className="fas fa-times"  id={art.id_articulo}  importe={art.importe} lugar={art.lugar} onClick={this.eliminarArticulo.bind(this)} ></i></button>
      </td>
     </tr>
   )
 })}
}
reiniciar(){
  articulos_recibidos=[];
  ids=[];
}


obtenerArray() {

   if((!this.state.articulos) && (!this.state.clientes) && (!this.state.config)){
     return <div></div>;
   }
   else{
     let cliente_nombre=[];
this.state.clientes.map((con, i) => {
  cliente_nombre=con.nombre;
});
       return (

         <div>

           <div >
             <div className="row">
               <div className="col-md-1 col-1">
               </div>
               <div className="col-md-8 col-8  ">
                 <div className="col-md-8 col-8  mr-0 ml-0">
                   <h2 className="text-primary mt-5"> Registro de Ventas</h2>
                 </div>
               </div>
               <hr />
             </div>
           <div className="row">
             <div className="col-md-8 col-8 ">
             </div>
             <div className="col-md-4 col-4  ">
               <h5 className="text-primary float-left  "  >folio: {folio.lon}</h5>
             </div>
            </div>
           <div className="row">
             <div className="col-md-1 col-1  mr-0 ml-0 ">
             </div>
             <div className="col-md-11 col-11  mr-0 ml-0  ">
               <div className="row  ">
                 <div className="col-md-2 col-2 mb-5 mt-0  ">
                 <label className="form-control bg-primary rounded  text-white  mb-4 "> Cliente</label>
                 </div>
                 <div className="col-md-2 col-2  " >

                 <Autocomplete
                 items={this.state.clientes}
                       shouldItemRender={(item, value) => (item.id_cliente + ' ' +item.nombre + ' ' + item.apellido_paterno + ' ' + item.apellido_materno).toLowerCase().indexOf(value.toLowerCase()) > -1}
                       getItemValue={item => (item.id_cliente + ' ' + item.nombre + ' ' + item.apellido_paterno + ' ' + item.apellido_materno )}

                       renderItem={(item, highlighted) =>
                         <div
                           key={item.id_cliente}
                           style={{ backgroundColor: highlighted ? '#eee' : 'transparent',height: '30px'}}
                         >
                           {item.id_cliente + ' ' +item.nombre + ' ' + item.apellido_paterno + ' ' + item.apellido_materno}
                         </div>
                       }
                       value={this.state.value}
                       onChange={e => this.setState({ value: e.target.value})}
                       onSelect={value => this.setState({value })}
                       style={{display:'block',
                       width: '100%',
                       padding:' 0.5rem 0.75rem',
                       fontSize: '1rem',
                       lineHeight: '1.25',
                       color:'#464a4c',
                       backgroundColor: '#fff',
                      backgroundImage: 'none',
                        WebkitBackgroundClip: 'padding-box',
                       backgroundClip: 'padding-box',
                       border: "'1px' 'solid' rgba(0', 0', 0', 0.15)",
                       borderRadius: '0.25rem',
                       WebkitTransition: "'border-color ease-in-out 0.15s', '-webkit-box-shadow ease-in-out 0.15s'",
                       OTransition: "'border-color ease-in-out 0.15s', box-shadow ease-in-out 0.15s'",
                       transition: "'border-color ease-in-out 0.15s', 'box-shadow ease-in-out 0.15s', '-webkit-box-shadow ease-in-out 0.15s'"}}

                       />
                         <div >
                        </div>
                 </div>
                 <div className="col-md-3 col-3 " >
                   <h4 className=" mt-1 float-left  text-info " id="RFC" > RFC: {this.obtenerRFC()} </h4>
                 </div>
               </div>
             </div>
         </div>
           <div className="row mb-3">
             <div className="col-md-1 col-1 mr-0 ml-0">
             </div>
             <div className="col-md-11 col-11 mr-0 ml-0">

                 <InputArticulos recibosArticulos={articulo =>this.setState({articulo}) }/>
                   {this.handleRecibi()}

             </div>

                          </div>

           <div className="row">
             <div className="col-md-1 col-1  mr-0 ml-0">
             </div>
             <div className="col-md-11 col-11  mr-0 ml-0">
               <div className="row">
                 <div className="container">
                   <table className="table" id="articulos_compra">
                     <thead>
                       <tr>
                         <th>Descripcion Articulo</th>
                         <th>Modelo</th>
                         <th>Cantidad</th>
                         <th>Precio</th>
                         <th>Importe</th>
                       </tr>
                     </thead>
                     <tbody>

                     {this.imprimirArticulo()}

                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
         </div>
           <div className="row">
             <div className="col-md-7 col-7  mr-0 ml-0">
             </div>
             <div className="col-md-5 col-5  mr-0 ml-0">
               <div className="row">
                 <div className="col-md-5 col-5">
                   <label className="rounded bg-secondary  form-control text-white   mt-2 mb-2"> Enganche</label>
                 </div>
                 <div className="col-md-4 col-4">
                   <input type="text "  id ="in_enganche" value={enganche} className=" form-control  float-right mt-2" />
                 </div>
               </div>
               <div className="row">
                 <div className="col-md-5 col-5">
                   <label className="form-control bg-secondary  rounded  text-white mt-2 mb-2"> Bonificacion Enganche</label>
                 </div>
                 <div className="col-md-4 col-4">
                   <input type="text" id="in_bonificacion" value={bonificacion_enganche} className=" form-control  float-right  mt-2 " />
                 </div>
               </div>
               <div className="row">
                  <div className="col-md-5 col-5">
                     <label className="form-control bg-secondary text-white rounded   mt-2 mb-2"> Total</label>
                  </div>
                  <div className="col-md-4 col-4 ">
                     <input type="text" id="in_total" value={total_adeudar} className=" form-control  float-right mt-2 " />
                  </div>
               </div>

                 <div id="botones_venta">
                   <div className="float-right">
                       <button type="submit" id="btn_siguiente" className="btn btn-success mr-3 "onClick={() => this.setState({hide:!this.state.hide})}>Siguiente</button>


                   </div>
                      <div className="float-right">
                       <Link to="catalogoVentas">  <button type="submit" id="btn_cancelar" className=" mr-3 btn btn-danger" onClick={this.reiniciar}>Cancelar</button></Link>
                      </div>
                 </div>
             </div>
           </div>

           <div style={{display: (this.state.hide ? 'block' :'none')}}><RadioButton  total_adeudar={total_adeudar} tasa={tasa} plazo={plazo}  reciboSeleccion={plazos =>this.setState({plazos})} reciboTotal={total =>this.setState({total}) } />

                   <div id="botones_abonos">
                     <div className="float-right">
                        <Link to="catalogoVentas"> <button type="submit" id="btn_guardar" className="btn btn-success mr-3" onClick={this.nuevaVenta}>Guardar</button></Link>
                      </div>
                <div className="float-right">
                     <Link to="catalogoVentas">  <button id="btn_cancelar" type="submit" className="mr-3 btn btn-danger" onClick={this.reiniciar} >Cancelar</button></Link>
                      </div>
                    </div>
</div>

     </div>
     </div>

     );
   }
 }

  render() {

 folio = this.props.location.state;
    return(

    <div>{this.obtenerArray()}</div>
  );
  }
}

export default nuevaVenta;
