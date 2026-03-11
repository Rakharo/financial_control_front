/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme, type ThemeOptions } from "@mui/material/styles";

const primaryColor = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1", // principal
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81",
};

const secondaryColor = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  300: "#6ee7b7",
  400: "#34d399",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b",
};

const lightPalette = {
  primary: {
    main: primaryColor[500],
    light: primaryColor[300],
    dark: primaryColor[700],
    contrastText: "#ffffff",
  },

  secondary: {
    main: secondaryColor[500],
    light: secondaryColor[200],
    dark: secondaryColor[400],
    contrastText: "#231F20",
  },

  background: {
    default: "#F2F2F2",
    paper: "#FFFFFF",
    card: "#FAFAFA",
  },

  text: {
    primary: "#231F20",
    secondary: "#4B4B4B",
    disabled: "#9E9E9E",
  },

  divider: "#DAD6DF",

  info: {
    main: primaryColor[400], // primary 400
    contrastText: "#FFFFFF",
  },

  success: {
    main: "#3FC39A",
    light: "#6FD7B5",
    lighter: "#A3E8D1",
    contrastText: "#FFFFFF",
  },

  warning: {
    main: "#F2A600",
    contrastText: "#231F20",
  },

  error: {
    main: "#E75858",
    contrastText: "#FFFFFF",
  },
};

const darkPalette = {
  primary: {
    main: primaryColor[300],
    light: primaryColor[200],
    dark: primaryColor[500],
    contrastText: "#ffffff",
  },

  secondary: {
    main: secondaryColor[200],
    light: secondaryColor[100],
    dark: secondaryColor[400],
    contrastText: "#231F20",
  },

  background: {
    default: "#19191B",
    paper: "#1F1F23",
    card: "#252228",
  },

  text: {
    primary: "#E6E6E6",
    secondary: "#B8B8B8",
    disabled: "#6F6F6F",
  },

  divider: "#3A3342",

  info: {
    main: primaryColor[200], // primary 200
    contrastText: "#231F20",
  },

  success: {
    main: "#6FD7B5",
    light: "#A3E8D1",
    lighter: "#DAF6ED",
    contrastText: "#231F20",
  },

  warning: {
    main: "#FFD166",
    contrastText: "#231F20",
  },

  error: {
    main: "#B03A3A",
    contrastText: "#FFFFFF",
  },
};

const lightTokens = {
  surface: {
    card: "#FAFAFA",
    sidebar: "#FFFFFF",
  },
  border: "#DAD6DF",
  input: "#FFFFFF",
};

const darkTokens = {
  surface: {
    card: "#252228",
    sidebar: "#232026",
  },
  border: "#3A3342",
  input: "#3A3342",
};

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      surface: {
        card: string;
        sidebar: string;
      };
      border: string;
      input: string;
    };
  }

  interface ThemeOptions {
    custom?: Theme["custom"];
  }
}

const radius = "0.5rem";

export const getTheme = (mode: "light" | "dark") => {
  const tokens = mode === "light" ? lightTokens : darkTokens;
  const palette = mode === "light" ? lightPalette : darkPalette;

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: palette.primary.main,
        light: palette.primary.light,
        dark: palette.primary.dark,
        contrastText: palette.primary.contrastText,
      },

      secondary: {
        main: palette.secondary.main,
        light: palette.secondary.light,
        dark: palette.secondary.dark,
        contrastText: palette.secondary.contrastText,
      },

      background: {
        default: palette.background.default,
        paper: palette.background.paper,
      },

      text: {
        primary: palette.text.primary,
        secondary: palette.text.secondary,
        disabled: palette.text.disabled,
      },

      divider: palette.divider,

      error: {
        main: palette.error.main,
        contrastText: palette.error.contrastText,
      },

      warning: {
        main: palette.warning.main,
        contrastText: palette.warning.contrastText,
      },

      info: {
        main: palette.info.main,
        contrastText: palette.info.contrastText,
      },

      success: {
        main: palette.success.main,
        light: palette.success.lighter,
        // lighter: palette.success.lighter,
        contrastText: palette.success.contrastText,
      },
    },

    custom: {
      surface: tokens.surface,
      border: tokens.border,
      input: tokens.input,
    },
    shape: {
      borderRadius: 8, // Aproximação de 0.5rem
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParam: any) => ({
          body: {
            scrollbarWidth: "thin",
            scrollbarColor: `${themeParam.palette.primary.main} transparent`,
          },

          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },

          "*::-webkit-scrollbar-track": {
            background: "transparent",
          },

          "*::-webkit-scrollbar-thumb": {
            backgroundColor: themeParam.palette.primary.main,
            borderRadius: "8px",
            border: "2px solid transparent",
            backgroundClip: "content-box",
          },

          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: themeParam.palette.primary.dark,
          },
          "*": {
            scrollBehavior: "smooth",
          },
        }),
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            ".json-forms-root &": {
              marginBottom: "1em",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: radius,
            textTransform: "none",
            boxShadow: "none",
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: theme.custom.border,
          }),
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: radius,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0px 0px 10px 5px rgba(0,0,0,0.4)"
                : "0px 0px 10px 5px rgba(0,0,0,0.089)",
          }),
        },
      },

      MuiAppBar: {
        styleOverrides: {
          colorPrimary: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.primary.main
                : theme.custom.surface.sidebar,
            color: theme.palette.text.primary,
          }),
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.custom.input,
            borderRadius: radius,
          }),
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.custom.input,
            borderRadius: theme.shape.borderRadius,

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main,
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }),

          notchedOutline: ({ theme }) => ({
            borderColor: theme.custom.border,
          }),
        },
      },

      MuiFilledInput: {
        styleOverrides: {
          root: {
            // Aplica só quando hover e não está focado
            "&:hover:not(.Mui-focused):before": {
              borderBottomColor: palette.secondary,
            },
          },
          underline: ({ theme }) => ({
            "&:before": {
              borderBottomColor: theme.custom.border,
            },
          }),
        },
      },

      MuiInput: {
        styleOverrides: {
          root: {
            // Aplica só quando hover e não está focado
            "&:hover:not(.Mui-focused):before": {
              borderBottomColor: palette.secondary,
            },
          },
          underline: ({ theme }) => ({
            "&:before": {
              borderBottomColor: theme.custom.border,
            },
          }),
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: radius,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0px 0px 10px 5px rgba(0,0,0,0.4)"
                : "0px 0px 10px 5px rgba(0,0,0,0.089)",
          }),
        },
      },
    },
  };

  return createTheme(themeOptions);
};

export default getTheme;
