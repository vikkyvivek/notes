import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notes-header',
  templateUrl: './notes-header.component.html',
  styleUrls: ['./notes-header.component.scss']
})
export class NotesHeaderComponent implements OnInit {

  @Input() sideNavStatus: boolean;
  @Output() toggleSideNav: EventEmitter<boolean> = new EventEmitter(false);
  @Output() addNote: EventEmitter<boolean> = new EventEmitter(null);
  @Output() deleteNote: EventEmitter<boolean> = new EventEmitter(null);
  @Output() searchNotes: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSideNavClick(): void {
    this.toggleSideNav.emit(!this.sideNavStatus);
  }

  addNewNote(): void {
    this.addNote.emit(true);
  }

  deleteSelectedNote(): void {
    this.deleteNote.emit(true);
  }

  onInputChange(event): void {
    const value = event.target.value;
    this.searchNotes.emit(value);
  }
}
