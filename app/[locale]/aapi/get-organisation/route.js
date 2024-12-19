import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Pfad zur JSON-Datei im public/data-Ordner
const filePath = path.join(process.cwd(), "public", "data", "users.json");

// JSON-Daten lesen
const loadUsersData = () => {
  if (!fs.existsSync(filePath)) {
    console.error("JSON-Datei nicht gefunden:", filePath);
    return { organisation: [] }; // Rückgabe leerer Struktur bei fehlender Datei
  }
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log("Geladene Daten:", data); // Debugging
    return data;
  } catch (error) {
    console.error("Fehler beim Lesen der JSON-Datei:", error);
    return { organisation: [] }; // Rückgabe leerer Struktur bei Fehler
  }
};

// JSON-Daten speichern
const saveUsersData = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Daten erfolgreich gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern der JSON-Datei:", error);
  }
};

// GET: Alle Benutzer abrufen
export async function GET() {
  try {
    const usersData = loadUsersData();
    const allUsers = [];

    usersData.organisation.forEach((org) => {
      org.users.forEach((user) => {
        allUsers.push({
          ...user,
          organisation: org.name,
          instanz: usersData.instanz,
        });
      });
    });

    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Fehler beim Abrufen der Benutzer:", error);
    return NextResponse.json(
      { message: "Fehler beim Abrufen der Benutzer" },
      { status: 500 }
    );
  }
}

// POST: Benutzer hinzufügen
export async function POST(req) {
  try {
    const { username, email, name, role, organisation, password } = await req.json();

    // Validierung: Alle Felder müssen ausgefüllt sein
    if (!username || !email || !name || !organisation || !password) {
      return NextResponse.json(
        { message: "Alle Felder sind erforderlich" },
        { status: 400 }
      );
    }

    const usersData = loadUsersData();

    const newUser = {
      id: Date.now(),
      username,
      password, // Direkt das eingegebene Passwort speichern
      email,
      name,
      role,
    };

    // Organisation finden oder hinzufügen
    const orgIndex = usersData.organisation.findIndex((org) => org.name === organisation);

    if (orgIndex >= 0) {
      usersData.organisation[orgIndex].users.push(newUser);
    } else {
      usersData.organisation.push({ name: organisation, users: [newUser] });
    }

    // Daten speichern
    saveUsersData(usersData);

    // Erfolgreiche Antwort zurückgeben
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Benutzers:", error);
    return NextResponse.json(
      { message: "Fehler beim Hinzufügen des Benutzers" },
      { status: 500 }
    );
  }
}
// PUT: Benutzerinformationen aktualisieren
export async function PUT(req) {
  try {
    const { id, username, email, name, role, organisation } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Benutzer-ID ist erforderlich" },
        { status: 400 }
      );
    }

    const usersData = loadUsersData();
    let userUpdated = false;

    usersData.organisation.forEach((org) => {
      org.users.forEach((user) => {
        if (user.id === id) {
          user.username = username || user.username;
          user.email = email || user.email;
          user.name = name || user.name;
          user.role = role || user.role;
          user.organisation = organisation || org.name;
          userUpdated = true;
        }
      });
    });

    if (userUpdated) {
      saveUsersData(usersData);
      return NextResponse.json({ message: "Benutzer aktualisiert" });
    } else {
      return NextResponse.json(
        { message: "Benutzer nicht gefunden" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Benutzers:", error);
    return NextResponse.json(
      { message: "Fehler beim Aktualisieren des Benutzers" },
      { status: 500 }
    );
  }
}

// PATCH: Passwort zurücksetzen
export async function PATCH(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Benutzer-ID ist erforderlich" },
        { status: 400 }
      );
    }

    const usersData = loadUsersData();
    let userUpdated = false;

    usersData.organisation.forEach((org) => {
      org.users.forEach((user) => {
        if (user.id === id) {
          user.password = "1234"; // Standardpasswort
          userUpdated = true;
        }
      });
    });

    if (userUpdated) {
      saveUsersData(usersData);
      return NextResponse.json({ message: "Passwort zurückgesetzt" });
    } else {
      return NextResponse.json(
        { message: "Benutzer nicht gefunden" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Fehler beim Zurücksetzen des Passworts:", error);
    return NextResponse.json(
      { message: "Fehler beim Zurücksetzen des Passworts" },
      { status: 500 }
    );
  }
}

// DELETE: Mehrere Benutzer löschen
export async function DELETE(req) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "Es müssen gültige Benutzer-IDs angegeben werden" },
        { status: 400 }
      );
    }

    const usersData = loadUsersData();
    let usersDeleted = false;

    usersData.organisation.forEach((org) => {
      const initialLength = org.users.length;
      org.users = org.users.filter((user) => !ids.includes(user.id));
      if (org.users.length < initialLength) {
        usersDeleted = true;
      }
    });

    if (usersDeleted) {
      saveUsersData(usersData);
      return NextResponse.json({ message: "Benutzer gelöscht" });
    } else {
      return NextResponse.json(
        { message: "Keine Benutzer gefunden" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Fehler beim Löschen der Benutzer:", error);
    return NextResponse.json(
      { message: "Fehler beim Löschen der Benutzer" },
      { status: 500 }
    );
  }
}
