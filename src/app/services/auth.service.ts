import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string;

  private token: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:8080/api/usuario';
    this.leerToken();
  }

  login(usuario: Usuario): Observable<any> {

    const body = {
      username: usuario.username,
      password: usuario.password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      }),
    };

    return this.httpClient.post(this.url + '/login', body, httpOptions)
            .pipe(//Esta forma se utiliza para guardar el token cuando se está en la capa service
              map(response => {
                this.guardarToken(response['token']);
                return response;
              }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  nuevoUsuario(usuario: Usuario) {

    const body = {
      username: usuario.username,
      password: usuario.password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      }),
    };

    return this.httpClient.post(this.url + '/add', body, httpOptions)
            .pipe(//Esta forma se utiliza para guardar el token cuando se está en la capa service
              map(response => {
                this.guardarToken(response['token']);
                return response;
              }));

  }

  private guardarToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
    return this.token;
  }

  estaAutenticado(): boolean {
    return this.token.length > 2;
  }

}
