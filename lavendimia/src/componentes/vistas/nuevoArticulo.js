import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import swal from 'sweetalert';


class nuevoArticulo extends Component {
  state = {
  descripcion :'',
  modelo:'',
  precio:0,
  existencia:0
  }



nuevoArticulo = _ => {
  const descripcion = this.state.descripcion;
  const modelo= this.state.modelo;
  const precio = this.state.precio;
  const existencia = this.state.existencia;
  let validacion = 1;

  if(descripcion === '' ){
    validacion=0;
    swal({
    title: "Cuidado!",
    text: "El campo descripcion es requerido!",
    icon: "error",
    });
  }
  if(modelo === '' ){
    validacion=0;
    swal({
    title: "Cuidado!",
    text: "El campo modelo es requerido!",
    icon: "error",
    });
  }

  if(precio === 0 ){
    validacion=0;
    swal({
    title: "Cuidado!",
    text: "El campo precio es requerido!",
    icon: "error",
    });
  }

  if(existencia === 0 ){
    validacion=0;
    swal({
    title: "Cuidado!",
    text: "El campo existencia es requerido",
    icon: "error",
    });
  }

if(validacion ===1){
  fetch(`http://localhost:4003/articulos/nuevoArticulo?descripcion=${descripcion}&modelo=${modelo}&precio=${precio}&existencia=${existencia}`)
  .catch(err => console.error(err))

swal({
  title: "Bien Hecho",
  text: "Ha agregado un nuevo articulo",
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

<div id="NuevoArticulo" >
				<div className="row">
					<div className="col-md-1 col-1 ">
					</div>
					<div className="col-md-11 col-11  ">

						<h2 className="mt-4 mb-4 text-primary ml-4"id="h2" >Registro de articulos</h2>
            <div className="row">
              <div className="col-md-8 col-8 ">
              </div>
              <div className="col-md-4 col-4  ">
                <h5 className="text-primary float-left  "  >Articulo: {folio.lon}</h5>
              </div>
             </div>
						<div className="container mt-3">
							<form method="GET">
								  <div className="form-group">
									<label htmlFor="descripcion">Descripcion:</label>
									<input type="text" className="form-control" id="descripcion" name="descripcion" onChange={this.setField.bind(this)} required />
								  </div>
								  <div className="form-group">
									<label htmlFor="modelo">Modelo:</label>
									<input type="text" className="form-control" id="modelo" name="modelo" onChange={this.setField.bind(this)} required />
								  </div>
								  <div className="form-group">
									<label htmlFor="precio">Precio:</label>
									<input type="number" className="form-control" min="0" id="precio" name="precio" onChange={this.setField.bind(this)} required />
								  </div>
								  <div className="form-group">
									<label htmlFor="existencia">Existencia:</label>
									<input type="number" className="form-control" min="0" id="existencia" name="existencia" onChange={this.setField.bind(this)} required />
								  </div>
								  <div className="float-right">
									<Link to="catalogoArticulos"><button type="submit" id="btn_guardar" className="btn btn-primary" onClick={this.nuevoArticulo}>Guardar</button></Link>
								 </div>
							</form>
							<div className="float-right">
							<Link to="catalogoArticulos">	<button  id="btn_cancelar" className="btn btn-danger mr-3">Cancelar</button></Link>

						</div>
					</div>
				</div>
        </div>
			</div>


    );
  }
}

export default nuevoArticulo;
