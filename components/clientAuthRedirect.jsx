'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
    } else {
      router.push('/');
    }
  }, []);

  return null; // no UI
}
