import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;

  recordarme = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere Por favor...',
      icon: "info"
    });

    Swal.showLoading();

    this.authService.nuevoUsuario(this.usuario)
    .subscribe(response => {
      /* console.log(response); */
      Swal.close();
      if (this.recordarme) {
        localStorage.setItem('username', this.usuario.username);//Esta forma se utiliza para guardar el token cuando se está en el component
      }
      this.router.navigateByUrl('/home');
    }, (err => {
      console.log(err.error.message);
      Swal.fire({
        text: err.error.message,
        title: 'Error',
        icon: 'error'
      });
    }));
  }

}
