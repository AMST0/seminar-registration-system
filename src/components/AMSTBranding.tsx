/**
 * AMST Branding Initializer
 * Made by AMST → https://ataberkdudu.info
 */

'use client';

import { useEffect } from 'react';
import { logAMSTBranding } from '@/lib/utils';

export default function AMSTBranding() {
  useEffect(() => {
    logAMSTBranding();
  }, []);

  return null;
}
