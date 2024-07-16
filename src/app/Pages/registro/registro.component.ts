import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../Services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  @Input('codigo') codigo: number | null = null;
  private usuarioService = inject(UsuarioService);
  public formBuild = inject(FormBuilder);

  constructor() { }

  public formUsuario: FormGroup = this.formBuild.group({
    id: [0],
    nombre: [""],
    apellido: [""],
    tipo_documento: [""],
    nro_documento: [0],
    correo: [""],
    username: [""],
    password: [""],
    celular: [0],
    direccion: [""],
    rol: ["cliente"]
  });


  ngOnInit(): void {
    if (this.codigo && this.codigo !== 0) {
      this.usuarioService.obtener(this.codigo).subscribe({
        next: (data) => {
          if (data) {
            this.formUsuario.patchValue({
              id: data.id,
              nombre: data.nombre,
              apellido: data.apellido,
              correo: data.correo,
              tipo_documento: data.tipo_documento,
              nro_documento: data.nro_documento,
              username: data.username,
              password: data.password,
              celular: data.celular,
              direccion: data.direccion,
              rol: data.rol
            });
          } else {
            console.log('No se encontraron datos para el código proporcionado');
          }
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }


  registrarUsuario() {
    const username = this.formUsuario.value.username;
    this.usuarioService.existeNombreUsuario(username).subscribe(
      (existe: boolean) => {
        if (existe) {
          Swal.fire('Registro Denegado', 'El usuario ya existe', 'error');
        } else {
          const nuevoUsuario = {
            id: this.formUsuario.value.id,
            nombre: this.formUsuario.value.nombre,
            apellido: this.formUsuario.value.apellido,
            correo: this.formUsuario.value.correo,
            tipo_documento: this.formUsuario.value.tipo_documento,
            nro_documento: this.formUsuario.value.nro_documento,
            username: this.formUsuario.value.username,
            password: this.formUsuario.value.password,
            celular: this.formUsuario.value.celular,
            direccion: this.formUsuario.value.direccion,
            rol: this.formUsuario.value.rol
          };

          this.usuarioService.crear(nuevoUsuario).subscribe(
            response => {
              Swal.fire('Registro Exitoso', 'El usuario fue registrado', 'success');
              this.formUsuario.reset();
            },
            error => {
              Swal.fire('ERROR', 'Hubo un error al registrar el usuario', 'error');
            }
          );
        }
      },
      error => {
        Swal.fire('ERROR', 'Hubo un error al verificar el usuario', 'error');
      }
    );
  }
}
