'use client'

import React from 'react'
import CardUser from '@/components/custom/card-user/card-user'
import { CardUserGithubProps } from '@/components/custom/card-user/type'
import { removeUserAction } from '@/actions/github-actions'
import UserSelectionBar from '@/components/custom/user-selection-bar/user-selection-bar'
import useCardUser from './use-card-user'
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

const CardUserList = ({
  users,
  currentPage,
  totalPages
}: CardUserListProps) => {
  const {
    selectedLogins,
    toggleSelect,
    toggleSelectAll,
    handleBulkDelete,
    clearSelection,
    isAllSelected
  } = useCardUser({
    usersLogins: users.map(u => u.login)
  })

  if (!users || users.length === 0) return null

  return (
    <div className='flex flex-col gap-6 w-full'>
      <UserSelectionBar
        isVisible={selectedLogins.length > 0}
        selectedCount={selectedLogins.length}
        isAllSelected={isAllSelected}
        onSelectAll={toggleSelectAll}
        onDelete={handleBulkDelete}
        onClear={clearSelection}
      />

      <div className='flex flex-col gap-4 min-h-[400px]'>
        {users.map((user) => (
          <CardUser
            key={user.login}
            user={user}
            onDelete={() => removeUserAction(user.login)}
            isSelected={selectedLogins.includes(user.login)}
            onSelect={() => toggleSelect(user.login)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 0 ? `?page=${currentPage - 1}` : '#'}
                aria-disabled={currentPage === 0}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?page=${index}`}
                  isActive={currentPage === index}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={currentPage < totalPages - 1 ? `?page=${currentPage + 1}` : '#'}
                aria-disabled={currentPage === totalPages - 1}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default CardUserList