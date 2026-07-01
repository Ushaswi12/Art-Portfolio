import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/admin';
  
  // Allow login page without auth
  if (pathname === '/admin/login') {
    if (session) redirect('/admin/dashboard');
    return <>{children}</>;
  }

  // Protect all other admin routes
  if (!session) redirect('/admin/login');

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}