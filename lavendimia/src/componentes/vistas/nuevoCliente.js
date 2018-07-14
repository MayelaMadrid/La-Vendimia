import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import swal from 'sweetalert';


  class nuevoCliente extends Component {
      state = {
        nombre :'',
        apellido_materno:'',
        apellido_paterno:'',
        rfc:''
      }



      nuevoCliente = _ => {
      const nombre = this.state.nombre;
      const apellido_paterno= this.state.apellido_paterno;
      const apellido_materno = this.state.apellido_materno;
      const rfc = this.state.rfc;
      let validacion = 1;

      if(nombre === '' ){
        validacion=0;
        swal({
        title: "Cuidado!",
        text: "El campo nombre es requerido!",
        icon: "error",
        });
      }
      if(apellido_materno === '' ){
        validacion=0;
        swal({
        title: "Cuidado!",
        text: "El campo apellido materno es requerido!",
        icon: "error",
        });
      }

      if(apellido_paterno === '' ){
        validacion=0;
        swal({
        title: "Cuidado!",
        text: "El campo apellido paterno es requerido!",
        icon: "error",
        });
      }

      if(rfc === '' ){
        validacion=0;
        swal({
        title: "Cuidado!",
        text: "El campo RFC es requerido",
        icon: "error",
        });
      }

    if(validacion ===1){

      fetch(`http://localhost:4003/clientes/nuevoCliente?nombre=${nombre}&apellido_paterno=${apellido_paterno}&apellido_materno=${apellido_materno}&rfc=${rfc}`)
      .catch(err =>  console.error(err))
      swal({
  title: "Bien Hecho!",
  text: "Ha agregado un nuevo cliente!",
  icon: "success",
});
}
    }

    setField (e) {
     this.setState({[e.target.name]: e.target.value})
    }


  render() {

    let folio = this.props.location.state;
      return (
<div id="NuevoCliente" >
				<div className="row">
					<div className="col-md-1 col-1 ">
					</div>
					<div className="col-md-11 col-11  ">

						<h2 className="mt-4 mb-4 text-primary ml-4"id="RC" >Registro cliente</h2>
            <div className="row">
              <div className="col-md-8 col-8 ">
              </div>
              <div className="col-md-4 col-4  ">
                <h5 className="text-primary float-left  "  >Cliente: {folio.lon}</h5>
              </div>
             </div>

						<div className="container">
						<form method="GET" >
						  <div className="form-group">
							<label htmlFor="name">Nombre:</label>
							<input type="text" className="form-control" id="Name" name="nombre" onChange={this.setField.bind(this)} />
						  </div>
						  <div className="form-group">
							<label htmlFor="lastname">Apellido Paterno:</label>
							<input type="text" className="form-control" id="apepat" name="apellido_paterno" onChange={this.setField.bind(this)}  required />
						  </div>
						  <div className="form-group">
							<label htmlFor="lastname">Apellido Materno:</label>
							<input type="text" className="form-control" id="apemat" name="apellido_materno" onChange={this.setField.bind(this)} required />
						  </div>
						  <div className="form-group">
							<label htmlFor="RFC">RFC:</label>
							<input type="text" className="form-control" id="RFC" name="rfc" onChange={this.setField.bind(this)} required />
						  </div>
						  <div className="float-right">
							  <Link to="catalogoClientes"> <button type="submit" id="btn_guardar" className="btn btn-primary" onClick={this.nuevoCliente}>Guardar</button></Link>
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

export default nuevoCliente;
