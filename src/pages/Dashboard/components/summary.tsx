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
  Skeleton,
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
import { MetricItem } from "../utils/MetricItem";

export default function Summary(props: {
  data: iDashboard | null;
  loading: boolean;
  month: string;
  year: number;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const monthBalance = props.data?.month.balance ?? 0;
  const yearBalance = props.data?.year.balance ?? 0;

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

  //helper
  const getBalanceColor = (value: number) => {
    if (value < 0) return "error";
    if (value > 0) return "primary";
    return "warning";
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <BaseCard cardTitle={`${monthName} de ${props.year}`}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, xl: 12 }}>
                <MetricItem
                  label="Saldo do mês"
                  value={formatCurrency(monthBalance)}
                  icon={
                    <CurrencyExchange
                      fontSize="large"
                      color={getBalanceColor(monthBalance)}
                    />
                  }
                  color={getBalanceColor(monthBalance)}
                  loading={props.loading}
                  valueVariant="h4"
                />
              </Grid>
              <Grid size={{ xs: 12, xl: 6 }}>
                <MetricItem
                  label="Receitas"
                  value={formatCurrency(props.data?.month.income ?? 0)}
                  icon={<PriceCheck fontSize="large" color="primary" />}
                  color="primary"
                  loading={props.loading}
                />
              </Grid>
              <Grid size={{ xs: 12, xl: 6 }}>
                <MetricItem
                  label="Despesas"
                  value={formatCurrency(props.data?.month.expense ?? 0)}
                  icon={<MoneyOff fontSize="large" color="error" />}
                  color="error"
                  loading={props.loading}
                />
              </Grid>
            </Grid>
          </BaseCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <BaseCard cardTitle={`Resumo de ${props.year}`}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, xl: 12 }}>
                <MetricItem
                  label="Saldo do ano"
                  value={formatCurrency(yearBalance)}
                  icon={
                    <CurrencyExchange
                      fontSize="large"
                      color={getBalanceColor(yearBalance)}
                    />
                  }
                  color={getBalanceColor(yearBalance)}
                  loading={props.loading}
                  valueVariant="h4"
                />
              </Grid>
              <Grid size={{ xs: 12, xl: 6 }}>
                <MetricItem
                  label="Receitas"
                  value={formatCurrency(props.data?.year.income ?? 0)}
                  icon={<PriceCheck fontSize="large" color="primary" />}
                  color="primary"
                  loading={props.loading}
                />
              </Grid>
              <Grid size={{ xs: 12, xl: 6 }}>
                <MetricItem
                  label="Despesas"
                  value={formatCurrency(props.data?.year.expense ?? 0)}
                  icon={<PriceCheck fontSize="large" color="error" />}
                  color="error"
                  loading={props.loading}
                />
              </Grid>
            </Grid>
          </BaseCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <BaseCard cardTitle="Cartão de crédito">
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, xl: 12 }}>
                <MetricItem
                  label="Maior parcela ativa"
                  value={formatCurrency(
                    props.data?.installments?.biggest_installment ?? 0,
                  )}
                  color="warning"
                  loading={props.loading}
                  valueVariant="h4"
                  rightContent={
                    <Typography variant="h6" color="text.secondary">
                      ({props.data?.installments?.remaining_installments}{" "}
                      restantes)
                    </Typography>
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, xl: 6 }}>
                <MetricItem
                  label="Parcelas deste mês"
                  value={formatCurrency(props.data?.installments?.monthly_installments ?? 0)}
                  icon={<CreditCard fontSize="large" color="warning" />}
                  color="warning"
                  loading={props.loading}
                />
              </Grid>

              <Grid size={{ xs: 12, xl: 6 }}>
                <MetricItem
                  label="Parcelas futuras"
                  value={formatCurrency(props.data?.installments?.future_installments ?? 0)}
                  icon={<CreditCard fontSize="large" color="warning" />}
                  color="warning"
                  loading={props.loading}
                />
              </Grid>
            </Grid>
          </BaseCard>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseCard
            cardTitle="Despesas mais usadas"
            contentStyle={{ maxHeight: "50dvh" }}
          >
            <Grid container spacing={3}>
              {props.loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      height={40}
                      width={150}
                      animation="wave"
                    />
                  ))
                : props.data?.top_categories?.map((item, index) => {
                    return (
                      <Grid size={{ xs: 12, md: 6 }} key={index}>
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
                          <Typography variant="body1">
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
            {selectedCategory?.transactions
              ?.sort((a: any, b: any) => b.value - a.value)
              ?.map((transaction: any) => {
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
            <Grid container spacing={3}>
              {props.loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      height={40}
                      width={150}
                      animation="wave"
                    />
                  ))
                : props.data?.daily_expenses?.map((item, index) => {
                    return (
                      <Grid size={{ xs: 12, md: 6 }} key={index}>
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
                          <Typography variant="body1">
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
