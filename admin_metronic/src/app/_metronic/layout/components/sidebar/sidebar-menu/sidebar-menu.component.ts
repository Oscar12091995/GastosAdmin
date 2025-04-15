import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  user:any;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  showMenu(permisos:any = []){
    if (this.isRole()) {
      return true;
    }
    let permissions = this.user.permissions;
    let is_show = false;
    permisos.forEach((permiso:any) => {
      if (permissions.includes(permiso)) {
        is_show = true;
      }
    });
    return is_show;
  }

  isRole(){
    return this.user.role_name =+ 'Super-Admin' ? true : false;
  }

}
