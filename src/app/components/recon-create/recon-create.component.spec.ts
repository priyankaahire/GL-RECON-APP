import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconCreateComponent } from './recon-create.component';

describe('ReconCreateComponent', () => {
  let component: ReconCreateComponent;
  let fixture: ComponentFixture<ReconCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
