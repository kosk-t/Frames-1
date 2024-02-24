"use server"
import type { Metadata } from 'next';
import { AppConfig } from '../config';
import App from './page_client';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { Giveaway } from '../types';
const prisma = new PrismaClient()

export async function handleSubmit(data: Giveaway, formData: FormData) {
  const guid = uuidv4();
  // console.log(title)
  const result = prisma.giveaway.create({
    data:{
      guid: guid,
      title: data.title,
      link:data.link,
      linklabel:data.linkLabel,
      closed:false
    }  
  });
  const resultGuid = (await result).guid
  redirect("/?guid=" + resultGuid);
}

export default async function Page() {
  // console.log("test")
  return (
    <>
      <App />
    </>
  );
}

// export const dynamic = 'force-dynamic';