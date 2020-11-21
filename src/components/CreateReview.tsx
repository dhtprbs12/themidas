
import React, { useState } from "react";
import { TextField, TextareaAutosize, Button, Modal, Fade, makeStyles, Theme, createStyles, Backdrop } from "@material-ui/core";
import { CREATE_FEEDBACK } from '../mutation/createFeedback'
import { useMutation } from '@apollo/react-hooks';
import { ApolloError } from "apollo-boost";
import { GET_FEEDBACKS } from '../query/getFeedbacks'

const CreateReview: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleOpen = () => {
    setIsModalOpen(true);
    resetStates()
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [
    createFeedback,
    { error: mutationError },
  ] = useMutation(CREATE_FEEDBACK, {
    onCompleted: handleOpen,
    onError: handleOpen,
    refetchQueries: () => {
      return [{
        query: GET_FEEDBACKS
    }]
    }
  });

  const [feedback, setFeedback] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    title: ''
  }
  )

  function checkIfEveryFieldIsSet(feedback: { firstName: string, lastName: string, email: string, message: string, title: string }) {

    if (feedback.firstName === '') {
      return false
    }
    if (feedback.lastName === '') {
      return false
    }
    if (feedback.email === '') {
      return false
    }
    if (feedback.message === '') {
      return false
    }
    if (feedback.title === '') {
      return false
    }
    return true
  }

  function resetStates() {
    setFeedback(prev => ({
      ...prev,
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      title: ''
    }))
  }


  async function sendMsgBtnClicked() {
    if (checkIfEveryFieldIsSet(feedback)) {
      // mutation here
      await createFeedback({ variables: { firstName: feedback.firstName, lastName: feedback.lastName, email: feedback.email, feedback: feedback.message, title: feedback.title } });
    }
  }

  function onFirstNameInput(event) {
    const value = event.target.value
    setFeedback(prev => ({
      ...prev,
      firstName: value
    }))
  }

  function onLastNameInput(event) {
    const value = event.target.value
    setFeedback(prev => ({
      ...prev,
      lastName: value
    }))
  }

  function onEmailInput(event) {
    const value = event.target.value
    setFeedback(prev => ({
      ...prev,
      email: value
    }))
  }

  function onTitleInput(event) {
    const value = event.target.value
    setFeedback(prev => ({
      ...prev,
      title: value
    }))
  }

  function onMessageInput(event) {
    const value = event.target.value
    setFeedback(prev => ({
      ...prev,
      message: value
    }))
  }
  return (

    <div className="create-review">
      <div className="create-review-container">
        <div className="create-review-wrapper">
          <h3 className="create-review-form-h3">Leave Feedback</h3>
          <div className="create-review-form-name formGroup">
            <label>First Name</label>
            <TextField
              error={feedback.firstName === ''}
              helperText={(feedback.firstName === '') ? 'Required' : ''}
              style={{ marginTop: '10px' }}
              label="First name"
              variant="outlined"
              fullWidth
              value={feedback.firstName}
              onInput={onFirstNameInput} />
            <label>Last Name</label>
            <TextField
              error={feedback.lastName === ''}
              helperText={(feedback.lastName === '') ? 'Required' : ''}
              style={{ marginTop: '10px' }}
              label="Last name"
              variant="outlined"
              fullWidth
              value={feedback.lastName}
              onInput={onLastNameInput} />
          </div>
          <div className="create-review-form-email formGroup">
            <div>
              <label>Email</label>
              <TextField
                error={feedback.email === ''}
                helperText={(feedback.email === '') ? 'Required' : ''}
                style={{ marginTop: '10px' }}
                label="Email"
                variant="outlined"
                fullWidth
                value={feedback.email}
                onInput={onEmailInput} />
            </div>
          </div>
          <div className="create-review-form-title formGroup">
            <div>
              <label>Title</label>
              <TextField
                error={feedback.title === ''}
                helperText={(feedback.title === '') ? 'Required' : ''}
                style={{ marginTop: '10px' }}
                label="Title"
                variant="outlined"
                fullWidth
                value={feedback.title}
                onInput={onTitleInput} />
            </div>
          </div>
          <div className="create-review-form-message formGroup">
            <div>
              <label>Feedback</label>
              <TextareaAutosize
                rows={7}
                aria-label="maximum height"
                placeholder="Leave feedback here..."
                cols={30}
                style={{ boxSizing: 'border-box' }}
                onInput={onMessageInput}
                value={feedback.message}
              />
            </div>
          </div>
          <div className="create-review-form-button formGroup">
            <div>
              <Button
                disabled={!checkIfEveryFieldIsSet(feedback)}
                onClick={sendMsgBtnClicked}
                variant="contained"
                color="primary">
                Send Message
                </Button>
            </div>
          </div>
        </div>
        {isModalOpen && <CustomizedModal isModalOpen={isModalOpen} handleClose={handleClose} isError={mutationError} />}
      </div>
    </div>
  );
};

type CustomizedModalProps = {
  isModalOpen: boolean
  handleClose: () => void
  isError?: ApolloError
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function CustomizedModal(props: CustomizedModalProps) {
  const { isModalOpen, handleClose, isError } = props
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isModalOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModalOpen}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">{isError ? 'CAUTION' : 'NOTICE'}</h2>
          <p id="transition-modal-description">{isError ? 'Internal Server Error. Try again' : 'Thank you for your feedback'}</p>
          <Button style={{ float: 'right', marginTop: '10px' }} variant="outlined" size='small' onClick={handleClose}>CLOSE</Button>
        </div>
      </Fade>
    </Modal>
  )

}

export default CreateReview;