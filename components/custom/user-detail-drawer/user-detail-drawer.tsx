'use client'

import React, { useEffect, useState } from 'react'
import { Drawer } from 'vaul'
import { useRouter } from 'next/navigation'
import {
  Users,
  BookOpen,
  MapPin,
  AtSign,
  Calendar,
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react'
import Image from 'next/image'
import { type UserDetailDrawerProps } from './type'

import { JoinDateUtil } from '@/utils/join-date/join-date.util'

const UserDetailDrawer = ({ user }: UserDetailDrawerProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setTimeout(() => router.back(), 300)
    }
  }

  const joinDate = JoinDateUtil(user.created_at)

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-white flex flex-col h-full w-[400px] mt-24 fixed bottom-0 right-0 z-50 outline-none">
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-zinc-300 mb-8 md:hidden" />

            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="relative size-24 rounded-full overflow-hidden border-2 border-zinc-100 shadow-sm">
                <Image
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <Drawer.Title className="text-2xl font-bold text-zinc-900 leading-tight">
                  {user.name || user.login}
                </Drawer.Title>
                <Drawer.Description className="text-zinc-500 font-medium">
                  @{user.login}
                </Drawer.Description>
              </div>
            </div>

            {user.bio && (
              <p className="text-zinc-600 text-sm leading-relaxed mb-8 text-center italic">
                "{user.bio}"
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex flex-col items-center">
                <Users className="size-4 text-zinc-400 mb-1" />
                <span className="text-xl font-bold text-zinc-900">{user.followers}</span>
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Seguidores</span>
              </div>
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex flex-col items-center">
                <BookOpen className="size-4 text-zinc-400 mb-1" />
                <span className="text-xl font-bold text-zinc-900">{user.public_repos}</span>
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Repositórios</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {user.location && (
                <li className="flex items-center text-zinc-600 text-sm">
                  <MapPin className="size-4 text-zinc-400 mr-3" />
                  {user.location}
                </li>
              )}
              {user.twitter_username && (
                <li className="flex items-center text-zinc-600 text-sm">
                  <AtSign className="size-4 text-zinc-400 mr-3" />
                  @{user.twitter_username}
                </li>
              )}
              {user.blog && (
                <li className="flex items-center text-zinc-600 text-sm">
                  <Globe className="size-4 text-zinc-400 mr-3" />
                  <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" className="hover:text-blue-600 transition-colors truncate">
                    {user.blog}
                  </a>
                </li>
              )}
              <li className="flex items-center text-zinc-600 text-sm">
                <Calendar className="size-4 text-zinc-400 mr-3" />
                Entrou em {joinDate}
              </li>
            </ul>

            <a
              href={user.html_url}
              target="_blank"
              className="flex items-center justify-between w-full p-4 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all group"
            >
              <div className="flex items-center">
                <ExternalLink className="size-4 mr-2" />
                Ver no GitHub
              </div>
              <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default UserDetailDrawer
