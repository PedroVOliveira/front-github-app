'use client'

import React, { useState } from 'react'
import CardUser from '@/components/custom/card-user/card-user'
import { CardUserGithubProps } from '@/components/custom/card-user/type'
import { removeUserAction, removeManyUsersAction } from '@/actions/github-actions'
import UserSelectionBar from '@/components/custom/user-selection-bar/user-selection-bar'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface CardUserListProps {
  users: CardUserGithubProps[]
  currentPage: number
  totalPages: number
}

const CardUserList = ({ users, currentPage, totalPages }: CardUserListProps) => {
  const [selectedLogins, setSelectedLogins] = useState<Set<string>>(new Set())

  const toggleSelect = (login: string) => {
    const newSelected = new Set(selectedLogins)
    if (newSelected.has(login)) {
      newSelected.delete(login)
    } else {
      newSelected.add(login)
    }
    setSelectedLogins(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedLogins.size === users.length) {
      setSelectedLogins(new Set())
    } else {
      setSelectedLogins(new Set(users.map(u => u.login)))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedLogins.size === 0) return
    if (confirm(`Tem certeza que deseja excluir ${selectedLogins.size} usuários?`)) {
      await removeManyUsersAction(Array.from(selectedLogins))
      setSelectedLogins(new Set())
    }
  }

  if (!users || users.length === 0) return null

  return (
    <div className='flex flex-col gap-6 w-full'>
      <UserSelectionBar 
        selectedCount={selectedLogins.size}
        totalCount={users.length}
        isAllSelected={selectedLogins.size === users.length && users.length > 0}
        onSelectAll={toggleSelectAll}
        onDelete={handleBulkDelete}
        onClear={() => setSelectedLogins(new Set())}
      />

      <div className='flex flex-col gap-4 min-h-[400px]'>
        {users.map((user) => (
          <CardUser
            key={user.login}
            user={user}
            onDelete={() => removeUserAction(user.login)}
            isSelected={selectedLogins.has(user.login)}
            onSelect={() => toggleSelect(user.login)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 0 ? `/?page=${currentPage - 1}` : '#'}
                className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
                text="Anterior"
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`/?page=${page}`}
                  isActive={currentPage === page}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={currentPage < totalPages - 1 ? `/?page=${currentPage + 1}` : '#'}
                className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : ""}
                text="Próximo"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default CardUserList