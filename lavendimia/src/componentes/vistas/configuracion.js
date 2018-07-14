import React, { Component } from 'react';
import swal from 'sweetalert';

class configuracion extends Component {

  state = {
    config: [],
    plazo:0,
    enganche:0,
    tasa:0


    }
    componentDidMount(){
        this.getCatalogo();

      }


    getCatalogo = _ => {
      fetch('http://localhost:4003/configuracion')
      .then(response => response.json())
      .then(response => this.setState({config:response.data}))
      .catch(err => console.error(err))

    }
    actualizarConfiguracion = _ => {
      const tasa = this.state.tasa;
      const  enganche = this.state.enganche;
      const plazo = this.state.plazo;
      fetch(`http://localhost:4003/configuracion/actualizarConfiguracion?tasa=${ tasa }&enganche=${ enganche }&plazo=${ plazo }`)
      .then(response => response.json())
      .then(response => this.setState({config:response.data}))
      .catch(err => console.error(err))

    }


    setField (e) {
      if(!e.target.value){
     this.setState({[e.target.name]: e.target.placeholder});
   }
     else{
        this.setState({[e.target.name]: e.target.value});
      }
    }

     obtenerArray() {
        if (!this.state.config) {
            return <div></div>;
        }
        else{
          let tasa,enganche,plazo=0;
          const h=  this.state.config.map((con, i) => {

              tasa = con.tasa;
              enganche = con.enganche;
              plazo = con.plazo;
            });

      return (

  <div id="configuracion" >
        <div className="row">
          <div className="col-md-1 col-1 ">
          </div>
          <div className="col-md-11 col-11  ">
              <h2 className="mt-4 mb-4 text-primary ml-4" >Configuracion inicial</h2>
            <div className="container">
              <form method="GET" >
                  <div className="form-group">
                  <label htmlFor="tasa">Tasa financiamiento:</label>
                    <input type="number" className="form-control" min="0" id="tasa"  name="tasa" placeholder={tasa} onChange={this.setField.bind(this)}    />
                  </div>
                  <div className="form-group">
                  <label htmlFor="enganche">% enganche:</label>
                    <input type="number" className="form-control" min="0" id="enganche" name="enganche" placeholder= {enganche} onChange={this.setField.bind(this)} />
                  </div>
                  <div className="form-group">
                  <label htmlFor="plazo">Plazo Maximo:</label>
                  <input type="number" className="form-control" min="0" id="plazo" name="plazo" placeholder={plazo} onChange={this.setField.bind(this)} />
                  </div>
                  <div className="float-right">
                  <button type="submit" className="btn btn-primary" id="btn_guardar" onClick={this.actualizarConfiguracion}>Guardar</button>
                 </div>
              </form>
              <div className="float-right">
                <button id="btn_cancelar" type="submit" className="mr-3 btn btn-danger">Cancelar</button>
              </div>
                </div>
            </div>
          </div>
        </div>


  );
  }}

  render() {
    return(
      <div>
      {this.obtenerArray()}
      </div>
);

}
}

export default configuracion;
