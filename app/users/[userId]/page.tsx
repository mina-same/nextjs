import React from "react";
import getUser from "@/lib/getUser";
import getUserPost from "@/lib/getUserPost";
import UserPosts from "./components/UserPosts";
import Link from "next/link";
import type { Metadata } from "next";

import { Suspense } from "react";
import GetAllUsers from "@/lib/getAllUsers";

import { notFound } from "next/navigation";

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({ params: { userId },}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;
  
  if ( !user?.name ) {
    return {
      title: "User Not Found"
    }
  }

  return {
    title: user.name,
    description: `this is the page of ${user.name}`,
  };
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPost(userId);

  // const [user, userPosts] = await Promise.all([userData,userPostsData])
  const user = await userData;

  if( !user?.name ) return notFound()

  return (
    <>
      <Link href="/users">Back to Users</Link>
      <h1>User {user.id}</h1>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>loading. ..</h2>}>
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const usersData: Promise<User[]> = GetAllUsers();
  const users = await usersData;

  return users.map((user) => ({ userId: user.id.toString() }));
}
