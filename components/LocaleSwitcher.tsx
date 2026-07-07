"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/src/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className="relative">
      <p className="sr-only">Change language</p>
      <select
        defaultValue={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="appearance-none bg-transparent py-1 px-2 pr-6 text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] cursor-pointer"
      >
        <option value="en">EN</option>
        <option value="ta">TA</option>
        <option value="ml">ML</option>
      </select>
      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-xs opacity-50">
        ▼
      </span>
    </label>
  );
}
