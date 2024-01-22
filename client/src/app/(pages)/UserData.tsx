import { cookies } from 'next/headers'
import React from 'react'

const UserData = () => {

    const cookie = cookies().get("mylittleday-sessionToken")

    console.log(cookie)
  return (
    <div></div>
  )
}

export default UserData