import React, { Component } from 'react';
import {  Link } from 'react-router-dom';

 import swal from 'sweetalert';
class actualizarArticulo extends Component {
  state = {
  descripcion :'',
  modelo:'',
  precio:0,
  existencia:0,
  id_articulo:0
  }

  componentWillMount(){
    const articulos = this.props.articulos;
    const id_articulo = this.props.id_articulo;
    let {descripcion, modelo} = '';
    let { existencia, precio} =0;
    articulos.map((art, i) => {
    if(id_articulo === art.id_articulo){
      descripcion = art.descripcion;
      precio = art.precio;
      modelo = art.modelo;
      existencia = art.existencia;
    }
      });
      this.setState({descripcion:descripcion});
      this.setState({precio:precio});
      this.setState({modelo:modelo});
      this.setState({existencia:existencia})
      this.setState({id_articulo:id_articulo});
  }

actualizarArticulo = _ => {
  const descripcion = this.state.descripcion;
  const modelo = this.state.modelo;
  const precio = this.state.precio;
  const existencia = this.state.existencia;
  const id_articulo =this.state.id_articulo;
  fetch(`http://localhost:4003/articulos/actualizarArticulo?descripcion=${descripcion}&modelo=${modelo}&precio=${precio}&existencia=${existencia}&id_articulo=${id_articulo}`)
  .catch(err => console.error(err))
  swal({
    title: "Bien hecho!",
    text: "Ha actualizado el articulo",
    icon: "success",
  });
}

setField (e) {
    this.setState({[e.target.name]: e.target.value});

}

  render() {
      return (

<div id="NuevoArticulo" >
				<div className="row">
					<div className="col-md-1 col-1 ">
					</div>
					<div className="col-md-11 col-11  ">

						<h2 className="mt-4 mb-4 text-primary ml-4"id="h2" >Actualizar Articulo </h2>
						<div claas="col-md-12 col-12 ">
						<div className="container mt-3">
							<form method="GET">
								  <div className="form-group">
									<label htmlFor="descripcion">Descripcion:</label>
									<input type="text" className="form-control" id="descripcion" name="descripcion" placeholder={this.state.descripcion} onChange={this.setField.bind(this)}  />
								  </div>
								  <div className="form-group">
									<label htmlFor="modelo">Modelo:</label>
									<input type="text" className="form-control" id="modelo" name="modelo" placeholder={this.state.modelo} onChange={this.setField.bind(this)}  />
								  </div>
								  <div className="form-group">
									<label htmlFor="precio">Precio:</label>
									<input type="number" className="form-control" min="0" id="precio" name="precio" placeholder={this.state.precio} onChange={this.setField.bind(this)}  />
								  </div>
								  <div className="form-group">
									<label htmlFor="existencia">Existencia:</label>
									<input type="number" className="form-control" min="0" id="existencia" name="existencia" placeholder={this.state.existencia} onChange={this.setField.bind(this)}  />
								  </div>
								  <div className="float-right">
									<button type="submit" id="btn_guardar" className="btn btn-primary" onClick={this.actualizarArticulo}>Guardar</button>
								 </div>
							</form>
							<div className="float-right">
								<Link to="catalogoArticulos">	<button  id="btn_cancelar" className="btn btn-danger mr-3">Cancelar</button></Link>
							</div>
						</div>
					</div>
				</div>
        </div>
			</div>


    );
  }
}

export default actualizarArticulo;
