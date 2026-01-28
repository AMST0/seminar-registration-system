/**
 * Home Page - Redirect to Admin
 * Made by AMST → https://ataberkdudu.info
 */

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/admin');
}

