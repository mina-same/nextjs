import Link from 'next/link'
import type{ Metadata } from 'next'

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1> 
      <Link href="/about">link to about page</Link>
      <p>
        <Link href="/users">Users</Link>
      </p>
    </main>
  )
}
