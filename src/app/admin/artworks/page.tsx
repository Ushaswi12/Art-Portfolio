import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ArtworksManagementClient } from './ArtworksManagementClient';

export default async function ArtworksPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return <ArtworksManagementClient />;
}