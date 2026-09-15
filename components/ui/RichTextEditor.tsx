"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ content, onChange, className = "" }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 text-[var(--color-ink)] font-[var(--font-inter)]',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('URL gambar:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL link:', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className={`border-2 border-[var(--color-line)] rounded-[var(--radius-card)] overflow-hidden bg-white ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-md hover:bg-white transition-colors ${editor.isActive('bold') ? 'bg-white shadow-sm text-[var(--color-brand-blue)]' : 'text-[var(--color-ink-soft)]'}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-md hover:bg-white transition-colors ${editor.isActive('italic') ? 'bg-white shadow-sm text-[var(--color-brand-blue)]' : 'text-[var(--color-ink-soft)]'}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-6 bg-[var(--color-line)] my-auto mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-md hover:bg-white transition-colors ${editor.isActive('bulletList') ? 'bg-white shadow-sm text-[var(--color-brand-blue)]' : 'text-[var(--color-ink-soft)]'}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-md hover:bg-white transition-colors ${editor.isActive('orderedList') ? 'bg-white shadow-sm text-[var(--color-brand-blue)]' : 'text-[var(--color-ink-soft)]'}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-6 bg-[var(--color-line)] my-auto mx-1" />
        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded-md hover:bg-white transition-colors ${editor.isActive('link') ? 'bg-white shadow-sm text-[var(--color-brand-blue)]' : 'text-[var(--color-ink-soft)]'}`}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded-md hover:bg-white transition-colors text-[var(--color-ink-soft)]"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
