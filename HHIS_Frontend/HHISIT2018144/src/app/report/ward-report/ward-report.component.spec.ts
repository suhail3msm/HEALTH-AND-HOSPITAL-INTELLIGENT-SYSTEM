import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardReportComponent } from './ward-report.component';

describe('WardReportComponent', () => {
  let component: WardReportComponent;
  let fixture: ComponentFixture<WardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
