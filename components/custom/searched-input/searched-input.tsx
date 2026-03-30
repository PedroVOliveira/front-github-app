'use client'

import React, { useActionState, useState, useEffect } from 'react'
import { Search, AlertCircle } from "lucide-react"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { type SearchedInputProps } from './type'
import { addUserAction } from "@/actions/github-actions"

const SearchedInput = ({ initialUsername = '' }: SearchedInputProps) => {
  const [username, setUsername] = useState(initialUsername)
  const [state, action, isPending] = useActionState(addUserAction, null)

  useEffect(() => {
    if (state?.success) {
      setUsername('')
    }
  }, [state])

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <form action={action} className="w-full">
        <InputGroup className={isPending ? "opacity-50 pointer-events-none" : ""}>
          <InputGroupInput 
            name="username"
            placeholder="Digite o nome de usuario do github" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="h-full bg-zinc-100 px-4 hover:bg-zinc-200 transition-colors border-l border-zinc-200">
            <Search className="size-4 text-zinc-500" />
          </button>
        </InputGroup>
      </form>

      {state?.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default SearchedInput