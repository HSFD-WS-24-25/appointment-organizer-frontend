"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from '@/i18n/routing';

const ProtectedLayout = ({ children }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname(); // Aktuelle Route abrufen
  const publicRoutes = ["/", "/api/auth/login"]; // Liste der öffentlichen Seiten
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!isLoading && !user && !publicRoutes.includes(pathname)) {
      setShowMessage(true); // Zeige die Meldung
      const timeout = setTimeout(() => {
        setShowMessage(false); // Verberge die Meldung nach 3 Sekunden
        router.push("/"); // Weiterleitung zur Startseite
      }, 3000);

      return () => clearTimeout(timeout); // Timeout aufräumen
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>🔄 Lade Authentifizierung...</p>;
  }

  if (showMessage) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8d7da", // Leichte rote Hintergrundfarbe
          color: "#721c24", // Dunkelrote Schriftfarbe
          fontSize: "1.5rem",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        ⚠️ Sie sind nicht eingeloggt, um auf diese Seite zu gelangen!
      </div>
    );
  }

  // Für öffentliche Seiten die Kinder direkt rendern
  if (publicRoutes.includes(pathname)) {
    return children;
  }

  // Für geschützte Seiten prüfen, ob der Benutzer eingeloggt ist
  if (!user) {
    return null; // Keine Inhalte anzeigen
  }

  return children; // Geschützte Inhalte rendern
};

export default ProtectedLayout;
