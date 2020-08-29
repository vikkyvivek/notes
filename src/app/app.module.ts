import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NotesHeaderComponent } from './notes/notes-header/notes-header.component';
import { NotesSideBarComponent } from './notes/notes-side-bar/notes-side-bar.component';
import { NotesContentEditorComponent } from './notes/notes-content-editor/notes-content-editor.component';
import { HighlightSearchPipe } from './notes/shared/pipe/highlight-search.pipe';
import { ContentEditableFormDirective } from './notes/shared/directive/content-editable-form.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NotesHeaderComponent,
    NotesSideBarComponent,
    NotesContentEditorComponent,
    HighlightSearchPipe,
    ContentEditableFormDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NotesContentEditorComponent),  // replace name as appropriate
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
