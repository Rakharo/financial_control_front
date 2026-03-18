/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Typography,
  Grid,
  Chip,
  Menu,
  ListItem,
  Divider,
  ListSubheader,
  darken,
  Box,
} from "@mui/material";
import BaseCard from "../../../components/global/BaseCard";
import {
  CreditCard,
  CurrencyExchange,
  MoneyOff,
  PriceCheck,
} from "@mui/icons-material";
import type { iDashboard } from "../../../interfaces/AnalyticsInterface";
import { formatCurrency } from "../../../utils/formatter";
import { useState } from "react";

export default function Summary(props: {
  data: iDashboard | null;
  month: string;
  year: number;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const monthName = capitalize(props.month);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  return (
    <>
      <BaseCard cardTitle="Dashboard">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <BaseCard cardTitle={`${monthName} de ${props.year}`}>
              <Grid container spacing={4}>
                <Grid
                  size={{ xs: 12, xl: 12 }}
                  sx={{
                    borderLeft: "4px solid",
                    borderColor: props.data?.month.balance
                      ? props.data?.month.balance < 0
                        ? "error.main"
                        : "primary.main"
                      : "warning.main",
                    pl: 1,
                  }}
                >
                  <Typography
                    color="text.secondary"
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <CurrencyExchange
                      fontSize="large"
                      color={
                        props.data?.month.balance
                          ? props.data?.month.balance < 0
                            ? "error"
                            : "primary"
                          : "warning"
                      }
                    />
                    Saldo do mês
                  </Typography>

                  <Typography
                    variant="h4"
                    color={
                      props.data?.month.balance
                        ? props.data?.month.balance < 0
                          ? "error"
                          : "primary"
                        : "warning"
                    }
                  >
                    {formatCurrency(props.data?.month.balance ?? 0)}
                  </Typography>
                </Grid>
                <Grid
                  size={{ xs: 12, xl: 6 }}
                  sx={{
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    pl: 1,
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <PriceCheck fontSize="large" color="primary" />
                    Receitas
                  </Typography>

                  <Typography variant="h5" color="primary.main">
                    {formatCurrency(props.data?.month.income ?? 0)}
                  </Typography>
                </Grid>
                <Grid
                  size={{ xs: 12, xl: 6 }}
                  sx={{
                    borderLeft: "4px solid",
                    borderColor: "error.main",
                    pl: 1,
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <MoneyOff fontSize="large" color="error" />
                    Despesas
                  </Typography>

                  <Typography variant="h5" color="error.main">
                    {formatCurrency(props.data?.month.expense ?? 0)}
                  </Typography>
                </Grid>
              </Grid>
            </BaseCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <BaseCard cardTitle={`Resumo de ${props.year}`}>
              <Grid container spacing={4}>
                <Grid
                  size={{ xs: 12, xl: 12 }}
                  sx={{
                    borderLeft: "4px solid",
                    borderColor: props.data?.month.balance
                      ? props.data?.month.balance < 0
                        ? "error.main"
                        : "primary.main"
                      : "warning.main",
                    pl: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <CurrencyExchange
                      fontSize="large"
                      color={
                        props.data?.year.balance
                          ? props.data?.year.balance < 0
                            ? "error"
                            : "primary"
                          : "warning"
                      }
                    />
                    Saldo anual
                  </Typography>

                  <Typography
                    variant="h4"
                    color={
                      props.data?.year.balance
                        ? props.data?.year.balance < 0
                          ? "error"
                          : "primary"
                        : "warning"
                    }
                  >
                    {formatCurrency(props.data?.year.balance ?? 0)}
                  </Typography>
                </Grid>
                <Grid
                  size={{ xs: 12, xl: 6 }}
                  sx={{
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    pl: 1,
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <PriceCheck fontSize="large" color="primary" />
                    Receitas
                  </Typography>

                  <Typography variant="h5" color="primary.main">
                    {formatCurrency(props.data?.year.income ?? 0)}
                  </Typography>
                </Grid>
                <Grid
                  size={{ xs: 12, xl: 6 }}
                  sx={{
                    borderLeft: "4px solid",
                    borderColor: "error.main",
                    pl: 1,
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <MoneyOff fontSize="large" color="error" />
                    Despesas
                  </Typography>

                  <Typography variant="h5" color="error.main">
                    {formatCurrency(props.data?.year.expense ?? 0)}
                  </Typography>
                </Grid>
              </Grid>
            </BaseCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <BaseCard cardTitle="Cartão de crédito">
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, xl: 12 }}>
                  <Box
                    sx={{
                      borderLeft: "4px solid",
                      borderColor: "warning.main",
                      pl: 1,
                    }}
                  >
                    <Typography color="text.secondary" variant="h5">
                      Maior parcela ativa
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="h4">
                        {formatCurrency(
                          props.data?.installments?.biggest_installment ?? 0,
                        )}
                      </Typography>

                      <Typography variant="h6">{`(${props.data?.installments?.remaining_installments} restantes)`}</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, xl: 6 }}>
                  <Box
                    sx={{
                      borderLeft: "4px solid",
                      borderColor: "warning.main",
                      pl: 1,
                    }}
                  >
                    <Typography
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <CreditCard fontSize="large" color="warning" />
                      Parcelas deste mês
                    </Typography>

                    <Typography variant="h5" color="warning.main">
                      {formatCurrency(
                        props.data?.installments?.monthly_installments ?? 0,
                      )}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, xl: 6 }}>
                  <Box
                    sx={{
                      borderLeft: "4px solid",
                      borderColor: "warning.main",
                      pl: 1,
                    }}
                  >
                    <Typography
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <CreditCard fontSize="large" color="warning" />
                      Parcelas futuras
                    </Typography>

                    <Typography variant="h5" color="warning.main">
                      {formatCurrency(
                        props.data?.installments?.future_installments ?? 0,
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </BaseCard>
          </Grid>
        </Grid>
      </BaseCard>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseCard
            cardTitle="Despesas mais usadas"
            contentStyle={{ maxHeight: "50dvh" }}
          >
            <Grid container spacing={6}>
              {props.data?.top_categories?.map((item) => {
                return (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        borderLeft: "4px solid",
                        borderColor: item.color,
                        pl: 1,
                      }}
                    >
                      <Chip
                        label={item.category.toUpperCase()}
                        sx={{
                          color: "secondary.contrastText",
                          backgroundColor: item.color,
                          "&:hover": {
                            backgroundColor: darken(item.color, 0.4),
                          },
                        }}
                        onClick={(e) => handleOpenMenu(e, item)}
                      />
                      <Typography variant="h5">
                        {formatCurrency(item.total ?? 0)}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </BaseCard>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <ListSubheader sx={{ backgroundColor: "transparent" }}>
              <Typography>{`Despesas de ${selectedCategory?.category.toUpperCase()}`}</Typography>
              <Divider />
            </ListSubheader>
            {selectedCategory?.transactions?.map((transaction: any) => {
              return (
                <ListItem
                  key={transaction.id}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Typography variant="body2">{transaction.title}</Typography>
                  <Typography variant="body1">
                    {formatCurrency(transaction.value)}
                  </Typography>
                </ListItem>
              );
            })}
          </Menu>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseCard
            cardTitle="Dias de despesa"
            contentStyle={{ maxHeight: "50dvh" }}
          >
            <Grid container spacing={6}>
              {props.data?.daily_expenses?.map((item) => {
                return (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        borderLeft: "4px solid",
                        borderColor: "secondary.main",
                        pl: 1,
                      }}
                    >
                      <Chip label={`Dia ${item.day}`} color="secondary" />
                      <Typography variant="h5">
                        {formatCurrency(item.total ?? 0)}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </BaseCard>
        </Grid>
      </Grid>
    </>
  );
}
