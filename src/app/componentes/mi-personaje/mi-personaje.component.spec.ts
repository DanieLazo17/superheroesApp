import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPersonajeComponent } from './mi-personaje.component';

describe('MiPersonajeComponent', () => {
  let component: MiPersonajeComponent;
  let fixture: ComponentFixture<MiPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiPersonajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
