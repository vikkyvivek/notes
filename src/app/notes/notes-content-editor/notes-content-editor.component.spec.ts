import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesContentEditorComponent } from './notes-content-editor.component';

describe('NotesContentEditorComponent', () => {
  let component: NotesContentEditorComponent;
  let fixture: ComponentFixture<NotesContentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesContentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
