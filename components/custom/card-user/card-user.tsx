'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { type CardUserProps } from "./type"

const CardUser = ({ user }: CardUserProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-zinc-200 group relative">
      <CardContent className="p-0">
        <div className="flex items-center p-4 gap-4">
          <div className="relative size-12 rounded-full overflow-hidden border border-zinc-100 shrink-0 group-hover:scale-105 transition-transform">
            <Image 
              src={user.avatar_url} 
              alt={user.name || user.login} 
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-zinc-900 truncate tracking-tight">{user.name || user.login}</h3>
            <p className="text-sm text-zinc-500 truncate font-medium">@{user.login}</p>
          </div>
          
          <Link 
            href={`/user/${user.login}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-sm font-semibold rounded-lg border border-zinc-200 transition-colors z-10 whitespace-nowrap"
          >
            <span>Ver detalhes</span>
            <ChevronRight className="size-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50/50 border-t border-zinc-100 group-hover:bg-zinc-50 transition-colors">
          <span className="text-xs font-medium text-zinc-400">Repositórios: <span className="text-zinc-600">{user.public_repos}</span></span>
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="size-3" />
            GitHub
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardUser