import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isDarkMode: boolean = false; // To track the current theme

  constructor(private renderer: Renderer2) {}

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode; // Toggle the mode
    const theme = this.isDarkMode ? 'dark-mode' : '';
    const icon = this.isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill';

    // Add or remove the dark mode class to the body
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }

    // Update the icon dynamically (you can handle this in the HTML template if desired)
    const themeToggleBtn = document.getElementById('themeToggleBtn')!;
    themeToggleBtn.querySelector('i')!.className = `bi ${icon}`;
  }
}
