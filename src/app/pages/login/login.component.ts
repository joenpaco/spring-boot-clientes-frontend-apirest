import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  isAdministrador: boolean;

  recordarme = false;

  constructor(private authService: AuthService,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.usuario.username = localStorage.getItem('username');
      this.recordarme = true;
    }
    /* this.usuario = new Usuario('', ''); */
  }

  onLogin(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.authService.login(this.usuario)
    .subscribe((response) => {
/*       console.log(response);
      console.log(response.user.authorities.some(authority => authority.authority === 'ROLE_ADMIN'));
      console.log(response.user.username); */
      this.sharedService.username = response.user.username;
      this.sharedService.isAdministrador = response.user.authorities.some(authority => authority.authority === 'ROLE_ADMIN');
      Swal.close();
      localStorage.setItem('token', response.token);
      if (this.recordarme) {
        localStorage.setItem('username', this.usuario.username);//Esta forma se utiliza para guardar el token cuando se está en el component
      }
      this.router.navigateByUrl('/cliente');
      /* console.log(`this.usuario.username has iniciado sesión`); */
    }, (err) => {
      console.log(err.error.mensaje);
      /* console.log(err.error.message); */
      Swal.fire({
        text: err.error.mensaje,
        title: 'Error',
        icon: 'error'
      });
    });

  }

}
