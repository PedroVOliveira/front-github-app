'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ChevronRight, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { type CardUserProps } from "./type"

const CardUser = ({ user, onDelete }: CardUserProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-zinc-200 group relative bg-white">
      <CardContent className="p-0">
        <div className="flex items-center py-8 px-6 gap-6">
          <div className="relative size-16 rounded-full overflow-hidden border-2 border-zinc-100 shrink-0 group-hover:scale-105 transition-transform shadow-sm">
            <Image 
              src={user.avatar_url} 
              alt={user.name || user.login} 
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl text-zinc-900 truncate tracking-tight">{user.name || user.login}</h3>
            <p className="text-sm text-zinc-500 truncate font-medium">@{user.login}</p>
          </div>
          
          <Link 
            href={`/user/${user.login}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold rounded-xl transition-all z-10 whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Ver detalhes</span>
            <ChevronRight className="size-4 text-zinc-400" />
          </Link>
        </div>
        
        <div className="flex items-center justify-between px-6 py-3.5 bg-zinc-50/80 border-t border-zinc-100 group-hover:bg-zinc-50 transition-colors">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Repositórios: <span className="text-zinc-900 font-bold ml-1">{user.public_repos}</span>
          </span>
          
          <div className="flex items-center gap-6">
            <a 
              href={user.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="size-3.5" />
              GitHub
            </a>

            <button 
              onClick={(e) => {
                e.stopPropagation()
                onDelete?.(user.login)
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-red-600 transition-colors z-10"
              aria-label="Deletar"
            >
              <Trash2 className="size-3.5" />
              Excluir
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardUser