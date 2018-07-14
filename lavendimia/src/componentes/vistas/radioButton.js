

import React, { Component } from 'react';
let meses=[{mes:3},{mes:6},{mes:9},{mes:12}];
let total_a_pagar=0, precio_contado=0;
class radioButton extends Component {
state={
  plazos:0,
  total:0
}

calculos(){
  precio_contado = parseFloat(this.props.total_adeudar / (1 + ((this.props.tasa * this.props.plazo)/100))).toFixed(2);

}

  imprimirRadio(){

  this.calculos();
  return   meses.map((m, i) => {
    {total_a_pagar=parseFloat(precio_contado *(1+((this.props.tasa * m.mes)/100))).toFixed(2);}
    return (
      <tr key={m.mes}>
       <td> {m.mes}  Abonos de  </td>
       <td>$  {parseFloat(total_a_pagar/m.mes).toFixed(2)}  </td>
       <td id="total_p" datapago="total_pago"> Total a pagar: $  {parseFloat(total_a_pagar).toFixed(2)}  </td>
       <td> Se ahorra: $  {parseFloat(this.props.total_adeudar - total_a_pagar).toFixed(2)} </td>
       <td> <input type="radio" name="mensualidades" id="mes" value={m.mes} total={total_a_pagar} dataid={m.mes}
                      onChange={(e) => this.setState({plazos: e.target.value,total: e.target.getAttribute('total')},() =>
                       this.props.reciboSeleccion(this.state.plazos),
                        this.props.reciboTotal(this.state.total))} /></td>
       </tr>
     )
   });}

   cambioOpcion= (e) => {

   }



  render() {
    console.log(this.state.plazos,this.state.total);
    return (
      <div id="mensualidades_Buttons">
         <div className="col-md-11 col-11 ml-5 mt-5">
            <div className="container" >
                   <h2 className=" text-center text-white bg-primary ">Escoja los abonos mensuales</h2>
                   <table id="radiobutton-mes" className="table table-primary table-striped">
                     <tbody>
                    {this.imprimirRadio()}
                      </tbody>
                   </table>
            </div>
         </div>
      </div>

    );
  }
}

export default radioButton;
