import "./[locale]/globals.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DarkModeProvider } from "@/app/[locale]/components/styledComponents/DarkMode";
import { UserProviderr } from "@/app/[locale]/context/UserContext";
import ProtectedLayout from "@/app/[locale]/components/ProtectedLayout";
import { NextIntlClientProvider } from 'next-intl';

export const metadata = {
  title: "Veranstaltungsplaner",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider>
          <UserProvider>
            <ProtectedLayout>
              <DarkModeProvider>
                <UserProviderr>{children}</UserProviderr>
              </DarkModeProvider>
            </ProtectedLayout>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
