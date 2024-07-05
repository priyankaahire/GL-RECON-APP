import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconListComponent } from './recon-list.component';

describe('ReconListComponent', () => {
  let component: ReconListComponent;
  let fixture: ComponentFixture<ReconListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
