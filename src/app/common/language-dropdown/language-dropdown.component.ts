import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.css']
})
export class LanguageDropdownComponent {
  @Input() selectedLanguage: string = 'en'; // Default to 'en' if not set
  @Output() selectedLanguageChange = new EventEmitter<string>(); // This emits the new language value

  // List of available languages
  languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    // Add more languages here as needed
  ];

  onLanguageChange(language: string) {
    this.selectedLanguage = language;
    this.selectedLanguageChange.emit(language); // Emit the selected language
  }
  
}
