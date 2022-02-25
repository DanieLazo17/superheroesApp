import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajeEncontradoComponent } from './personaje-encontrado.component';

describe('PersonajeEncontradoComponent', () => {
  let component: PersonajeEncontradoComponent;
  let fixture: ComponentFixture<PersonajeEncontradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonajeEncontradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonajeEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
