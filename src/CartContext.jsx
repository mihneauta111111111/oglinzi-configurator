/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'halo_cart'

// Oglinzile sunt facute la comanda - peste atat, clientul suna si discutam
// direct. Limita e impusa si de backend (halo-quote-request.php), aici e
// doar ca utilizatorul sa fie oprit politicos, nu cu o eroare de la server.
export const MAX_CART_MIRRORS = 10

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // localStorage full or unavailable - cart just won't persist
    }
  }, [items])

  const countOf = (list) => list.reduce((n, i) => n + i.qty, 0)

  const addItem = (item) =>
    setItems((prev) => (countOf(prev) >= MAX_CART_MIRRORS
      ? prev
      : [...prev, { ...item, id: Date.now() + Math.floor(Math.random() * 1000), qty: 1 }]))
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const updateQty = (id, qty) =>
    setItems((prev) => {
      const altele = prev.reduce((n, i) => (i.id === id ? n : n + i.qty), 0)
      const limita = Math.max(1, Math.min(qty, MAX_CART_MIRRORS - altele))
      return prev.map((i) => (i.id === id ? { ...i, qty: limita } : i))
    })
  const clear = () => setItems([])

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
