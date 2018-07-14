import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import ActualizarCliente from './actualizarCliente.js';



class catalogoClientes extends Component {
  state = {
    clientes: [],
    id_cliente:0
    }
      componentDidMount(){
        this.getCatalogoC();
      }

    getCatalogoC = _ => {
      fetch('http://localhost:4003/catalogoClientes')
      .then(response => response.json())
      .then(response => this.setState({clientes:response.data}))
      .catch(err => console.error(err))
    }

    editarCliente(id_cliente){
      this.setState({id_cliente:id_cliente});

    }
    imprimirCliente(){
    return   this.state.clientes.map((cli, i) => {
      return (
         <tr key={cli.id_cliente}>
          <td>
            {cli.id_cliente}
          </td>
          <td>
            {cli.nombre + ' ' + cli.apellido_paterno + ' ' + cli.apellido_materno}
          </td>
          <td>
        <button className="btn btn-small btn-info" id="btn_editar" onClick={() =>this.editarCliente(cli.id_cliente)} ><i className="fa fa-pencil-alt" ></i></button>
          </td>
         </tr>
       )
       })
    }

      redirigirActualizar(){
        if(this.state.id_cliente>0){
          return(
          <ActualizarCliente id_cliente={this.state.id_cliente} clientes={this.state.clientes}  />
          );
        }
        else{
          return(
          <div id="Clientes">
      				<div className="row">
      					<div className="col-md-4 col-4 ">
      					</div>
      					<div className="col-md-8 col-8  ">
      					<Link to={{pathname:"/nuevoCliente", state:{lon: this.state.clientes.length + 1}}  } >	< button type="button" id="botonNC" className="btn btn-primary float-right mt-4 mr-5"><i className="fas fa-user-plus"></i> Nuevo Cliente</button></Link>
      					</div>
      				</div>
      				<div className="row">
      					<div className="col-md-1 col-1 ">
      					</div>
      					<div className="col-md-11 col-11  ">

      						<div className="container">
      							<h2 className="text-primary">Clientes Registrados</h2>
      								<table id="catalogo_clientes" className="table">
      									<thead className="text-info">
      										<tr>
      											<th>Clave Cliente</th>
      											<th>Nombre</th>
      										</tr>
      									</thead>
      									<tbody>

                            {this.imprimirCliente()}

      									</tbody>
      								</table>
      						</div>
      					</div>
      				</div>
      			</div>
);
          }
      }


  render() {

      return (
        <div>
          {this.redirigirActualizar()}
        </div>

    );
  }
}

export default catalogoClientes;
