import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjobformComponent } from './newjobform.component';

describe('NewjobformComponent', () => {
  let component: NewjobformComponent;
  let fixture: ComponentFixture<NewjobformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjobformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjobformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
