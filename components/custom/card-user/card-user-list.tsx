import React from 'react'
import CardUser from '@/components/custom/card-user/card-user'
import { CardUserProps } from '@/components/custom/card-user/type'

const CardUserList = ({ users }: { users: CardUserProps[] }) => {
  return (
    <div className='flex flex-col gap-2'>
      {users?.map((user) => (
        <CardUser key={user.username} {...user} />
      ))}
    </div>
  )
}

export default CardUserList