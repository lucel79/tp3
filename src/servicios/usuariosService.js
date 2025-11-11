import Usuarios from "../db/usuarios.js"

export default class UsuariosService {
    constructor(){
        this.usuarios = new Usuarios();
    }
    buscar = (nombre_usuarios , constrasenia)=> {
        return this.usuarios.buscar(nombre_usuarios, constrasenia);
    }
    buscarPorId = (usuarios_id)=> {
        return this.usuarios.buscarPorId(usuarios_id);
    }


}