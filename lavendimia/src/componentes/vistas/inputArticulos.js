import React, { Component } from 'react';
import Autocomplete from '../../../node_modules/react-autocomplete/build/lib/Autocomplete.js';



 let articulo=[];
class inputArticulos extends Component {
state={
  value:'',

  articulos:[],

  articulo:[]

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
 handleObtenerId = () =>{

   let id = parseFloat(this.state.value);
 this.state.articulos.map((con, i) => {
     if(id === con.id_articulo){
      articulo=[{id_articulo: con.id_articulo,descripcion:con.descripcion,modelo:con.modelo,precio:con.precio,existencia:con.existencia}];
        return;
     }
   });
      this.setState({articulo:articulo},() =>
   this.props.recibosArticulos(this.state.articulo));



}

obtenerArray() {

   if(!this.state.articulos) {
     return <div></div>;
   }
   else{
       return (
         <div>
         <div className="row" >
           <div className="col-md-2 col-2">
             <label className="form-control bg-primary rounded text-white  mb-4"> Articulo</label>
           </div>
           <div className="col-md-2 col-2">

                 <Autocomplete
                 items={this.state.articulos}
                       shouldItemRender={(item, value) => (item.id_articulo + ' '+ item.descripcion).toLowerCase().indexOf(value.toLowerCase()) > -1}
                       getItemValue={item => (item.id_articulo + ' '+ item.descripcion)}

                       renderItem={(item, highlighted) =>
                         <div
                           key={item.id_articulo}
                           style={{ backgroundColor: highlighted ? '#eee' : 'transparent',height: '30px'}}
                         >

                        {(item.id_articulo + ' '+ item.descripcion)}
                         </div>
                       }
                       value={this.state.value}
                       onChange={e => this.setState({ value: e.target.value})}
                       onSelect={value => this.setState({value })}
                       style={{display:'block',
                       width: '100%',
                       padding:' 0.5rem 0.75rem',
                       fontSize: '1rem',
                       lineHeight: '1.25',
                       color:'#464a4c',
                       backgroundColor: '#fff',
                      backgroundImage: 'none',
                        WebkitBackgroundClip: 'padding-box',
                       backgroundClip: 'padding-box',
                       border: "'1px' 'solid' rgba(0', 0', 0', 0.15)",
                       borderRadius: '0.25rem',
                       WebkitTransition: "'border-color ease-in-out 0.15s', '-webkit-box-shadow ease-in-out 0.15s'",
                       transition:"'border-color ease-in-out 0.15s', '-webkit-box-shadow ease-in-out 0.15s'",
                       OTransition: "'border-color ease-in-out 0.15s', box-shadow ease-in-out 0.15s'",
                       }}

                       />
                       </div>
                       <div className="col-md-1 col-1 " >
                         <button type="submit"className="btn btn-primary " id="btn_agregar" onClick={() =>this.handleObtenerId()}><i className="fas fa-plus-circle"></i> Agregar</button>
                       </div>
                     </div>
                   </div>




     );
   }
 }

  render() {



    return(

    <div>{this.obtenerArray()}</div>

  );
  }
}

export default inputArticulos;
