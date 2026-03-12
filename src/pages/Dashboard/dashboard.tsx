/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Stack, Typography } from "@mui/material";
import Summary from "./components/summary";
import { LastTransactions } from "./components/lastTransactions";
import UserCategories from "./components/userCategories";
import {
  useCategoryList,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../hooks/useCategory";
import {
  useCreateTransaction,
  useDeleteTransaction,
  useSummary,
  useTransactionsList,
  useUpdateTransaction,
} from "../../hooks/useTransactions";
import { useState } from "react";
import TransactionDialog from "./components/forms/transactionDialog";
import CategoryDialog from "./components/forms/categoryDialog";
import type { iTransaction } from "../../interfaces/TransactionInterface";
import type { iCategory } from "../../interfaces/CategoryInterface";
import dayjs, { Dayjs } from "dayjs";
import BaseDatePicker from "../../components/global/BaseDatePicker";
import ConfirmationDialog from "../../components/alert/ConfirmationDialog";

export default function Dashboard() {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<iTransaction | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<iCategory | null>(null);
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionLimit, setTransactionLimit] = useState(10);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [categoriesLimit, setCategoriesLimit] = useState(10);

  const [filterDate, setFilterDate] = useState<Dayjs | null>(dayjs());

  const { data: summaryData, isLoading: summaryLoading } = useSummary({
    month: filterDate ? filterDate.month() + 1 : undefined,
    year: filterDate ? filterDate.year() : undefined,
  });
  const { data: transactionData, isLoading: transactionLoading } =
    useTransactionsList({
      page: transactionPage,
      limit: transactionLimit,
      month: filterDate ? filterDate.month() + 1 : undefined,
      year: filterDate ? filterDate.year() : undefined,
    });
  const { data: categoryData, isLoading: categoryLoading } = useCategoryList({
    page: categoriesPage,
    limit: categoriesLimit,
  });

  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const deleteTransaction = useDeleteTransaction();
  const createCategory = useCreateCategory();
  const updatedCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory()

  function handleSubmitTransaction(data: any) {
    if (!editingTransaction) {
      createTransaction.mutate({ data: data });
    } else {
      updateTransaction.mutate({
        id: editingTransaction.id,
        data: data,
      });
    }
    setOpenTransaction(false);
  }

  const handleCreateCategory = (data: any) => {
    if (!editingCategory) {
      createCategory.mutate(data);
    } else {
      updatedCategory.mutate({
        id: editingCategory.id,
        data: data,
      });
    }
    setOpenCategory(false);
  };

  function handleDeleteTransaction(transaction: iTransaction) {
    deleteTransaction.mutate({ data: transaction });
  }

  function handleDeleteCategory(category: iCategory) {
    deleteCategory.mutate({ data: category });
  }

  if (summaryLoading && transactionLoading && categoryLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography variant="h5">Dashboard</Typography>

        <BaseDatePicker
          label="Período"
          value={filterDate}
          onChange={setFilterDate}
          format="MM/YYYY"
          views={["month", "year"]}
          size="small"
        />
      </Stack>
      <Summary data={summaryData!} />
      <Grid container spacing={2} sx={{ maxHeight: "100dvh" }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <LastTransactions
            data={transactionData?.transactions || []}
            openDialog={() => setOpenTransaction(true)}
            editData={(data: iTransaction) => {
              setEditingTransaction(data);
              setOpenTransaction(true);
            }}
            deleteData={(data: iTransaction) => {
              setEditingTransaction(data);
              setOpenDeleteDialog(true);
            }}
            page={transactionPage || 1}
            limit={transactionLimit || 10}
            onLimitChange={(value) => setTransactionLimit(value)}
            onPageChange={(value) => setTransactionPage(value)}
            totalPages={transactionData?.total || 0}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <UserCategories
            data={categoryData?.categories || []}
            page={categoriesPage || 1}
            limit={categoriesLimit || 10}
            totalPages={categoryData?.total || 0}
            onLimitChange={(value) => setCategoriesLimit(value)}
            onPageChange={(value) => setCategoriesPage(value)}
            openDialog={() => setOpenCategory(true)}
            editData={(data: iCategory) => {
              setEditingCategory(data);
              setOpenCategory(true);
            }}
            deleteData={(data: iCategory) => {
              setEditingCategory(data)
              setOpenDeleteDialog(true)
            }}
          />
        </Grid>
      </Grid>

      <TransactionDialog
        open={openTransaction}
        onClose={() => {
          setOpenTransaction(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleSubmitTransaction}
        categoriesList={categoryData?.categories || []}
        initialData={
          editingTransaction
            ? {
                ...editingTransaction,
                category_id: editingTransaction.category.id,
              }
            : null
        }
        isEdit={editingTransaction !== null}
      />

      <CategoryDialog
        open={openCategory}
        onClose={() => {
          setOpenCategory(false);
          setEditingCategory(null);
        }}
        onSubmit={handleCreateCategory}
        initialData={
          editingCategory
            ? {
                ...editingCategory,
              }
            : null
        }
        isEdit={editingCategory !== null}
      />

      <ConfirmationDialog
        open={openDeleteDialog}
        variant="delete"
        title={editingTransaction ? "Deletar transação" : "Deletar categoria"}
        highlight={editingTransaction ? editingTransaction?.title : editingCategory?.name}
        onCancel={() => {
          setOpenDeleteDialog(false);
          if(editingTransaction) {
            setEditingTransaction(null);
          } else {
            setEditingCategory(null);
          }
        }}
        onConfirm={() => {
          if (editingTransaction) {
            handleDeleteTransaction(editingTransaction!);
            setEditingTransaction(null);
          } else {
            handleDeleteCategory(editingCategory!);
            setEditingCategory(null);
          }
          setOpenDeleteDialog(false);
        }}
      />
    </Stack>
  );
}
