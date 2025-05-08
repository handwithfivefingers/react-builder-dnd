import { Button, Select } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { Highlight } from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { FontFamily } from "@tiptap/extension-font-family";
// import { TextStyle } from "@tiptap/extension-text-style";
import { TextStyleExtended } from "./fontSize";

interface IDEditorProps {
  content: string;
  onSave?: (content: string) => void;
  onCancel?: () => void;
}
function DEditor({ content, onSave, onCancel }: IDEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyleExtended.configure({ mergeNestedSpanStyles: true }),
      FontFamily.configure({ types: ["textStyle"] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  return (
    <div className="flex flex-col gap-2 border p-2 border-dashed border-indigo-500 my-1">
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <Select
              size="xs"
              data={[
                {
                  label: "default",
                  value: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
                },
                { label: "Inter", value: "Inter" },
                { label: "Times New Roman", value: "Times New Roman" },
                { label: "Verdana", value: "Verdana" },
              ]}
              defaultValue="default"
              value={editor?.getAttributes("textStyle").fontFamily || "default"}
              onChange={(value: string | null) =>
                editor
                  ?.chain()
                  .focus()
                  .setFontFamily(value || "")
                  .run()
              }
            />

            <Select
              size="xs"
              data={["12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px"]}
              defaultValue="default"
              value={editor?.getAttributes("textStyle").fontSize || "16px"}
              onChange={(value: string | null) => editor?.chain().setMark("textStyle", { fontSize: value }).run()}
            />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <div className="flex gap-2 justify-end">
        <Button variant="filled" onClick={() => onSave?.(editor?.getHTML() as string)} size="xs">
          Save
        </Button>
        <Button variant="outline" color="red.8" onClick={onCancel || undefined} size="xs">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export { DEditor };
