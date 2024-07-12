import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconEditComponent } from './recon-edit.component';

describe('ReconEditComponent', () => {
  let component: ReconEditComponent;
  let fixture: ComponentFixture<ReconEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
