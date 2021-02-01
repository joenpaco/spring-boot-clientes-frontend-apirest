import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeditclienteComponent } from './formeditcliente.component';

describe('FormeditclienteComponent', () => {
  let component: FormeditclienteComponent;
  let fixture: ComponentFixture<FormeditclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormeditclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeditclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
