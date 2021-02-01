import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaAutenticado: boolean;
  username: string;

  constructor(private authService: AuthService,
              private router: Router,
              private sharedService: SharedService) { 
    this.estaAutenticado = this.authService.estaAutenticado();
    this.username = this.sharedService.username;
  }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
