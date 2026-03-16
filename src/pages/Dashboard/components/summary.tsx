import { Typography, Grid, Chip } from "@mui/material";
import BaseCard from "../../../components/global/BaseCard";
import { CurrencyExchange, MoneyOff, PriceCheck } from "@mui/icons-material";
import type { iDashboard } from "../../../interfaces/AnalyticsInterface";

export default function Summary(props: { data: iDashboard | null }) {
  return (
    <>
      <BaseCard cardTitle="Dados analíticos">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <BaseCard cardTitle="Resumo mensal">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
                  <BaseCard contentStyle={{padding: 1}}>
                    <Typography
                      color="text.secondary"
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
                      Saldo atual
                    </Typography>

                    <Typography
                      variant="h5"
                      color={
                        props.data?.month.balance
                          ? props.data?.month.balance < 0
                            ? "error"
                            : "primary"
                          : "warning"
                      }
                    >
                      R$ {props.data?.month.balance?.toFixed(2) ?? "0.00"}
                    </Typography>
                  </BaseCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
                  <BaseCard contentStyle={{padding: 1}}>
                    <Typography
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PriceCheck fontSize="large" color="primary" />
                      Receitas
                    </Typography>

                    <Typography variant="h5" color="primary.main">
                      R$ {props.data?.month.income.toFixed(2) ?? "0.00"}
                    </Typography>
                  </BaseCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
                  <BaseCard contentStyle={{padding: 1}}>
                    <Typography
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <MoneyOff fontSize="large" color="error" />
                      Despesas
                    </Typography>

                    <Typography variant="h5" color="error.main">
                      R$ {props.data?.month.expense.toFixed(2) ?? "0.00"}
                    </Typography>
                  </BaseCard>
                </Grid>
              </Grid>
            </BaseCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <BaseCard cardTitle="Resumo anual">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
                  <BaseCard contentStyle={{padding: 1}}>
                    <Typography
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
                      variant="h5"
                      color={
                        props.data?.year.balance
                          ? props.data?.year.balance < 0
                            ? "error"
                            : "primary"
                          : "warning"
                      }
                    >
                      R$ {props.data?.year.balance.toFixed(2) ?? "0.00"}
                    </Typography>
                  </BaseCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
                  <BaseCard contentStyle={{padding: 1}}>
                    <Typography
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PriceCheck fontSize="large" color="primary" />
                      Receitas
                    </Typography>

                    <Typography variant="h5" color="primary.main">
                      R$ {props.data?.year.income.toFixed(2) ?? "0.00"}
                    </Typography>
                  </BaseCard>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
                  <BaseCard contentStyle={{padding: 1}}>
                    <Typography
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <MoneyOff fontSize="large" color="error" />
                      Despesas
                    </Typography>

                    <Typography variant="h5" color="error.main">
                      R$ {props.data?.year.expense.toFixed(2) ?? "0.00"}
                    </Typography>
                  </BaseCard>
                </Grid>
              </Grid>
            </BaseCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <BaseCard cardTitle="Parcelas">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <BaseCard>
                    <Typography color="text.secondary">
                      Parcelas deste mês
                    </Typography>

                    <Typography variant="h5" color="warning.main">
                      R${" "}
                      {props.data?.installments?.monthly_installments.toFixed(
                        2,
                      ) ?? "0.00"}
                    </Typography>
                  </BaseCard>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <BaseCard>
                    <Typography color="text.secondary">
                      Parcelas futuras
                    </Typography>

                    <Typography variant="h5" color="warning.main">
                      R${" "}
                      {props.data?.installments?.future_installments.toFixed(
                        2,
                      ) ?? "0.00"}
                    </Typography>
                  </BaseCard>
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                  <BaseCard>
                    <Typography color="text.secondary">
                      Maior parcela ativa atualmente
                    </Typography>

                    <Typography variant="h5">
                      R$
                      {` ${
                        props.data?.installments?.biggest_installment.toFixed(
                          2,
                        ) ?? "0.00"
                      } (${props.data?.installments?.remaining_installments} restantes)`}
                    </Typography>
                  </BaseCard>
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
            <Grid container spacing={2}>
              {props.data?.top_categories?.map((item) => {
                return (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <BaseCard contentStyle={{flexDirection: 'row', alignItems: 'center', gap: 1}}>
                      <Chip
                        label={item.category.toUpperCase()}
                        color="secondary"
                        sx={{color: 'secondary.contrastText'}}
                      />
                      <Typography>
                        R$ {item.total.toFixed(2) ?? "0.00"}
                      </Typography>
                    </BaseCard>
                  </Grid>
                );
              })}
            </Grid>
          </BaseCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseCard
            cardTitle="Dias de despesa"
            contentStyle={{ maxHeight: "50dvh"}}
          >
            <Grid container spacing={2}>
              {props.data?.daily_expenses?.map((item) => {
                return (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <BaseCard contentStyle={{flexDirection: 'row', alignItems: 'center', gap: 1}}>
                      <Chip label={`Dia ${item.day}`} color="secondary" />
                      <Typography>
                        R$ {item.total.toFixed(2) ?? "0.00"}
                      </Typography>
                    </BaseCard>
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
