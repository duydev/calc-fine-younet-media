import { Helmet, HelmetProvider } from 'react-helmet-async';

import {
  withStyles,
  Paper,
  Grid,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { getResultMessage } from '../utils';
import { initGA, logPageView, logEvent } from '../utils/analytics';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2)
  },
  form: {
    padding: theme.spacing(2),
    paddingBottom: 0
  },
  textField: {
    fontSize: '2em'
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  footerLink: {
    paddingLeft: '4px',
    textDecoration: 'none',
    fontWeight: 700,
    color: 'inherit'
  }
});

class CalcFinePage extends React.Component {
  state = {
    time: '',
    success: false,
    message: ''
  };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }

    logPageView();
  }

  handleChangeTime = e => {
    const value = e.target.value;

    this.setState({ time: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { time } = this.state;

    logEvent(`Tính Tiền Phạt Đi Trễ`, 'Submit Form');

    if (!time) return;

    this.setState({ success: false, message: '' }, () => {
      const { success, message } = getResultMessage(time);

      this.setState({ success, message });
    });
  };

  render() {
    const { classes } = this.props;
    const { time, success, message } = this.state;

    return (
      <HelmetProvider>
        <Helmet>
          <title>Tính tiền phạt đi trễ YouNet Media - DuyDev's Tools</title>
        </Helmet>
        <Grid className={classes.root} container justify="center">
          <Grid item md={6} xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4" align="center">
                Tính Tiền Phạt Đi Trễ
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="time"
                      label="Thời gian bạn đến công ty"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      fullWidth
                      value={time}
                      onChange={this.handleChangeTime}
                    />
                  </Grid>
                  <Grid item xs={12} container justify="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!time}
                    >
                      Tính tiền phạt
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {!!message && (
                      <Alert
                        variant="filled"
                        severity={success ? 'success' : 'error'}
                      >
                        {message}
                      </Alert>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Paper>
            <Typography className={classes.footer} variant="inherit">
              Made with ❤️ by
              <a className={classes.footerLink} href="https://duydev.me">
                Trần Nhật Duy
              </a>
              .
            </Typography>
          </Grid>
        </Grid>
      </HelmetProvider>
    );
  }
}

export default withStyles(styles, { name: 'CalcFinePage' })(CalcFinePage);
