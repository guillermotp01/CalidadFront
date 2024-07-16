import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../Models/Usuario';
import { UsuarioService } from '../../../Services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  MostrarModalActualizarUsuario: boolean = false;
  MostrarModalEliminarUsuario: boolean = false;
  actualizarModal: boolean = false;
  idUsuarioEliminar: number = 0;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.listar().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  crearUsuario() {
    this.actualizarModal = false;
    this.MostrarModalActualizarUsuario = true;
    this.usuario = {
        id: 0,
        nombre: '',
        apellido: '',
        tipo_documento:'',
        nro_documento:0,
        correo: '',
        username:'',
        password:'',
        direccion: '',
        celular:0,
        rol:'',
    };  
  }

  modalActualizar(item: any): void {
    this.actualizarModal = true;
    this.MostrarModalActualizarUsuario = true;
    this.MostrarModalEliminarUsuario = false;

    this.usuario = {
        id: item.id,
        nombre: item.nombre,
        apellido: item.apellido,
        tipo_documento: item.tipo_documento,
        nro_documento: item.nro_documento,
        correo: item.correo,
        username: item.username,
        password: item.password,
        direccion: item.direccion,
        celular: item.celular,
        rol: item.rol,
    };
}


  modalEliminar(id: number) {
    this.idUsuarioEliminar = id;
    this.MostrarModalEliminarUsuario = true;
    this.MostrarModalActualizarUsuario = false;
  }

  actualizar() {
    const usuarioId = this.usuario.id;
    this.usuarioService.actualizar(usuarioId, this.usuario).subscribe(resp => {
        if (resp) {
            this.listarUsuarios();
        }
    });
    this.MostrarModalActualizarUsuario = false;
}

  eliminar(){
    this.usuarioService.eliminar(this.idUsuarioEliminar).subscribe(resp => {
      if(resp){
        this.listarUsuarios();
      }
    });
    this.MostrarModalEliminarUsuario = false;
  }

  guardar() {
    this.usuarioService.crear(this.usuario).subscribe(resp => {
      if (resp) {
        this.listarUsuarios();  
      }
    });
    this.MostrarModalActualizarUsuario = false;
  }

  cancelar() {
    this.MostrarModalActualizarUsuario = false;
    this.MostrarModalEliminarUsuario = false;
  }
}
