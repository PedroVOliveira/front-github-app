'use client'

import React from 'react'
import CardUser from '@/components/custom/card-user/card-user'
import { CardUserGithubProps } from '@/components/custom/card-user/type'
import { removeUserAction } from '@/actions/github-actions'
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
  if (!users || users.length === 0) return null

  return (
    <div className='flex flex-col gap-6 w-full'>
      <div className='flex flex-col gap-3 min-h-[400px]'>
        {users.map((user) => (
          <CardUser
            key={user.login}
            user={user}
            onDelete={() => removeUserAction(user.login)}
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