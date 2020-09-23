import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicObservableComponent } from './basic-observable.component';

describe('BasicObservableComponent', () => {
  let component: BasicObservableComponent;
  let fixture: ComponentFixture<BasicObservableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicObservableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
