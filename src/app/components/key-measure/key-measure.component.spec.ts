import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyMeasureComponent } from './key-measure.component';

describe('KeyMeasureComponent', () => {
  let component: KeyMeasureComponent;
  let fixture: ComponentFixture<KeyMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyMeasureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
