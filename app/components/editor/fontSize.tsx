// import { TextStyle } from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

// export const TextStyleExtended = TextStyle.extend({
//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       fontSize: {
//         default: null,
//         parseHTML: (element) => element.style.fontSize.replace("px", ""),
//         renderHTML: (attributes) => {
//           if (!attributes["fontSize"]) {
//             return {};
//           }
//           return {
//             style: `font-size: ${attributes["fontSize"]}`,
//           };
//         },
//       },
//     };
//   },

//   addCommands() {
//     return {
//       ...this.parent?.(),
//       setFontSize:
//         (fontSize) =>
//         ({ commands }) => {
//           return commands.setMark(this.name, { fontSize: fontSize });
//         },
//       unsetFontSize:
//         () =>
//         ({ chain }) => {
//           return chain().setMark(this.name, { fontSize: null }).removeEmptyTextStyle().run();
//         },
//     };
//   },
// });
export type FontSizeOptions = {
  /**
   * The types where the color can be applied
   * @default ['textStyle']
   * @example ['heading', 'paragraph']
   */
  types: string[];
};
export const FontSize = Extension.create<FontSizeOptions>({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes["fontSize"]) {
                return {};
              }
              return {
                style: `font-size: ${attributes["fontSize"]}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColor:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetColor:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
        },
    };
  },
});
