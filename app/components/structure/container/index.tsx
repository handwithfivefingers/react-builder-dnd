/* eslint-disable import/no-unresolved */
import { useNode } from "@craftjs/core";
import { Container } from "@mantine/core";
import { IContainer } from "~/constant/container";
import { cn } from "~/libs/utils";
import { StructureSetting } from "../setting";
export const DContainer = ({
  children,
  style,
  display,
  gap,
  alignment,
  direction = "flex-row",
  justify,
}: IContainer) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));

  return (
    <Container
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={cn(`overflow-auto`, display, alignment, justify, direction, gap, {
        ["outline-gray-300 outline-dashed outline-2"]: isHovered || isSelected,
      })}
      // style={{ ...style, gap: gap }}
    >
      {children}
    </Container>
  );
};

DContainer.craft = {
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: StructureSetting,
  },
};

DContainer.fallbackProps = {
  style: {
    padding: 8,
    position: "static",
    width: "100%",
    height: "100%",
  },
};
