"use client"

import { useState } from "react"
import ManualForm from "./ManualForm"
import IAForm from "./IAForm"

export default function Page() {
  const [useAI, setUseAI] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Nuevo Artículo</h1>
      {useAI ? (
        <IAForm onSwitchToAI={() => setUseAI(false)}/>
      ) : (
        <ManualForm onSwitchToAI={() => setUseAI(true)} />
      )}
    </div>
  )
}
