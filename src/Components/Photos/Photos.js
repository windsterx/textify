import React from "react";
import {
  Grid,
  makeStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import GetAppSharpIcon from "@material-ui/icons/GetAppSharp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: "16px",
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "rgba(255, 255, 255)",
  },
}));
export default function Photos(props) {
  const classes = useStyles();
  const { fromNo } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={250} className={classes.gridList} cols={4}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile> */}
        {props.images.map((item) =>
          item.images && item.images.length > 0
            ? item.images.map((img, i) => (
                <GridListTile style={{ objectFit: "fill" }} key={i}>
                  <img src={img.url} alt="Images" />
                  <GridListTileBar
                    title={
                      item.from === fromNo
                        ? `Sent to ${item.to}`
                        : `Recieved from ${item.from}`
                    }
                    actionIcon={
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton className={classes.icon}>
                          <GetAppSharpIcon />
                        </IconButton>
                      </a>
                    }
                  />
                </GridListTile>
              ))
            : "No Photos"
        )}
        {/* {props.images.map((img, i) => (
          <GridListTile key={i}>
            <img src={img.url} alt="Images" />
            <GridListTileBar
              actionIcon={
                <a href={img.url} target="_blank" rel="noopener noreferrer">
                  <IconButton className={classes.icon}>
                    <GetAppSharpIcon />
                  </IconButton>
                </a>
              }
            />
          </GridListTile>
        ))} */}
      </GridList>
    </div>
  );
}
