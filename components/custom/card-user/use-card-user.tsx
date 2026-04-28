'use client'

import { useState } from 'react'
import { removeManyUsersAction } from '@/actions/github-actions'

interface UseCardUserProps {
  usersLogins: string[]
}

const useCardUser = ({ usersLogins = [] }: UseCardUserProps) => {
  const [selectedLogins, setSelectedLogins] = useState<string[]>([])

  const toggleSelect = (login: string) => {
    setSelectedLogins((prev) =>
      prev.includes(login)
        ? prev.filter((id) => id !== login)
        : [...prev, login]
    )
  }

  const toggleSelectAll = () => {
    if (selectedLogins.length === usersLogins.length && usersLogins.length > 0) {
      setSelectedLogins([])
      return
    }

    setSelectedLogins([...usersLogins])
  }

  const handleBulkDelete = async () => {
    if (selectedLogins.length === 0) return
    
    await removeManyUsersAction(selectedLogins)
    setSelectedLogins([])
  }

  const clearSelection = () => setSelectedLogins([])

  return {
    selectedLogins,
    toggleSelect,
    toggleSelectAll,
    handleBulkDelete,
    clearSelection,
    isAllSelected: selectedLogins.length === usersLogins.length && usersLogins.length > 0
  }
}

export default useCardUser