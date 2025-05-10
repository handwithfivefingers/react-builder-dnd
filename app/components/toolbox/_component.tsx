import { Tooltip } from "@mantine/core";
import { forwardRef } from "react";

const CardButton = forwardRef<HTMLDivElement, { icon?: React.ReactNode; children: React.ReactNode }>(
  ({ icon, children }, ref) => {
    return (
      <div ref={ref}>
        <Tooltip
          label={
            <div
              style={{
                fontSize: `clamp(0.4rem, 0.8rem, 8vw)`,
              }}
            >
              {children}
            </div>
          }
          position="top"
          withArrow
        >
          <div className="w-12 flex flex-col justify-center items-center relative aspect-square shadow-lg transition-all hover:shadow border hover:border-indigo-400 rounded-md  cursor-pointer hover:bg-slate-100/80 bg-slate-50">
            {icon}
          </div>
        </Tooltip>
      </div>
    );
  }
);
CardButton.displayName = "CardButton";

export { CardButton };
