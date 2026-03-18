import { Box, Typography, Skeleton } from "@mui/material";

type MetricItemProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color: "primary" | "error" | "warning";
  loading?: boolean;
  subtitle?: string;
  valueVariant?: "h4" | "h5" | "h6";
  rightContent?: React.ReactNode;
};

export function MetricItem({
  label,
  value,
  icon,
  color,
  loading,
  subtitle,
  valueVariant = "h5",
  rightContent,
}: MetricItemProps) {
  return (
    <Box
      sx={{
        borderLeft: "4px solid",
        borderColor: `${color}.main`,
        pl: 1,
      }}
    >
      <Typography
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
      >
        {icon}
        {label}
      </Typography>

      {loading ? (
        <Skeleton
          width={150}
          height={valueVariant === "h4" ? 40 : 30}
          animation="wave"
        />
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant={valueVariant} color={`${color}.main`}>
              {value}
            </Typography>
            {rightContent}
          </Box>

          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}
