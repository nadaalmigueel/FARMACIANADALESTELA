"use client"

import { useRef, useState, type ReactNode } from "react"
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
  const [value, setValue] = useState(defaultValue)

  function sync() {
    setValue(editorRef.current?.innerHTML ?? "")
  }

  function exec(command: "bold" | "italic") {
    document.execCommand(command, false)
    editorRef.current?.focus()
    sync()
  }

  function changeSize(size: string) {
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
    editorRef.current?.focus()
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
        // El HTML inicial se fija una sola vez en el montaje; React no vuelve a
        // tocar el contenido editable porque no recibe children.
        dangerouslySetInnerHTML={{ __html: defaultValue }}
        className="max-w-none px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none [&_p]:my-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        style={{ minHeight }}
      />

      <input type="hidden" name={name} value={value} />
    </div>
  )
}
