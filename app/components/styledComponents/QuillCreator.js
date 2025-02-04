import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { debounce } from "lodash";

const QuillCreator = ({ value, onChange }) => {
  const quillRef = useRef(null); // Referenz für den Editor
  const quillInstance = useRef(null); // Instanz von Quill

  useEffect(() => {
    if (!quillInstance.current) {
      // Initialisiere Quill
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }], // Schriftarten-Dropdown
            [{ size: ["small", false, "large", "huge"] }], // Schriftgrößen
            [{ color: [] }, { background: [] }], // Schriftfarbe und Hintergrundfarbe
            ["bold", "italic", "underline", "strike"], // Textformatierung
            [{ list: "ordered" }, { list: "bullet" }], // Listen
            ["link"], // Links
            ["clean"], // Formatierungen löschen
          ],
        },
      });

      // Überarbeite eingefügte Inhalte (z.B. Bilder)
      const clipboard = quillInstance.current.getModule("clipboard");
      clipboard.addMatcher("img", (node, delta) => {
        const { ops } = delta;
        ops[0].insert.image = {
          src: node.getAttribute("src"),
          style: "max-width: 100%; height: 100%; max-height: 300px;", // Standardgröße
        };
        return delta;
      });

      // Debounce das `onChange`-Event
      const handleTextChange = debounce(() => {
        const html = quillInstance.current.root.innerHTML; // HTML-Inhalt holen
        if (html !== value) {
          onChange(html); // Nur aktualisieren, wenn der Wert sich geändert hat
        }
      }, 300); // 300ms Debounce-Zeit

      quillInstance.current.on("text-change", handleTextChange);
    }
  }, [value, onChange]);

  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div>
      <div ref={quillRef} className="quill-editor" style={{ height: "300px" }} />
      <style jsx>{`
        /* Entferne Rahmen des Containers */
        .quill-editor .ql-container {
          border: none !important;
          outline: none !important;
        }
        /* Entferne Rahmen der Toolbar */
        .quill-editor .ql-toolbar {
          border: none !important;
        }
        /* Entferne zusätzliche Styling-Beschränkungen */
        .quill-editor .ql-container.ql-snow {
          border: none !important;
        }
        /* Schriftarten-Styles */
        .ql-font-arial {
          font-family: Arial, sans-serif;
        }
        .ql-font-times-new-roman {
          font-family: "Times New Roman", serif;
        }
        .ql-font-courier {
          font-family: "Courier New", monospace;
        }
        .ql-font-comic-sans {
          font-family: "Comic Sans MS", cursive, sans-serif;
        }
        .ql-font-verdana {
          font-family: Verdana, sans-serif;
        }
        .ql-font-sans-serif {
          font-family: sans-serif;
        }
      `}</style>
    </div>
  );
};

export default QuillCreator;
