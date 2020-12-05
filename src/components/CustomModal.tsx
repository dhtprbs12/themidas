import {
  Backdrop,
  Button,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  Theme,
} from "@material-ui/core";
import React from "react";

type Props = {
  isOpen: boolean;
  message: string;
  handleClose: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default function CustomModal(props: Props) {
  const { isOpen, message, handleClose } = props;
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Caution</h2>
          <p id="transition-modal-description">{message}</p>
          <Button
            style={{ float: "right", marginTop: "10px" }}
            variant="outlined"
            size="small"
            onClick={handleClose}
          >
            CLOSE
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}
