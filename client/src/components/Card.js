import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MovieCard({
  src,
  title,
  popularity,
  onClick,
  addToFavorite,
  disabled,
}) {
  return (
    <Card sx={{ width: 345, height: 245, marginBottom: 10 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          object-fit="contain"
          height="140"
          image={src}
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {popularity}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={onClick}
          disabled={disabled}
        >
          {addToFavorite}
        </Button>
      </CardActions>
    </Card>
  );
}
