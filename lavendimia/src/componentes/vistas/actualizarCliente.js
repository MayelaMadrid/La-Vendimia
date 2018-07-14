import React, { Component } from 'react';
import {  Link } from 'react-router-dom';

import swal from 'sweetalert';


  class ActualizarCliente extends Component {
      state = {
        nombre :'',
        apellido_materno:'',
        apellido_paterno:'',
        rfc:'',
        id_cliente:0


      }
      componentWillMount(){
        const clientes = this.props.clientes;
        const id_cliente = this.props.id_cliente;
        let {nombre, apellido_materno, apellido_paterno, rfc} = '';
        clientes.map((cli, i) => {
        if(id_cliente === cli.id_cliente){
          nombre = cli.nombre;
          apellido_materno = cli.apellido_materno;
          apellido_paterno = cli.apellido_paterno;
          rfc = cli.RFC;
        }
          });
          this.setState({nombre:nombre});
          this.setState({apellido_materno:apellido_materno});
          this.setState({apellido_paterno:apellido_paterno});
          this.setState({rfc:rfc})
          this.setState({id_cliente:id_cliente});
      }


    actualizarCliente = _ => {
      const nombre = this.state.nombre;
      const apellido_paterno= this.state.apellido_paterno;
      const apellido_materno = this.state.apellido_materno;
      const rfc = this.state.rfc;
      const id_cliente =this.state.id_cliente;
      fetch(`http://localhost:4003/clientes/actualizarCliente?nombre=${nombre}&apellido_paterno=${apellido_paterno}&apellido_materno=${apellido_materno}&rfc=${rfc}&id_cliente=${id_cliente}`)
      .catch(err =>  console.error(err))
      swal({
  title: "Bien Hecho!",
  text: "Ha actualizado el cliente!",
  icon: "success",
});

    }

    setField (e) {

        this.setState({[e.target.name]: e.target.value});

    }

  render() {
      return (
<div id="ActualizarCliente" >
				<div className="row">
					<div className="col-md-1 col-1 ">
					</div>
					<div className="col-md-11 col-11  ">

						<h2 className="mt-4 mb-4 text-primary ml-4"id="RC" >Actualizar cliente</h2>
						<div className="container">
						<form method="GET" >
						  <div className="form-group">
							<label htmlFor="name">Nombre:</label>
							<input type="text" className="form-control" id="Name" placeholder={this.state.nombre} name="nombre" onChange={this.setField.bind(this)} />
						  </div>
						  <div className="form-group">
							<label htmlFor="lastname">Apellido Paterno:</label>
							<input type="text" className="form-control" id="apepat" name="apellido_paterno" placeholder={this.state.apellido_paterno} onChange={this.setField.bind(this)}   />
						  </div>
						  <div className="form-group">
							<label htmlFor="lastname">Apellido Materno:</label>
							<input type="text" className="form-control" id="apemat" name="apellido_materno" placeholder={this.state.apellido_materno} onChange={this.setField.bind(this)}  />
						  </div>
						  <div className="form-group">
							<label htmlFor="RFC">RFC:</label>
							<input type="text" className="form-control" id="RFC" name="rfc" placeholder={this.state.rfc}   onChange={this.setField.bind(this)}  />
						  </div>
						  <div className="float-right">
							<button type="submit" id="btn_guardar" className="btn btn-primary" onClick={this.actualizarCliente}>Guardar</button>
						  </div>
						</form >
						<div className="float-right">
						<Link to="catalogoClientes">	<button type="submit" id="btn_cancelar" className="mr-3 btn btn-danger">Cancelar</button></Link>
						</div>
						</div>
					</div>
				</div>
			</div>



    );
  }
}

export default ActualizarCliente;
