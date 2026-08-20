import { useEffect, useMemo, useRef, useState } from 'react'

function stripDiacritics(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

// Small dependency-free combobox: text input + a scrollable filtered list,
// used for both Judet and Localitate (searchable instead of a giant native
// <select>, per the client's explicit request).
export default function SearchableSelect({ value, onChange, options, placeholder, disabled, required, emptyMessage = 'Niciun rezultat' }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const boxRef = useRef(null)

  const selected = options.find((o) => o.value === value) || null

  const filtered = useMemo(() => {
    const q = stripDiacritics(query.trim())
    if (!q) return options
    return options.filter((o) => stripDiacritics(o.label).includes(q))
  }, [query, options])

  useEffect(() => {
    const onClickAway = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onClickAway)
    return () => document.removeEventListener('mousedown', onClickAway)
  }, [])

  function selectOption(opt) {
    onChange(opt.value)
    setQuery('')
    setOpen(false)
  }

  function handleKeyDown(e) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') { setOpen(true); setHighlight(0) }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlight]) selectOption(filtered[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={boxRef} style={{ position: 'relative' }}>
      <input
        type="text"
        value={open ? query : (selected?.label || '')}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlight(0) }}
        onFocus={() => { setQuery(''); setOpen(true); setHighlight(0) }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete="off"
        className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A] disabled:bg-black/5 disabled:text-black/30"
      />
      {open && !disabled && (
        <div className="absolute z-20 left-0 right-0 mt-1 max-h-56 overflow-y-auto rounded-lg border border-black/10 bg-white shadow-lg">
          {filtered.length === 0 && (
            <div className="px-3 py-2.5 text-[13px] text-black/40">{emptyMessage}</div>
          )}
          {filtered.map((opt, i) => (
            <button
              key={opt.value}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectOption(opt)}
              className={'w-full text-left px-3 py-2 text-[13px] transition-colors ' + (i === highlight ? 'bg-[#17181A]/5' : 'hover:bg-black/[0.03]')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
