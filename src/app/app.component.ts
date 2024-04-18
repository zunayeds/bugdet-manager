import { Component } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  visibility = false;

  title = 'budget-manager';
  sidebarMenus = [
    { name: 'Dashboard', icon: 'pi-th-large', link: '/dashboard' },
    { name: 'Set Budget', icon: 'pi-dollar', link: '/budget' },
    {
      name: 'Manage Catergories',
      icon: 'pi-objects-column',
      link: '/category',
    },
    {
      name: 'Manage Accounts',
      icon: 'pi-wallet',
      link: '/account',
    },
  ];
}
