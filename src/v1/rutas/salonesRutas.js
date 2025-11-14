import express from 'express';
import SalonesControlador from '../../controladores/salonesControladores.js';

const salonesControlador = new SalonesControlador();

const router = express.Router();

router.get('/', salonesControlador.buscarTodos);

router.get('/:salon_id',salonesControlador.buscarPorId);

router.post('/',  salonesControlador.crearSalon);

router.put('/:salon_id', salonesControlador.actualizarSalon);

router.delete('/:salon_id', salonesControlador.eliminarSalon);

export {router} ;