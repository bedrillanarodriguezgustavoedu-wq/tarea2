import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ShippingMethod = 'Land' | 'Air' | 'Sea';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Cargo';
  services = [
    { title: 'Door-to-door delivery', text: 'Reliable pickup, tracking and final delivery managed by one team.' },
    { title: 'Business logistics', text: 'Flexible freight solutions built around your schedule and budget.' },
    { title: 'Cargo protection', text: 'Careful handling, transparent updates and optional shipping insurance.' }
  ];
  shippingMethods: ShippingMethod[] = ['Land', 'Air', 'Sea'];
  selectedMethod: ShippingMethod = 'Land';
  typeOfGoods = 'General Cargo';
  weight = 250;
  height = 30;
  width = 20;
  length = 18;
  fromCountry = 'USA';
  toCountry = 'Mexico';
  fromCity = 'Chicago';
  toCity = 'Mexico City';
  estimatedCost: number | null = null;
  estimateSubmitted = false;
  estimateError = '';
  contactName = '';
  contactEmail = '';
  contactMessage = '';
  contactSubmitted = false;
  contactError = '';

  ngOnInit(): void {
    this.calculateEstimate();
  }

  get methodRate(): number {
    switch (this.selectedMethod) {
      case 'Land':
        return 2;
      case 'Air':
        return 9;
      case 'Sea':
        return 2.5;
      default:
        return 0;
    }
  }

  calculateEstimate(): void {
    const numericWeight = Number(this.weight) || 0;
    const numericHeight = Number(this.height) || 0;
    const numericWidth = Number(this.width) || 0;
    const numericLength = Number(this.length) || 0;

    if (numericWeight <= 0 || numericHeight <= 0 || numericWidth <= 0 || numericLength <= 0) {
      this.estimatedCost = null;
      this.estimateError = 'Enter a weight and dimensions greater than zero.';
      return;
    }

    this.estimateError = '';
    const cubicVolume = (numericHeight * numericWidth * numericLength) / 1728;
    const volumetricWeight = Math.max(numericWeight, cubicVolume * 10);
    const countryFactor = this.fromCountry === this.toCountry ? 1 : 1.25;
    const distanceFactor = this.selectedMethod === 'Air' ? 1.65 : this.selectedMethod === 'Sea' ? 1.25 : 1;
    const basePrice = this.methodRate * volumetricWeight * countryFactor * distanceFactor;

    this.estimatedCost = Number((basePrice + basePrice * 0.12).toFixed(2));
    this.estimateSubmitted = true;
  }

  submitContact(): void {
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contactEmail.trim());

    if (!this.contactName.trim() || !emailIsValid || !this.contactMessage.trim()) {
      this.contactSubmitted = false;
      this.contactError = 'Please complete your name, a valid email and your message.';
      return;
    }

    this.contactError = '';
    this.contactSubmitted = true;
  }
}
