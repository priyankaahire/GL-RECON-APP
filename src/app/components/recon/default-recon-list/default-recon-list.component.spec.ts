import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultReconListComponent } from './default-recon-list.component';

describe('DefaultReconListComponent', () => {
  let component: DefaultReconListComponent;
  let fixture: ComponentFixture<DefaultReconListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultReconListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultReconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
