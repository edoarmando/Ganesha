"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Check, X } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: number
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  // Load notes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("notes")
    if (saved) {
      setNotes(JSON.parse(saved))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
  }, [notes])

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      createdAt: Date.now(),
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setEditTitle(newNote.title)
    setEditContent(newNote.content)
    setIsCreating(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
      setEditTitle("")
      setEditContent("")
    }
  }

  const selectNote = (note: Note) => {
    setSelectedNote(note)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const saveNote = () => {
    if (selectedNote) {
      setNotes(
        notes.map((note) => (note.id === selectedNote.id ? { ...note, title: editTitle, content: editContent } : note)),
      )
      setSelectedNote({ ...selectedNote, title: editTitle, content: editContent })
    }
  }

  const cancelEdit = () => {
    if (selectedNote) {
      setEditTitle(selectedNote.title)
      setEditContent(selectedNote.content)
    }
  }

  const hasChanges = selectedNote && (selectedNote.title !== editTitle || selectedNote.content !== editContent)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-foreground">Notes</h1>
            <Button size="icon" onClick={createNote}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notes.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p className="text-sm">No notes yet</p>
              <p className="text-xs mt-1">Click the + button to create one</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                    selectedNote?.id === note.id ? "bg-accent" : "bg-card"
                  }`}
                  onClick={() => selectNote(note)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate text-card-foreground">{note.title}</h3>
                      <p className="text-xs text-muted-foreground truncate mt-1">{note.content || "No content"}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-xl font-semibold border-none focus-visible:ring-0 px-0"
                placeholder="Note title"
              />
              {hasChanges && (
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={cancelEdit}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={saveNote}>
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 p-4">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Start writing..."
                className="w-full h-full resize-none border-none focus-visible:ring-0 text-base leading-relaxed"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">Select a note to view</p>
              <p className="text-sm mt-2">or create a new one to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
