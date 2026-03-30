import React from 'react'
import CardUser from '@/components/custom/card-user/card-user'
import { CardUserGithubProps } from '@/components/custom/card-user/type'

const CardUserList = ({ users }: { users: CardUserGithubProps[] }) => {
  return (
    <div className='flex flex-col gap-2'>
      {users?.map((user) => (
        <CardUser key={user.login} user={user} />
      ))}
    </div>
  )
}

export default CardUserList