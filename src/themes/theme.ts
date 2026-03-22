/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme, type ThemeOptions } from "@mui/material/styles";

const primaryColor = {
  50: "#31CB00",
  100: "#119822",
  200: "#188F22 ",
  300: "#1E8522",
  400: "#247C22",
  500: "#277722",
  600: "#2A7221",
  700: "#245B20",
  800: "#1E441E",
  900: "#152614",
};

const secondaryColor = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81",
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
    contrastText: "#ffffff",
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
    main: "#0EA5E9", // azul-ciano
    light: "#38BDF8",
    dark: "#0369A1",
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

  neutral: {
    main: "#9E9E9E",
    light: "#CFCFCF",
    dark: "#707070",
    contrastText: "#FFFFFF",
  },
};

const darkPalette = {
  primary: {
    main: primaryColor[500],
    light: primaryColor[300],
    dark: primaryColor[700],
    contrastText: "#ffffff",
  },

  secondary: {
    main: secondaryColor[500],
    light: secondaryColor[300],
    dark: secondaryColor[700],
    contrastText: "#ffffff",
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
    main: "#38BDF8",
    light: "#60E0FF",
    dark: "#0EA5E9",
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

  neutral: {
    main: "#9E9E9E",
    light: "#CFCFCF",
    dark: "#707070",
    contrastText: "#231F20",
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
    sidebar: primaryColor[500],
  },
  border: "neutral",
  input: "rgba(97, 97, 97, 0.57)",
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

  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    neutral: true;
  }
}

const radius = "1.5rem";

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
