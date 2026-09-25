import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the Cargo title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Cargo');
  });

  it('should render the landing page headline and transport cards', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Cargo. Delivery.');
    expect(compiled.querySelectorAll('.solution-card').length).toBeGreaterThanOrEqual(3);
    expect(compiled.textContent).toContain('By Land');
  });

  it('should calculate a positive shipping estimate', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.calculateEstimate();

    expect(app.estimatedCost).toBeGreaterThan(0);
    expect(app.estimateError).toBe('');
  });

  it('should validate the contact request before submitting', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.submitContact();

    expect(app.contactSubmitted).toBeFalse();
    expect(app.contactError).toContain('complete');
  });
});
