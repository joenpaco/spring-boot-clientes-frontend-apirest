import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isAdministrador: boolean;

  username: string;
  
  constructor() { }
}
