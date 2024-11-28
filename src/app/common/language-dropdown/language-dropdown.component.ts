import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.css'],
})
export class LanguageDropdownComponent {
  @Input() selectedLanguage: string = 'en';
  @Output() selectedLanguageChange = new EventEmitter<string>();

  dropdownVisible: boolean = false;
  hoveredLanguage: string | null = null;

  // Language options
  languages = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'ar', label: 'Arabic' },
  ];

  onLanguageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedLanguage = selectedValue;
    this.selectedLanguageChange.emit(selectedValue);
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  setHoveredLanguage(lang: string): void {
    this.hoveredLanguage = lang;
  }
}
