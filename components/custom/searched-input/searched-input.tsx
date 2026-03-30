'use client'

import React, { useActionState, useState, useEffect, startTransition } from 'react'
import { Search, AlertCircle } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
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

  const handleSearch = () => {
    if (!username.trim() || isPending) return
    
    const formData = new FormData()
    formData.append('username', username)
    startTransition(() => {
      action(formData)
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <form action={action} className="w-full">
        <InputGroup className={isPending ? "opacity-50 pointer-events-none" : ""}>
          <InputGroupInput 
            name="username"
            placeholder="Digite o nome de usuario do github" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputGroupAddon 
            className="cursor-pointer" 
            onClick={handleSearch}
          >
            <Search className="size-4" />
          </InputGroupAddon>
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