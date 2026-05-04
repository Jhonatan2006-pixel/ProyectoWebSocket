import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-perfil-resumen',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './perfil-resumen.html',
  styleUrl: './perfil-resumen.css'
})
export class PerfilResumenComponent implements OnInit {
  desdeDashboard = false;
  usuario: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.desdeDashboard = params['origen'] === 'dashboard';
    });

    const perfilRecienCreado = localStorage.getItem('perfilRecienCreado');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (perfilRecienCreado) {
      this.usuario = JSON.parse(perfilRecienCreado);
    } else if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }

  obtenerFoto(): string {
    if (!this.usuario?.foto) {
      return '';
    }

    if (this.usuario.foto.startsWith('data:image')) {
      return this.usuario.foto;
    }

    return `data:image/png;base64,${this.usuario.foto}`;
  }
}