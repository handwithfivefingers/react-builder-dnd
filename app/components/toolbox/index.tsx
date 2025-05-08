// components/Toolbox.js
import { Element, useEditor } from "@craftjs/core";
import { Button, Text } from "@mantine/core";
import { DButton } from "../button";
import { DContainer } from "../container";
import { DImage } from "../image";
import { DRow } from "../row";
import { DText } from "../text";
import { DBackgroundImage } from "../backgroundImage";

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="p-2 flex gap-2 flex-col">
      <div className="flex-shrink-0">
        <Text className="font-bold">Drag to add</Text>
      </div>
      <div className="p-4 border border-dashed border-neutral-500 rounded flex gap-2 flex-wrap w-full">
        <Button
          variant="filled"
          ref={(ref: HTMLButtonElement) => connectors.create(ref, <Element is={DButton}>Hello button</Element>)}
        >
          Button
        </Button>
        <Button
          variant="filled"
          ref={(ref: HTMLButtonElement) => connectors.create(ref, <Element is={DText} text="Hello Text" />)}
        >
          Text
        </Button>
        <Button
          variant="filled"
          ref={(ref: HTMLButtonElement) =>
            connectors.create(
              ref,
              <Element is={DContainer} bg="#fff" p={16} canvas size="md">
                <Element is={DText} text="Hello Container" />
              </Element>
            )
          }
        >
          Container
        </Button>
        <Button
          variant="filled"
          ref={(ref: HTMLButtonElement) =>
            connectors.create(ref, <Element gutter={4} p={8} is={DRow} column={"2"} canvas />)
          }
        >
          Row
        </Button>
        <Button variant="filled" ref={(ref: HTMLButtonElement) => connectors.create(ref, <Element is={DImage} />)}>
          Image
        </Button>
        <Button
          variant="filled"
          ref={(ref: HTMLButtonElement) =>
            connectors.create(
              ref,
              <Element is={DBackgroundImage} canvas w={300} maw={300}>
                <Element is={DText} text="Hello Container" />
              </Element>
            )
          }
        >
          Background Image
        </Button>
      </div>
    </div>
  );
};
