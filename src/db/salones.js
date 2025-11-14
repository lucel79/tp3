import { conexion } from "./conexion.js";

export default class Salones {
  buscarTodos = async () => {
    const sql = "SELECT * FROM salones WHERE activo = 1";
    const [salones] = await conexion.execute(sql);
    return salones;
  }

  buscarPorId = async (salonId) => {
    const sql = "SELECT * FROM salones WHERE activo = 1 AND salon_id = ?";
    const  [salones] = await conexion.execute(sql, [salonId]);
    return salones[0];
  }

  crearSalon = async ({ titulo, direccion, capacidad, importe }) => {
    const sql = 'INSERT INTO salones(titulo, direccion, capacidad, importe) VALUES(?, ?, ?, ?)';
    const valores = [ titulo, direccion, capacidad, importe ];
    const [results] = await conexion.execute(sql, valores);
    return results;
  }

  actualizarSalon = async (salonId, { titulo, direccion, capacidad, importe }) => {
    const sql = 'UPDATE salones SET titulo = ?, direccion = ?, capacidad = ?, importe = ? WHERE salon_id = ? AND activo = 1';
    const valores = [ titulo, direccion, capacidad, importe, salonId ];
    const [results] = await conexion.execute(sql, valores);
    return results;
  }


  eliminarSalon = async (salonId) => {
    const sql = 'UPDATE salones SET activo = 0 WHERE salon_id = ?';
    const [results] = await conexion.execute(sql, [salonId]);
    return results;
  }

} 



