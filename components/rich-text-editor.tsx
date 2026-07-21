"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { Bold, Italic, AArrowUp, AArrowDown } from "lucide-react"

function ToolbarButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      // onMouseDown + preventDefault mantiene la selección de texto al pulsar.
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  )
}

export function RichTextEditor({
  name,
  defaultValue = "",
  minHeight = 120,
}: {
  name: string
  defaultValue?: string
  minHeight?: number
}) {
  const editorRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Inicializa el contenido UNA sola vez, sin que React vuelva a tocar el
  // contentEditable en cada pulsación (eso rompía la escritura y el cursor).
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = defaultValue
    }
    if (inputRef.current) {
      inputRef.current.value = defaultValue
    }
    // Solo al montar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Copia el HTML actual del editor al input oculto que envía el formulario.
  function sync() {
    if (inputRef.current && editorRef.current) {
      inputRef.current.value = editorRef.current.innerHTML
    }
  }

  function focusEditor() {
    editorRef.current?.focus()
  }

  function exec(command: "bold" | "italic") {
    focusEditor()
    document.execCommand(command, false)
    sync()
  }

  function changeSize(size: string) {
    focusEditor()
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return
    const range = sel.getRangeAt(0)
    if (!editorRef.current?.contains(range.commonAncestorContainer)) return

    const span = document.createElement("span")
    span.style.fontSize = size
    try {
      span.appendChild(range.extractContents())
      range.insertNode(span)
      // Reseleccionar el contenido para poder encadenar cambios.
      sel.removeAllRanges()
      const newRange = document.createRange()
      newRange.selectNodeContents(span)
      sel.addRange(newRange)
    } catch {
      // Selección compleja: se ignora silenciosamente.
    }
    sync()
  }

  return (
    <div className="overflow-hidden rounded-xl border border-input bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 px-2 py-1">
        <ToolbarButton onClick={() => exec("bold")} label="Negrita">
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} label="Cursiva">
          <Italic className="size-4" />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <ToolbarButton onClick={() => changeSize("0.85em")} label="Reducir tamaño del texto seleccionado">
          <AArrowDown className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => changeSize("1.3em")} label="Aumentar tamaño del texto seleccionado">
          <AArrowUp className="size-4" />
        </ToolbarButton>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        onInput={sync}
        className="max-w-none px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none [&_p]:my-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        style={{ minHeight }}
      />

      <input ref={inputRef} type="hidden" name={name} defaultValue={defaultValue} />
    </div>
  )
}
