import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatDivider,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'budget-manager';
  sidebarMenus = [
    { name: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
    { name: 'Set Budget', icon: 'price_change', link: '/budget' },
    { name: 'Manage Catergories', icon: 'category', link: '/manage' },
    {
      name: 'Manage Accounts',
      icon: 'account_balance_wallet',
      link: '/account',
    },
  ];
}
