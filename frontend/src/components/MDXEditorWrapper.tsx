"use client";

import React, { useMemo, useRef, useImperativeHandle, forwardRef } from "react";
import {
  MDXEditor,
  type MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  codeBlockPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  codeMirrorPlugin,
  linkDialogPlugin,
  tablePlugin,
  InsertTable,
  InsertCodeBlock,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "../app/custom.css";
import { useTheme } from "next-themes";

// 🔹 Exportamos el tipo del ref para usar en otros componentes
export type MDXEditorWrapperRef = {
  resetContent: () => void;
};

type Props = {
  initialContent: string;
  onChange: (value: string) => void;
};

// 🔹 Usamos forwardRef para exponer funciones externas (como resetContent)
const MDXEditorWrapper = forwardRef<MDXEditorWrapperRef, Props>(
  ({ initialContent, onChange }, ref) => {
    const { theme } = useTheme();

    const editorRef = useRef<MDXEditorMethods>(null);

    const contentMemo = useMemo(() => initialContent, [initialContent]);

    // 🔹 Exponemos el método resetContent al padre
    useImperativeHandle(ref, () => ({
      resetContent: () => {
        editorRef.current?.setMarkdown("");
      },
    }));

    return (
      <div className="prose max-w-full border rounded-lg z-50">
        <MDXEditor
          ref={editorRef}
          className={theme === "dark" ? "dark-editor" : "light-editor"}
          markdown={contentMemo}
          onChange={onChange}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            linkPlugin(),
            codeBlockPlugin({
              defaultCodeBlockLanguage: "js",
            }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: "JavaScript",
                ts: "TypeScript",
                html: "HTML",
              },
            }),
            markdownShortcutPlugin(),
            listsPlugin(),
            linkDialogPlugin(),
            tablePlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <BlockTypeSelect />
                  <CreateLink />
                  <InsertTable />
                  <InsertCodeBlock />
                </>
              ),
            }),
          ]}
        />
      </div>
    );
  }
);

MDXEditorWrapper.displayName = "MDXEditorWrapper";
export default MDXEditorWrapper;
