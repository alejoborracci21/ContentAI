"use client";

import React, { useMemo } from "react";
import {
  MDXEditor,
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
import "../app/custom.css"
import { useTheme } from "next-themes";


// import { basicDarkTheme } from "cm6-theme-basic-dark";
export default function MDXEditorWrapper({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (value: string) => void;
}) {
const { theme } = useTheme()
console.log(theme)
  // Usar useMemo para memorizar el valor inicial del contenid
  const contentMemo = useMemo(() => initialContent, [initialContent]);
  return (
    <div className="prose max-w-full border rounded-lg z-50">
      <MDXEditor
        className={theme === 'dark' ? 'dark-editor' : 'light-editor'} 
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
            // codeMirrorExtensions: [basicDarkTheme]
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
