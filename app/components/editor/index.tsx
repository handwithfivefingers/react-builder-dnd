import { Button, ScrollArea, Select } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { Highlight } from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { BubbleMenu, Editor, FloatingMenu, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
// import { TextStyleExtended } from "./fontSize";
import { Color } from "@tiptap/extension-color";
import { FontSize } from "./fontSize";

interface IDEditorProps {
  content: string;
  onSave?: (content: string) => void;
  onCancel?: () => void;
}
const ColorPicker = () => {
  return (
    <RichTextEditor.ColorPicker
      colors={[
        "#25262b",
        "#868e96",
        "#fa5252",
        "#e64980",
        "#be4bdb",
        "#7950f2",
        "#4c6ef5",
        "#228be6",
        "#15aabf",
        "#12b886",
        "#40c057",
        "#82c91e",
        "#fab005",
        "#fd7e14",
      ]}
    />
  );
};
const FONT_FAMILY_OPTIONS = [
  {
    label: "default",
    value: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
  },
  { label: "Inter", value: "Inter" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Verdana", value: "Verdana" },
];
const FontFamilyPicker = ({ editor }: { editor: Editor | null }) => {
  const onChange = (value: string | null) => {
    if (value) {
      editor
        ?.chain()
        .focus()
        .setFontFamily(value || "")
        .run();
      editor?.chain().focus().run();
    }
  };
  return (
    <Select
      size="xs"
      data={FONT_FAMILY_OPTIONS}
      defaultValue="default"
      value={editor?.getAttributes("textStyle").fontFamily || "default"}
      onChange={onChange}
    />
  );
};
const SIZE_OPTIONS = ["12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px", "30px"];
const FontSizePicker = ({ editor }: { editor: Editor | null }) => {
  const onChange = (value: string | null) => {
    if (value) {
      editor?.chain().setMark("textStyle", { fontSize: value }).run();
      editor?.chain().focus().run();
    }
  };
  return (
    <Select
      size="xs"
      data={SIZE_OPTIONS}
      defaultValue="default"
      value={editor?.getAttributes("textStyle").fontSize || "16px"}
      onChange={onChange}
    />
  );
};
const BubbleMenuComponent = ({ editor }: { editor: Editor | null }) => {
  return (
    editor && (
      <BubbleMenu editor={editor} className="bg-white shadow-md rounded-md p-2 flex gap-1 w-full overflow-auto">
        <ScrollArea style={{ maxWidth: "100%" }}>
          <div className="flex gap-1 p-2">
            <RichTextEditor.ControlsGroup>
              <div className="flex gap-0.5">
                <RichTextEditor.Control className="w-24 !border-0 ">
                  <FontFamilyPicker editor={editor} />
                </RichTextEditor.Control>
                <RichTextEditor.Control className="w-20 !border-0 ">
                  <FontSizePicker editor={editor} />
                </RichTextEditor.Control>
              </div>
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <ColorPicker />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>
          </div>
        </ScrollArea>
      </BubbleMenu>
    )
  );
};

const FloatingEditorComponent = ({ editor }: { editor: Editor | null }) => {
  return (
    editor && (
      <FloatingMenu editor={editor}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.BulletList />
        </RichTextEditor.ControlsGroup>
      </FloatingMenu>
    )
  );
};
function DEditor({ content, onSave, onCancel }: IDEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      Color,
      FontSize,
      FontFamily.configure({ types: ["textStyle"] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  return (
    <div className="flex gap-2 outline-1 outline-dashed outline-indigo-500 relative flex-col">
      <RichTextEditor editor={editor}>
        {/* <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.ColorPicker
              colors={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <Select
              size="xs"
              className="m-1"
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
              className="m-1"
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
        </RichTextEditor.Toolbar> */}

        <BubbleMenuComponent editor={editor} />
        <FloatingEditorComponent editor={editor} />

        <RichTextEditor.Content />
      </RichTextEditor>
      <div className="flex gap-2 justify-end absolute top-full right-0 translate-y-2">
        <Button
          variant="outline"
          bg="blue.8"
          color="white"
          onClick={() => onSave?.(editor?.getHTML() as string)}
          size="xs"
        >
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
