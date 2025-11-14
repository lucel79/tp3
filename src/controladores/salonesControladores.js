import SalonesServicio from "../servicios/saloneServicios.js";

export default class SalonesControlador {
  
  constructor() {
    this.salonesServicio = new SalonesServicio();
  }

  buscarTodos = async (req, res) => {
    try {
      const salones = await this.salonesServicio.buscarTodos();

      res.status(200).json({
        datos: salones
      });

    } catch (err) {
      console.log("Error en GET /salones", err);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno del servidor."
      });
    }
  }
 
  
  buscarPorId = async (req, res) => {
    try {
      const { salon_id } = req.params;
      const salon = await this.salonesServicio.buscarPorId(salon_id);

      if (!salon) {
        return res.status(404).json({
          estado: false,
          mensaje: 'Salon no encontrado'
        });
      }

      res.status(200).json({
        estado: true,
        salon: salon
      });

    } catch (err) {
      console.error("Error en GET /salones/:salon_id", err);
      res.status(500).json({
        estado: false,
        mensaje: "Error "
      });
    }
  }


crearSalon = async (req, res) => {
    try {
      const salonData = req.body;
      const nuevoSalon = await this.salonesServicio.crearSalon(salonData);

      res.status(201).json({
        estado: true,
        mensaje: 'Salon creado',
        salon: nuevoSalon
      });

    } catch (err) {

      if (err.message.includes('Faltan datos')) {
        return res.status(400).json({
          estado: false,
          mensaje: err.message
        });
      }
      console.error("Error en POST /salones", err);
      res.status(500).json({
        estado: false,
        mensaje: "Error "
      });
    }
  }


  actualizarSalon = async (req, res) => {
    try {
      const { salon_id } = req.params;
      const salonData = req.body;

      const resultado = await this.salonesServicio.actualizarSalon(salon_id, salonData);

      if (resultado.message && resultado.message.includes('no encontrado')) {
        return res.status(404).json({
          estado: false,
          mensaje: resultado.message
        });
      }

      if (!resultado.updated) {
           return res.status(500).json({
            estado: false,
            mensaje: 'Error al modificar el salón'
        });
      }

      res.status(200).json({
        estado: true,
        mensaje: 'Salon modificado',
        salon: resultado
      });

    } catch (err) {
      if (err.message.includes('Faltan datos')) {
        return res.status(400).json({
          estado: false,
          mensaje: err.message
        });
      }
      console.error("Error en PUT /salones/:salon_id", err);
      res.status(500).json({
        estado: false,
        mensaje: "Error "
      });
    }
  }


  eliminarSalon = async (req, res) => {
    try {
      const { salon_id } = req.params;

      const resultado = await this.salonesServicio.eliminarSalon(salon_id);


      if (resultado.message && resultado.message.includes('no existe')) {
        return res.status(404).json({
          estado: false,
          mensaje: resultado.message
        });
      }

      if (!resultado.deleted) {
          return res.status(500).json({
            estado: false,
            mensaje: 'Error al intentar eliminar '
        });
      }

      res.status(200).json({
        estado: true,
        mensaje: resultado.message,
      });

    } catch (err) {
      console.error("Error en DELETE /salones/:salon_id", err);
      res.status(500).json({
        estado: false,
        mensaje: "Error ."
      });
    }
  }
}





