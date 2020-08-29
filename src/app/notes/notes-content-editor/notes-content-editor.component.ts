import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../shared/models/note.model';

@Component({
  selector: 'app-notes-content-editor',
  templateUrl: './notes-content-editor.component.html',
  styleUrls: ['./notes-content-editor.component.scss']
})
export class NotesContentEditorComponent implements OnInit {

  @Input() sideNavStatus;
  @Input() selectedNote$: BehaviorSubject<Note>;
  @Output() updateNote: EventEmitter<Note> = new EventEmitter(null);

  selectedNote: Note;

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    this.selectedNote.dateTime = new Date();
    this.onChange();
  }

  constructor() { }

  ngOnInit(): void {
    this.selectedNote$.subscribe(note => {
      this.selectedNote = note;
    });
  }

  onChange(): void {
    this.updateNote.next(this.selectedNote);
  }
}
