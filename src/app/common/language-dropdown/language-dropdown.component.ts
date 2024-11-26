import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.css']
})
export class LanguageDropdownComponent {
  @Input() selectedLanguage: string = 'en'; // Default to English
  @Output() selectedLanguageChange = new EventEmitter<string>(); // Notify parent on change

  onLanguageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedLanguageChange.emit(selectedValue); // Emit new language to parent
    console.log(`Language changed to: ${selectedValue}`);
  }
}
