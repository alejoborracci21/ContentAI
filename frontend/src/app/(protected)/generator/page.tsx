"use client"

import { useState } from "react"
import ManualForm from "./ManualForm"
import IAForm from "./IAForm"

export default function Page() {
  const [manual, setManual] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Nuevo Artículo</h1>
      {manual ? (
      <ManualForm onSwitchToAI={() => setManual(false)} />
      ) : (
      <IAForm onSwitchToAI={() => setManual(true)}/>
      )}
    </div>
  )
}
