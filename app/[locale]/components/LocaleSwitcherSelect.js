"use client"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { useTransition } from "react"
import { usePathname, useRouter } from "@/i18n/routing"
import { Box, Paper, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import {useTranslations} from 'next-intl';

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('Settings');

  function onSelectChange(event) {
    const nextLocale = event.target.value
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="locale-label">{t('select_language_name')}</InputLabel>
      <Select
        labelId="locale-label"
        id="locale"
        defaultValue={defaultValue}
        disabled={isPending}
        label="Sprache"
        onChange={onSelectChange}
      >
        <MenuItem value="de">{t('select_language_option_german')}</MenuItem>
        <MenuItem value="en">{t('select_language_option_english')}</MenuItem>
      </Select>
    </FormControl>
  )
}