import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.css']
})
export class LanguageDropdownComponent {
  @Input() selectedLanguage: string = 'en';  // Default to English
  @Output() selectedLanguageChange = new EventEmitter<string>();  // Emit changes to the parent

  onLanguageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedLanguageChange.emit(selectedValue);  // Emit the selected value
    console.log(`Language changed to: ${selectedValue}`);
    // Implement additional logic here, e.g., updating a translation service
  }
}
