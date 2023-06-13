'use client';

import { ClientContextProvider } from '@/context/clients';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

const ProvidersWrapper = ({
  children,
  session,
  attribute,
  defaultTheme,
  enableSystem,
}: {
  children: React.ReactNode;
  session?: any;
  attribute?: ThemeProviderProps['attribute'];
  defaultTheme?: ThemeProviderProps['defaultTheme'];
  enableSystem?: ThemeProviderProps['enableSystem'];
}) => {
  return (
    <SessionProvider session={session}>
      <NextThemesProvider
        attribute={attribute}
        defaultTheme={defaultTheme}
        enableSystem={enableSystem}>
        <ClientContextProvider>{children}</ClientContextProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
};

export default ProvidersWrapper;
