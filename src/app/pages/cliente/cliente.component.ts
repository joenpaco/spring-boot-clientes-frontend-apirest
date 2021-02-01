import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClientedataService } from 'src/app/services/clientedata.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: any;

  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
              private sharedService: SharedService,
              private clienteData: ClientedataService,
              private router: Router) { }

  ngOnInit(): void {
    this.clienteService.listarClientes().subscribe(
      (response) => {
        this.clientes = response;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          text: 'Ha ocurrido un error',
          title: 'Error',
          icon: 'error'
        });
      });
  }

  isAdministrador(): boolean {
    return this.sharedService.isAdministrador;
  }

  onEditar(idCliente: number): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.clienteService.findClienteById(idCliente)
    .subscribe((response) => {
      this.cliente = response;
      this.clienteData.cliente = response;
      this.router.navigateByUrl('/formeditcliente/' + this.clienteData.cliente.id);
      /* console.log(this.clienteData.cliente); */
      Swal.close();
    }, (err) => {
      console.log(err);
      Swal.fire({
        text: err.error.mensaje,
        title: 'Error',
        icon: 'error'
      });
    });
  }

  onEliminar(idCliente: number, indice: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(idCliente)
        .subscribe((response) => {
          this.clientes.splice(indice, 1);
          console.log(response);
          console.log('Eliminado');
        }, (err) => {
          console.log(err);
          Swal.fire({
            text: err.error.mensaje,
            title: 'Error',
            icon: 'error'
          });
        });
      }
    });

  }

}
