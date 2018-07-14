import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';



class Header extends Component {

    
  render() {
      return (
    <header>
      <div>
      {this.props.children}
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" >
            <span className="navbar-brand" href="#">La Vendimia</span>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle"   id="navbardrop" data-toggle="dropdown">
                  Inicio
                  </span>
                  <div className="dropdown-menu">
                  <Link to="catalogoVentas">  <span className="dropdown-item">Ventas</span></Link>
                  <Link to="catalogoClientes">   <span className="dropdown-item"  >Clientes</span></Link>
                    <div className="dropdown-item divider"></div>
                  <Link to="catalogoArticulos">    <span className="dropdown-item" >Articulos</span></Link>
                    <Link to="configuracion">  <span className="dropdown-item">Configuración</span></Link>
                  </div>
                </li>
              </ul>
            <div className="col-md-4 col-4 fecha mt-o mb-0 ">
            <label  id="fecha"  className=" float-right text-white"> </label>
          </div>
        </nav>
      </div>
    </header>

    );
  }
}

export default Header;
