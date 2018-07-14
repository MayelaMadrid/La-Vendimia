import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import ActualizarArticulo from './actualizarArticulo.js';


class catalogoArticulos extends Component {
  state = {
    articulos: [],
    id_articulo:0
    }
      componentDidMount(){
        this.getCatalogo();
      }

    getCatalogo = _ => {
      fetch('http://localhost:4003/articulos/catalogoArticulos')
      .then(response => response.json())
      .then(response => this.setState({articulos:response.data}))
      .catch(err => console.error(err))
    }

    editarArticulo(id_articulo){
      this.setState({id_articulo:id_articulo});

    }

    imprimirArticulo(){
    return   this.state.articulos.map((art, i) => {
      return (
         <tr key={art.id_articulo}>
          <td>
            {art.id_articulo}
          </td>
          <td>
            {art.descripcion}
          </td>
          <td>
            <button className="btn btn-small btn-info" id="btn_editar"><i className="fa fa-pencil-alt" key={art.id_articulo} onClick={() =>this.editarArticulo(art.id_articulo)} ></i></button>
          </td>
         </tr>
       )
       })
    }

    redirigirActualizar(){
      if(this.state.id_articulo>0){
        return(
        <ActualizarArticulo id_articulo={this.state.id_articulo} articulos={this.state.articulos}  />
        );
      }
      else{
        return(  <div id="Articulos">
    				<div className="row">
    					<div className="col-md-4 col-4 ">
    					</div>
    					<div className="col-md-8 col-8  ">
    					<Link to={{pathname:"/nuevoArticulo", state:{lon: this.state.articulos.length + 1}}  }>	<button type="button" id="btnArticulo" className="btn btn-primary float-right mt-4 mr-5"> <i className="fas fa-couch"></i> Nuevo Articulo</button></Link>
    					</div>
    				</div>
    				<div className="row">
    					<div className="col-md-1 col-1 ">
    					</div>
    					<div className="col-md-11 col-11  ">
    						<div className="container">
    							<h2 className="text-primary">Articulos Registrados</h2>
    								<table id="catalogo_articulos" className="table">
    									<thead className="text-info">
    										<tr>
    											<th>Clave Articulo</th>
    											<th>Descripcion</th>
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

export default catalogoArticulos;
