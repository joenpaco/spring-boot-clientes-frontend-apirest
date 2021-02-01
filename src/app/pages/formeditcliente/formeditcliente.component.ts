import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClientedataService } from 'src/app/services/clientedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formeditcliente',
  templateUrl: './formeditcliente.component.html',
  styleUrls: ['./formeditcliente.component.css']
})
export class FormeditclienteComponent implements OnInit {

  title: String;
  cliente: Cliente;

  constructor(private router: Router,
              private clienteService: ClienteService,
              private clienteData: ClientedataService) { 
    this.title = 'Editar Cliente';
  }

  ngOnInit(): void {
    this.cliente = this.clienteData.cliente;
  }

  onUpdateCliente(form: NgForm): void {
    if (typeof this.cliente.id !== 'undefined') {
      if (form.invalid) {
        return;
      }
  
/*       console.log(this.cliente);
      console.log(typeof this.cliente.id); */
  
      Swal.fire({
        /* allowOutsideClick: false, */
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
  
      this.clienteService.updateCliente(this.cliente)
        .subscribe((response) => {
          /* console.log(response); */
          Swal.close();
          this.router.navigateByUrl('/cliente');
        }, (error) => {
          /* console.log(error); */
/*           Swal.fire({
            text: error.error.mensaje,
            title: 'Error',
            icon: 'error'
          }); */
        });
    }
  }

}
