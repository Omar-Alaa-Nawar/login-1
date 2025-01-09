import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-language-dropdown',
    templateUrl: './language-dropdown.component.html',
    styleUrls: ['./language-dropdown.component.scss'],
    standalone: false
})
export class LanguageDropdownComponent {
  @Input() selectedLanguage: string = 'en'; // Default language
  @Output() selectedLanguageChange = new EventEmitter<string>();

  dropdownVisible: boolean = false;
  hoveredLanguage: string | null = null; // To track the hovered language

  // Language options
  languages = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'ar', label: 'Arabic' },
  ];

  // Toggle the visibility of the dropdown
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Handle selection change
  onLanguageChange(lang: string): void {
    this.selectedLanguage = lang;
    this.selectedLanguageChange.emit(lang);
    this.dropdownVisible = false;  // Hide dropdown after selection
  }

  // Set the hovered language for styling
  setHoveredLanguage(lang: string | null): void {
    this.hoveredLanguage = lang;
  }

  // Get the language label by its code (added method)
  getLanguageLabel(langCode: string): string {
    const language = this.languages.find(lang => lang.value === langCode);
    return language ? language.label : '';
  }
}