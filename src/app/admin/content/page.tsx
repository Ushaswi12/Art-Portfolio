import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ContentManagementClient } from './ContentManagementClient';

export default async function ContentPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return <ContentManagementClient />;
}