/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Stack,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Pagination,
} from "@mui/material";
import { FirstPage, LastPage } from "@mui/icons-material";

type SortDirection = "asc" | "desc";

export type BaseTableColumn<T> = {
  title: string;
  key?: keyof T;
  render?: (item: T) => React.ReactNode;
  visible?: boolean;
  sortable?: boolean;
  sortKey?: keyof T;
  align?: "left" | "center" | "right";
};

export type BaseTablePagination = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
};

export type BaseTableProps<T> = {
  data: T[];
  columns: BaseTableColumn<T>[];
  pagination?: BaseTablePagination;
};

export default function BaseTable<T>({
  data,
  columns,
  pagination,
}: BaseTableProps<T>) {
  const visibleColumns = columns.filter((col) => col.visible !== false);

  // --- Estado de ordenação ---
  const [orderBy, setOrderBy] = React.useState<keyof T | null>(null);
  const [order, setOrder] = React.useState<SortDirection>("asc");

  const sortedData = React.useMemo(() => {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue == null || bValue == null) return 0;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, orderBy, order]);

  const handleSort = (key: keyof T) => {
    if (orderBy === key) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(key);
      setOrder("asc");
    }
  };

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 0;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((col) => {
                const sortKey = col.sortKey ?? col.key;
                const isSortable = col.sortable && sortKey;

                return (
                  <TableCell
                    key={col.title}
                    align={col.align ?? "left"}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: 600,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {isSortable ? (
                      <TableSortLabel
                        active={orderBy === sortKey}
                        direction={orderBy === sortKey ? order : "asc"}
                        onClick={() => handleSort(sortKey)}
                      >
                        {col.title}
                      </TableSortLabel>
                    ) : (
                      col.title
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} align="center">
                  Sem informações para exibir.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((item, idx) => (
                <TableRow key={idx}>
                  {visibleColumns.map((col, colIdx) => (
                    <TableCell key={colIdx} align={col.align ?? "left"}>
                      {col.render
                        ? col.render(item)
                        : col.key
                          ? (item as any)[col.key]
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- Paginação Melhorada --- */}
      {pagination && totalPages > 1 && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 2, padding: "0 16px" }}
        >
          {/* Seleção de itens por página */}
          {pagination.onLimitChange && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2">Itens por página:</Typography>
              <Select
                size="small"
                value={pagination.limit}
                onChange={(e) => {
                  pagination.onLimitChange &&
                    pagination.onLimitChange(Number(e.target.value));
                  pagination.onPageChange(1); // resetar página ao mudar limite
                }}
              >
                {[5, 10, 20, 50].map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          )}

          {/* Navegação de páginas */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton
              size="small"
              onClick={() => pagination.onPageChange(1)}
              disabled={pagination.page === 1}
            >
              <FirstPage />
            </IconButton>

            <Pagination
              page={pagination.page}
              count={totalPages}
              onChange={(_, value) => pagination.onPageChange(value)}
              size="small"
              color="primary"
              siblingCount={1}
              boundaryCount={1}
            />

            <IconButton
              size="small"
              onClick={() => pagination.onPageChange(totalPages)}
              disabled={pagination.page === totalPages}
            >
              <LastPage />
            </IconButton>
          </Stack>

          {/* Informações de página */}
          <Typography variant="body2">
            Página {pagination.page} de {totalPages} ({pagination.total} itens)
          </Typography>
        </Stack>
      )}
    </>
  );
}
