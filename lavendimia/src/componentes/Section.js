import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import catalogoVentas from './vistas/catalogoVentas';
import nuevaVenta from './vistas/nuevaVenta.js';
import catalogoClientes from './vistas/catalogoClientes';
import nuevoCliente from './vistas/nuevoCliente';
import catalogoArticulos from './vistas/catalogoArticulos';
import nuevoArticulo from './vistas/nuevoArticulo';
import configuracion from './vistas/configuracion';
//mport actualizarCliente from './vistas/actualizarCliente';


class Section extends Component {

  render() {
      return (
    <section>
      <div className="container" >
      {this.props.children}
      <Switch>

             <Route path="/catalogoClientes" component={catalogoClientes} />
             <Route path="/catalogoVentas" component={catalogoVentas} />
             <Route path="/nuevaVenta" component={nuevaVenta} />
             <Route path="/catalogoClientes" component={catalogoClientes} />
             <Route path="/nuevoCliente" component={nuevoCliente} />
             <Route path="/catalogoArticulos" component={catalogoArticulos} />
             <Route path="/nuevoArticulo" component={nuevoArticulo} />
             <Route path="/configuracion" component={configuracion} />


      </Switch>
      </div>

    </section>

    );
  }
}

export default Section;
