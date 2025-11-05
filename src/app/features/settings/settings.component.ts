import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  isDarkMode = false;
  themeColor = '#1976d2';
  customColor = '';
  showCustomInput = false;
  availableColors = [
    { name: 'Blue', value: '#1976d2' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Red', value: '#f44336' },
    { name: 'Green', value: '#4caf50' },
    { name: 'Orange', value: '#ff9800' },
    { name: 'Teal', value: '#009688' },
    { name: 'Indigo', value: '#3f51b5' },
    { name: 'Pink', value: '#e91e63' }
  ];

  constructor(private themeService: ThemeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeColor = this.themeService.getThemeColor();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
    this.cdr.markForCheck();
  }

  setThemeColor(color: string): void {
    this.themeColor = color;
    this.themeService.setThemeColor(color);
    this.showCustomInput = false;
    this.cdr.markForCheck();
  }

  applyCustomColor(): void {
    if (this.customColor && /^#[0-9A-F]{6}$/i.test(this.customColor)) {
      this.setThemeColor(this.customColor);
      this.customColor = '';
    }
  }

  toggleCustomInput(): void {
    this.showCustomInput = !this.showCustomInput;
    if (!this.showCustomInput) {
      this.customColor = '';
    }
    this.cdr.markForCheck();
  }

  resetSettings(): void {
    this.isDarkMode = false;
    this.themeColor = '#1976d2';
    this.showCustomInput = false;
    this.customColor = '';
    this.themeService.setDarkMode(false);
    this.themeService.setThemeColor('#1976d2');
    this.cdr.markForCheck();
  }
}
