import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardUserProps } from './type';

const CardUser = ({ avatar, name, username }: CardUserProps) => {
  return (
    <Card>
      <div className="flex items-center justify-between pl-4 pr-4">
        <div className='flex items-center gap-4'>
          <div className="bg-black rounded-full flex items-center justify-center">
            <Image src={avatar} alt="Github" width={32} height={32} className="w-16 h-16 rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">{name}</span>
            <span className="text-sm text-muted-foreground">{username}</span>
          </div>
        </div>
        <div>
          <Button asChild>
            <Link href={`/user/${username.replace('@', '')}`}>Ver Detalhes</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CardUser