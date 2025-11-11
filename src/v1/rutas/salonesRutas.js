import express from 'express';
import SalonesControlador from '../controladores/SalonesControlador.js';

const SalonesControlador = new SalonesControlador();

const router = express.Router();

router.get('/', SalonesControlador.buscarTodos);

router.get('/:salon_id',SalonesControlador.buscarPorId);

router.post('/',  SalonesControlador.crearSalon);

router.put('/:salon_id', SalonesControlador.actualizarSalon);

router.delete('/:salon_id', SalonesControlador.eliminarSalon);

export default router;