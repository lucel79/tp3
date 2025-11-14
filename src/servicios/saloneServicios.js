import Salones from "../db/salones.js";

export default class SalonesServicio {
  
  constructor() {
    this.salones = new Salones();
  }

  buscarTodos = () => {
    return this.salones.buscarTodos();
  }
  buscarPorId = (salon_id) => {
    return this.salones.buscarPorId(salon_id);

    
  }

 // modificar = (salon_id, datos)=>{

 //   const existe = this.salones.buscarPorId(salon_id);
 //   if(!existe){
 //     return null;
 //   }
 //   return  this.salones.modificar(salon_id, datos);
  //}
 //crear = (salon) =>{
  //  return this.salones.crear();
 // }//
 crearSalon = async (salonData) => {
    const { titulo, direccion, capacidad, importe } = salonData;
    
    if (!titulo || !direccion || !capacidad || !importe) {
      throw new Error('Faltan datos obligatorios');
    }
    
    const result = await this.salones.crearSalon(salonData);
    return this.salones.buscarPorId(result.insertId);
  }

  actualizarSalon = async (salon_id, salonData) => {
    const existe = await this.salones.buscarPorId(salon_id);
    
    if (!existe) {
      return { message: 'Salon no encontrado' };
    }

    const { titulo, direccion, capacidad, importe } = salonData;
    
    if (!titulo || !direccion || !capacidad || !importe) {
      throw new Error('Faltan datos obligatorios');
    }

    const result = await this.salones.actualizarSalon(salon_id, salonData);
    
    if (result.affectedRows === 0) {
      return { updated: false };
    }
    
    return { updated: true, salon: await this.salones.buscarPorId(salon_id) };
  }

  eliminarSalon = async (salon_id) => {
    const existe = await this.salones.buscarPorId(salon_id);
    
    if (!existe) {
      return { deleted: false, message: 'El salon no existe' };
    }

    const result = await this.salones.eliminarSalon(salon_id);
    
    if (result.affectedRows === 0) {
      return { deleted: false };
    }
    
    return { deleted: true, message: 'Salon eliminado' };
  }


 }