class App {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.text = '';
        this.id = '';
        
        this.$form = document.querySelector('#form')
        this.$noteText = document.querySelector('#note-text')
        this.$submitButton = document.querySelector('#submit-button')
        this.$notes = document.querySelector('#notes')
        this.$modal = document.querySelector('.modal');
        this.$modalText = document.querySelector('#modal-text');
        this.$modalCloseButton = document.querySelector('#modal-close-button')
        
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener('click', event => {
            this.selectNote(event);
            this.openModal(event);
            this.deleteNote(event);
        })

        this.$form.addEventListener('submit', event => {
            event.preventDefault();
            const text = this.$noteText.value;
            if(text) {
                this.addNote({text})
            }
          
        })

        this.$modalCloseButton.addEventListener('click', event => {
            this.closeModal(event);
        })
    }

    openModal(event) {
        if(event.target.matches('.toolbar-delete')) return;
        if(event.target.closest('.note')) {
         this.$modal.classList.toggle('open-modal')
         this.$modalText.value = this.text;
        }
    }

    closeModal(event) {
        this.editNote();
        this.$modal.classList.toggle('open-modal')
    }

    addNote(note) {
        const newNote = {
          text: note.text,
          id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        }
        this.notes = [...this.notes, newNote]
        this.render();
        this.clearForm();
    }

    editNote() {
        const text = this.$modalText.value;
        this.notes = this.notes.map(note => 
            note.id === Number(this.id) ? {...note, text} : note)
        this.render();    
    }

    selectNote(event) {
        const $selectedNote = event.target.closest('.note');
        if(!$selectedNote) return;
        const [$noteText] = $selectedNote.children;
        this.text = $noteText.innerText;
        this.id = $selectedNote.dataset.id;
    }

    clearForm() {
        this.$noteText.value = '';
    }

    deleteNote(event) {
        event.stopPropagation();
        if(!event.target.matches('.toolbar-delete')) return;
        const id = event.target.dataset.id;
        this.notes = this.notes.filter(note => note.id !== Number(id));
        this.render();
    }

    render() {
        this.saveNotes();
        this.displayNotes();
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes))
    }

    displayNotes() {
        this.$notes.innerHTML = this.notes.map(note => `
        <div class='note' data-id='${note.id}'>
         <div class='note-text'>${note.text}</div>
         <img data-id='${note.id}' class='toolbar-delete' src='img/bin.png'>
        </div>
        `).join('');
    }

    
}

new App();