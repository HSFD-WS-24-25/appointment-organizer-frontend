"use client";
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillCreate = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Beschreibung hinzufügen...",
        modules: {
          toolbar: [
            [{ font: [] }], // Schriftarten-Dropdown
            [{ size: ["small", false, "large", "huge"] }], // Schriftgrößen
            [{ color: [] }, { background: [] }], // Schrift- und Hintergrundfarbe
            ["bold", "italic", "underline", "strike"], // Textformatierung
            [{ list: "ordered" }, { list: "bullet" }], // Listen
            ["link"], // Links
            ["clean"], // Formatierungen löschen
          ],
        },
      });

      quillRef.current = quill;

      const clipboard = quill.getModule("clipboard");
      clipboard.addMatcher("img", (node, delta) => {
        const { ops } = delta;
        ops[0].insert.image = {
          src: node.getAttribute("src"),
          style: "max-width: 100%; height: 100%; max-height: 300px;", // Standardgröße
        };
        return delta;
      });

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange(html);
      });
    }

    if (value && quillRef.current) {
      const currentHTML = quillRef.current.root.innerHTML;
      if (currentHTML !== value) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }
    }
  }, [value, onChange]);

  return (
    <div>
      <div ref={editorRef} className="quill-editor" style={{ height: "300px" }} />
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
        /* Hintergrundfarbe des Editors */
        .quill-editor {
          background-color: #fff;
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

export default QuillCreate;
