import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientedataService {

  cliente: Cliente;

  constructor() { }
}
