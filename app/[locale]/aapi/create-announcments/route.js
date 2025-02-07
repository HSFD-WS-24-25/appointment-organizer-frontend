import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data", "announcements.json");

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const announcements = JSON.parse(data);
    return new Response(JSON.stringify(announcements), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fehler beim Lesen der Datei:", error);
    return new Response(JSON.stringify({ error: "Fehler beim Lesen der Datei." }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title || !body.type || !body.startDate || !body.endDate) {
      return new Response(JSON.stringify({ error: "Alle Felder sind erforderlich." }), { status: 400 });
    }

    const data = fs.readFileSync(filePath, "utf8");
    const announcements = JSON.parse(data);

    const newAnnouncement = {
      id: announcements.length > 0 ? announcements[announcements.length - 1].id + 1 : 1,
      ...body,
      status: "Active",
    };

    announcements.push(newAnnouncement);
    fs.writeFileSync(filePath, JSON.stringify(announcements, null, 2), "utf8");

    return new Response(JSON.stringify({ message: "Ankündigung hinzugefügt.", newAnnouncement }), { status: 201 });
  } catch (error) {
    console.error("Fehler beim Hinzufügen der Ankündigung:", error);
    return new Response(JSON.stringify({ error: "Fehler beim Hinzufügen der Ankündigung." }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id || !body.status) {
      return new Response(JSON.stringify({ error: "ID und Status sind erforderlich." }), { status: 400 });
    }

    const data = fs.readFileSync(filePath, "utf8");
    const announcements = JSON.parse(data);

    const index = announcements.findIndex((a) => a.id === parseInt(id));
    if (index === -1) {
      return new Response(JSON.stringify({ error: "Ankündigung nicht gefunden." }), { status: 404 });
    }

    announcements[index].status = body.status;
    fs.writeFileSync(filePath, JSON.stringify(announcements, null, 2), "utf8");

    return new Response(
      JSON.stringify({ message: "Status aktualisiert.", updatedAnnouncement: announcements[index] }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Status:", error);
    return new Response(JSON.stringify({ error: "Fehler beim Aktualisieren des Status." }), { status: 500 });
  }
}