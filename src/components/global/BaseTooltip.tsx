import { Tooltip } from "@mui/material";

export default function BaseTooltip(props: {
  content: string;
  children: React.ReactElement;
  placement?:
    | "bottom"
    | "top"
    | "left"
    | "right"
    | "bottom-start"
    | "bottom-end"
    | "top-start"
    | "top-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
  arrow?: boolean;
  fontsize?: string;
}) {
  return (
    <Tooltip
      title={props.content}
      placement={props.placement || "bottom"}
      arrow={props.arrow}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: "primary.dark",
            color: "#fff",
            fontSize: props.fontsize,
          },
        },
        arrow: {
          sx: {
            color: "primary.dark",
          },
        },
      }}
    >
      {props.children}
    </Tooltip>
  );
}
