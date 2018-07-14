import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';


class catalogoVentas extends Component {
  state = {
    ventas: []
    }
      componentDidMount(){
        this.getCatalogoV();
      }

    getCatalogoV = _ => {
      fetch('http://localhost:4003/catalogoVentas')
      .then(response => response.json())
      .then(response => this.setState({ventas:response.data}))
      .catch(err => console.error(err))
    }

    imprimirVentas(){
    return   this.state.ventas.map((ven, i) => {
      var f=ven.fecha.slice(0,10);
      return (
         <tr key={ven.folio}>
          <td>
            {ven.folio}
          </td>
          <td>
            {ven.id_cliente}
          </td>
          <td>
            {ven.nombre}
          </td>
          <td>
            {'$'+ven.total}
          </td>
          <td>
            {f}
          </td>
         </tr>
       )
       })
    }

  render() {

    return (

      <div id="Ventas">
      
  				<div className="row">
  					<div className="col-md-4 col-4 ">
  					</div>
  					<div className="col-md-8 col-8  ">
  						<Link to={{pathname:"/nuevaVenta", state:{lon: this.state.ventas.length + 1}}  } ><button type="button" className="btn btn-primary float-right  mt-4 mr-5" id="btn_nuevaV"><i className="fas fa-file-alt"></i>Nueva Venta</button></Link>
  					</div>
  				</div>
  				<div className="row">
  					<div className="col-md-1 col-1 ">
  					</div>
  					<div className="col-md-11 col-11  ">
  						<div className="container">
  							<h2 className="text-primary">Ventas Activas</h2>
  								<table className="table" id="catalogo_ventas">
  									<thead className="text-info">
  										<tr>
  											<th>Folio Venta</th>
  											<th>Clave Cliente</th>
  											<th>Nombre</th>
  											<th>Total</th>
  											<th>Fecha</th>
  										</tr>
  									</thead>
  									<tbody>
  				                {this.imprimirVentas()}
  									</tbody>
  								</table>
  						</div>
  					</div>
  				</div>
  			</div>
    );
  }

}

export default catalogoVentas;
