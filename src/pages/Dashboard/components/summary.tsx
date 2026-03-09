import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import type { iSummary } from "../../../interfaces/TransactionInterface";

export default function Summary(props: {
    data: iSummary | null;
}) {
  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Saldo atual</Typography>

              <Typography variant="h5">
                R$ {props.data?.balance.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Receitas</Typography>

              <Typography variant="h5" color="success.main">
                R$ {props.data?.total_income.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Despesas</Typography>

              <Typography variant="h5" color="error.main">
                R$ {props.data?.total_expense.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
