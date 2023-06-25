import type { Metadata } from 'next'
import GetAllUsers from '@/lib/getAllUsers'
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Users',
}

export default async function UsersPage() {
    const usersData: Promise<User[]> = GetAllUsers()

    const users = await usersData

    //console.log('Hello') // Did you find where this appears?

    const content = (
        <section>
            <h2 className='w-50'>
                <Link href="/">Back to Home</Link>
            </h2>
            <br />
            {users.map(user => {
                return (
                    <>
                        <p key={user.id}>
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                        </p>
                        <br />
                    </>
                )
            })}
        </section>
    )

    return content
}