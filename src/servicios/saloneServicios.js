import Salones from "../db/salones.js";

export default class SalonesServicio {
  
  constructor() {
    this.salones = new Salones();
  }

  buscarTodos = () => {
    return this.salones.buscarTodos();
  }
  buscarPorId = (salonId) => {
    return this.salones.buscarPorId();

    
  }

  modificar = (salon_id, datos)=>{

    const existe = this.salones.buscarPorId(salonId);
    if(!existe){
      return null;
    }
    return  this.salones.modificar(salon_id, datos);


  }

  crear = (salon) =>{
    return this.salones.crear();


  }
 }