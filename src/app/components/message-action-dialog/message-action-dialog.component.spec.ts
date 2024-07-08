import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageActionDialogComponent } from './message-action-dialog.component';

describe('MessageActionDialogComponent', () => {
  let component: MessageActionDialogComponent;
  let fixture: ComponentFixture<MessageActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageActionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
