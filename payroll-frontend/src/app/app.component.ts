import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

isCollapsed = false;
isMobileOpen = false;

toggleSidebar() {
  if (window.innerWidth <= 768) {
    this.isMobileOpen = !this.isMobileOpen;
  } else {
    this.isCollapsed = !this.isCollapsed;
  }
}

closeMobile() {
  this.isMobileOpen = false;
}
}
