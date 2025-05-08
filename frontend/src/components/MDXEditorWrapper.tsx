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

export default function MDXEditorWrapper({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (value: string) => void;
}) {
  const contentMemo = useMemo(() => initialContent, [initialContent]);
  return (
    <div className="prose max-w-full border rounded-lg">
      <MDXEditor
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
