'use client'

import React, { useState } from 'react'
import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { type SearchedInputProps } from './type'
import { addUserAction } from "@/actions/github-actions"

const SearchedInput = ({ initialUsername = '' }: SearchedInputProps) => {
  const [username, setUsername] = useState(initialUsername)

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const formData = new FormData()
    formData.append('username', username)
    await addUserAction(formData)
    setUsername('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <InputGroup>
        <InputGroupInput 
          name="username"
          placeholder="Digite o nome de usuario do github" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <InputGroupAddon className="cursor-pointer" onClick={() => handleSubmit()}>
          <Search className="size-4" />
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

export default SearchedInput