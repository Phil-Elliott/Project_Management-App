import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    arrow
    placement="bottom"
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#1c4e80",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1c4e80",
    color: "white",
    fontSize: "1rem",
  },
}));
