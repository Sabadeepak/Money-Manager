import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTrackerComponent } from './transaction-tracker.component';

describe('TransactionTrackerComponent', () => {
  let component: TransactionTrackerComponent;
  let fixture: ComponentFixture<TransactionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
