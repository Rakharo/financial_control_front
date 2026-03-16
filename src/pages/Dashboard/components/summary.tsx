import { Typography, Grid, Card, CardContent, Chip } from "@mui/material";
import BaseCard from "../../../components/global/BaseCard";
import { CurrencyExchange, MoneyOff, PriceCheck } from "@mui/icons-material";
import type { iDashboard } from "../../../interfaces/AnalyticsInterface";

export default function Summary(props: { data: iDashboard | null }) {
  return (
    <>
      <BaseCard cardTitle="Meu resumo">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <CurrencyExchange
                    fontSize="large"
                    color={
                      props.data?.balance
                        ? props.data?.balance < 0
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
                    props.data?.balance
                      ? props.data?.balance < 0
                        ? "error"
                        : "primary"
                      : "warning"
                  }
                >
                  R$ {props.data?.balance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <PriceCheck fontSize="large" color="primary" />
                  Receitas
                </Typography>

                <Typography variant="h5" color="primary.main">
                  R$ {props.data?.income.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <MoneyOff fontSize="large" color="error" />
                  Despesas
                </Typography>

                <Typography variant="h5" color="error.main">
                  R$ {props.data?.expenses.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </BaseCard>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseCard cardTitle="Despesas mais usadas" contentStyle={{maxHeight: "50dvh"}}>
            <Grid container spacing={2}>
              {props.data?.top_categories.map((item) => {
                return (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent sx={{display: "flex", gap: 1, alignItems: "center"}}>
                        <Chip label={item.category.toUpperCase()} color="secondary" />
                        {/* <Typography>{item.category.toUpperCase()}</Typography> */}
                        <Typography>R$ {item.total.toFixed(2)}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </BaseCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BaseCard cardTitle="Dias de despesa" contentStyle={{maxHeight: "50dvh"}}>
            <Grid container spacing={2}>
              {props.data?.daily_expenses.map((item) => {
                return (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                      <CardContent sx={{display: "flex", gap: 1, alignItems: "center"}}>
                        <Chip label={`Dia ${item.day}`} color="secondary" />
                        {/* <Typography>Dia {item.day}</Typography> */}
                        <Typography>R$ {item.total.toFixed(2)}</Typography>
                      </CardContent>
                    </Card>
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
