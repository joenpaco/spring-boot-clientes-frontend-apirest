import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string;

  constructor(private httpClient: HttpClient) { 
    this.url = 'http://localhost:8080/api/cliente';
  }
  listarClientes(): Observable<any> {

    return this.httpClient.get(this.url + "/listar");

  }

  addCliente(cliente: Cliente): Observable<any> {
    const body = {
      nombre: cliente.nombre,
      apellido: cliente.apellido
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      }),
    };

    return this.httpClient.post(this.url + '/add', body, httpOptions);

  }

  updateCliente(cliente: Cliente): Observable<any> {
    const body = {
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      }),
    };
    return this.httpClient.put(this.url + '/update', body, httpOptions);
  }

  deleteCliente(id: number): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      }),
    };
    console.log(this.url + '/eliminar/' + id);
    return this.httpClient.delete(this.url + '/eliminar/' + id, httpOptions);
    
  }

  editarCliente(): void {
    console.log('DESDE EL SERVICIO CLIENTE');
  }

  findClienteById(id: number): Observable<any> {
    const body = {
      id: id
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      }),
    };

    return this.httpClient.post(this.url + '/findClienteById', body, httpOptions);
  }

}
