import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeKey = 'darkMode';
  private themeColorKey = 'themeColor';
  private defaultColor = '#1976d2';

  constructor() {
    this.applyTheme();
  }

  isDarkMode(): boolean {
    const saved = localStorage.getItem(this.darkModeKey);
    return saved ? JSON.parse(saved) : false;
  }

  setDarkMode(isDark: boolean): void {
    localStorage.setItem(this.darkModeKey, JSON.stringify(isDark));
    this.applyTheme();
  }

  getThemeColor(): string {
    return localStorage.getItem(this.themeColorKey) || this.defaultColor;
  }

  setThemeColor(color: string): void {
    localStorage.setItem(this.themeColorKey, color);
    this.applyTheme();
  }

  private applyTheme(): void {
    const isDark = this.isDarkMode();
    const color = this.getThemeColor();
    const root = document.documentElement;

    if (isDark) {
      root.style.setProperty('--bg-color', '#1a1a1a');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--card-bg', '#2a2a2a');
      root.style.setProperty('--border-color', '#444444');
      document.body.classList.add('dark-mode');
    } else {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#333333');
      root.style.setProperty('--card-bg', '#f9fafc');
      root.style.setProperty('--border-color', '#dddddd');
      document.body.classList.remove('dark-mode');
    }

    root.style.setProperty('--primary-color', color);
    root.style.setProperty('--primary-dark', this.darkenColor(color, 0.2));
  }

  private darkenColor(color: string, amount: number): string {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    const r = Math.max(0, (num >> 16) - Math.round(255 * amount));
    const g = Math.max(0, (num >> 8 & 0x00FF) - Math.round(255 * amount));
    const b = Math.max(0, (num & 0x0000FF) - Math.round(255 * amount));
    return (usePound ? '#' : '') + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
