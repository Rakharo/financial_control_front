/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { Box, CircularProgress, Alert, Stack } from "@mui/material";

type BaseFormProps = {
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  className?: string;
  spacing?: number;
};

const BaseForm = forwardRef<HTMLFormElement, BaseFormProps>((props, ref) => {
  return (
    <FormProvider {...props.methods}>
      <form
        ref={ref}
        onSubmit={props.methods.handleSubmit(props.onSubmit)}
        className={props.className}
        noValidate
      >
        {props.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {props.error}
          </Alert>
        )}
        <Box
          sx={{
            opacity: props.loading ? 0.5 : 1,
            pointerEvents: props.loading ? "none" : "auto",
          }}
        >
          <Stack spacing={props.spacing ?? 2}>{props.children}</Stack>
        </Box>
        {props.loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
      </form>
    </FormProvider>
  );
});

export default BaseForm;