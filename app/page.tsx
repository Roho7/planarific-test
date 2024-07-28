'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Toaster } from 'react-hot-toast';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  router.push('/models');
  return <></>;
};

export default Page;
