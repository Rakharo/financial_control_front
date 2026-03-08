import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useSummary } from "../../hooks/useTransactions";

export default function Dashboard() {
  const { data, isLoading } = useSummary()

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4}}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Saldo atual
              </Typography>

              <Typography variant="h5">
                R$ {data?.balance.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4}}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Receitas
              </Typography>

              <Typography variant="h5" color="success.main">
                R$ {data?.total_income.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4}}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Despesas
              </Typography>

              <Typography variant="h5" color="error.main">
                R$ {data?.total_expense.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}