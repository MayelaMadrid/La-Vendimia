import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();

class Header extends Component {
  componentWillMount(){
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (dd < 10) {
        dd = '0' + dd;
    }

  }

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
              <div className="col-md-6 col-6 fecha mt-o mb-0 t ">
            </div>
            <div className="col-md-4 col-4 fecha mt-o mb-0 float-right ">
            <label  id="fecha"  className=" float-right  text-white"> { dd+'/'+mm+'/'+yyyy} </label>
          </div>
        </nav>
      </div>
    </header>

    );
  }
}

export default Header;
