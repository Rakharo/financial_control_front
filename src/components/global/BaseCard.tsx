/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import BaseButton from "./BaseButton";

export default function BaseCard(props: {
  children?: React.ReactNode;
  background?: React.ReactNode;
  cardTitle?: string | React.ReactElement;
  cardDescription?: string | React.ReactElement;
  centerTitle?: boolean;
  cardTitleAction?: boolean;
  cardTitleBtnText?: string;
  cardTitleOnClick?: () => void;
  cardTitleBtnIcon?: React.ReactNode;
  titleColor?: string;
  subHeaderColor?: string;
  hasActions?: boolean;
  onClick?: () => void;
  btnText?: string;
  hasMedia?: boolean;
  mediaComponent?: any;
  mediaHeight?: number;
  mediaImage?: string;
  mediaAlt?: string;
  sx?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}) {
  return (
    <Card
      sx={{
        ...props.sx,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: props.background ? "relative" : undefined,
        overflow: props.background ? "hidden" : undefined,
      }}
    >
      {props.background ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {props.background}
        </div>
      ) : null}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        {(props.cardTitle || props.cardDescription) && (
          <CardHeader
            title={props.cardTitle}
            subheader={props.cardDescription}
            action={props.cardTitleAction && (
                <BaseButton onClick={props.cardTitleOnClick} btnText={props.cardTitleBtnText} startIcon={props.cardTitleBtnIcon} />
            )}
            slotProps={
              props.centerTitle
                ? {
                    title: {
                      textAlign: "center",
                      color: `${props.titleColor}`,
                    },
                  }
                : {
                    subheader: {
                      color: props.subHeaderColor,
                    },
                  }
            }
          />
        )}
        {props.hasMedia && (
          <CardMedia
            component={props.mediaComponent}
            height={props.mediaHeight}
            image={props.mediaImage}
            alt={props.mediaAlt}
          />
        )}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            ...props.contentStyle,
          }}
        >
          {props.children}
        </CardContent>

        {props.hasActions && (
          <CardActions>
            <BaseButton onClick={props.onClick} btnText={props.btnText} />
          </CardActions>
        )}
      </div>
    </Card>
  );
}
