import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../shared/models/note.model';
import { HighlightSearchPipe } from '../shared/pipe/highlight-search.pipe';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notes-side-bar',
  templateUrl: './notes-side-bar.component.html',
  styleUrls: ['./notes-side-bar.component.scss']
})
export class NotesSideBarComponent implements OnInit {

  @Input() sideNavStatus;
  @Input() notes: Array<Note>;
  @Input() searchedText: string;
  @Input() selectedNote$: BehaviorSubject<Note>;
  @Output() updateCurrentSelection: EventEmitter<number> = new EventEmitter(null);

  selectedNoteId = 1;

  constructor() { }

  ngOnInit(): void {
    this.selectedNote$.subscribe(note => {
      this.selectedNoteId = note.id;
    });
  }

  updateSelectedNote(selectedNoteId): void {
    this.selectedNoteId = selectedNoteId;
    this.updateCurrentSelection.emit(selectedNoteId);
  }

  isNoteVisible(note: Note): boolean {
    if (this.searchedText) {
      if (note.content.indexOf(this.searchedText) > -1 || note.title.indexOf(this.searchedText) > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
