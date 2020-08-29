import { Component, OnInit, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from './shared/models/note.model';
import { SampleNotes } from './shared/data/sample-notes';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  sideNavStatus = true;
  notes: Array<Note> = SampleNotes;
  filteredNotes: Array<Note> = SampleNotes;
  selectedNote: Note;
  searchedText: string;
  selectedNote$: BehaviorSubject<Note> = new BehaviorSubject(null);
  sideNavStatusUpdate$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 720) {
      this.sideNavStatus = false;
    }
  }

  constructor() {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.selectedNote$.next(this.notes[0]);
    this.selectedNote = this.notes[0];
  }

  toggleSideNav(event): void {
    this.sideNavStatus = event;
    this.sideNavStatusUpdate$.next(event);
  }

  onNoteUpdate(event: Note): void {
    this.notes.forEach((note) => {
      if (note.id === event.id) {
        note.content = event.content;
        note.title = event.title;
        note.dateTime = event.dateTime;
      }
    });
  }

  updateCurrentSelection(selectedNoteId): void {
    const selectedNote = this.notes.filter(note => note.id === selectedNoteId);
    this.selectedNote$.next(selectedNote[0]);
    this.selectedNote = selectedNote[0];
  }

  addNewNote(event): void {
    if (this.filteredNotes.length == 0) {
      this.searchedText = '';
      return;
    }
    const note: Note = {
      id: this.notes.length * 8,
      title: 'New Note Title',
      content: 'Add Additional data',
      dateTime: new Date()
    };
    this.notes.unshift(note);
    this.notes.sort((a, b) => Date.parse(b.dateTime.toLocaleDateString('en-us')) - Date.parse(a.dateTime.toLocaleDateString('en-us')));
    this.notes = [...this.notes];
    this.filteredNotes = [...this.notes];
    this.selectedNote$.next(note);
    this.selectedNote = note;
  }

  deleteSelectedNote(event): void {
    const selectedNodeIndex = this.notes.findIndex(note => note.id == this.selectedNote.id);
    this.notes.splice(selectedNodeIndex, 1);
    this.notes.sort((a, b) => Date.parse(b.dateTime.toLocaleDateString('en-us')) - Date.parse(a.dateTime.toLocaleDateString('en-us')));
    this.notes = [...this.notes];
    if (this.searchedText) {
      const selectedFilteredNodeIndex = this.filteredNotes.findIndex(note => note.id == this.selectedNote.id);
      this.filteredNotes.splice(selectedFilteredNodeIndex, 1);
      this.filteredNotes = [...this.filteredNotes];
      if (this.filteredNotes.length >= 1) {
        this.selectedNote$.next(this.filteredNotes[0]);
        this.selectedNote = this.filteredNotes[0];
      } else {
        const newNote = {
          id: 0,
          title: '',
          content: '',
          dateTime: new Date()
        };
        this.selectedNote$.next(newNote);
      }
    } else {
      this.filteredNotes = [...this.notes];
      if (this.notes.length >= 1) {
        this.selectedNote$.next(this.notes[0]);
        this.selectedNote = this.notes[0];
      } else {
        const newNote = {
          id: 1,
          title: 'New Note Title',
          content: 'Add Additional data',
          dateTime: new Date()
        };
        this.selectedNote$.next(newNote);
        this.notes.push(newNote);
        this.notes.sort((a, b) => Date.parse(b.dateTime.toLocaleDateString('en-us')) - Date.parse(a.dateTime.toLocaleDateString('en-us')));
        this.notes = [...this.notes];
        this.filteredNotes = [...this.notes];
      }
    }
  }

  searchNotes(event): void {
    this.searchedText = event;
    if (this.searchedText) {
      const filteredArray = this.notes.filter(note => {
        if (note.content.indexOf(this.searchedText) > -1 || note.title.indexOf(this.searchedText) > -1) {
          return note;
        }
      });
      this.filteredNotes.sort((a, b) => Date.parse(b.dateTime.toLocaleDateString('en-us')) - Date.parse(a.dateTime.toLocaleDateString('en-us')));
      this.filteredNotes = [...filteredArray];
    } else {
      this.notes.sort((a, b) => Date.parse(b.dateTime.toLocaleDateString('en-us')) - Date.parse(a.dateTime.toLocaleDateString('en-us')));
      this.filteredNotes = [...this.notes];

    }
    this.selectedNote$.next(this.filteredNotes[0]);
    this.selectedNote = this.filteredNotes[0];
  }
}
