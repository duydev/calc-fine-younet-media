import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

import {
  withStyles,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

class FindFacebookIdPage extends React.Component {
  state = {
    facebookUrl: '',
    facebookId: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }

    logPageView();
  }

  handleChangeFacebookUrl = e => {
    const value = e.target.value;

    this.setState({ facebookUrl: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    logEvent(`Find Facebook Id`, 'Submit Form');

    const { facebookUrl } = this.state;

    this.setState({ loading: true, facebookId: null, error: null }, () => {
      axios({
        url: `https://socialift-slack-bot.herokuapp.com/api/find-facebook-id?url=${facebookUrl}`,
        method: 'GET',
        timeout: 10000
      })
        .then(({ data }) => {
          this.setState({ facebookId: data.facebookId, loading: false });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    });
  };

  render() {
    const { classes } = this.props;
    const { facebookUrl, facebookId, error, loading } = this.state;

    return (
      <HelmetProvider>
        <Helmet>
          <title>Find Facebook Id</title>
        </Helmet>
        <Grid className={classes.root} container justify="center">
          <Grid item md={6} xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4" align="center">
                Find Facebook Id
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Facebook URL"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      fullWidth
                      value={facebookUrl}
                      onChange={this.handleChangeFacebookUrl}
                    />
                  </Grid>
                  <Grid item xs={12} container justify="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!facebookUrl}
                    >
                      Find
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {(!!facebookId || !!error) && (
                      <Alert
                        variant="filled"
                        severity={!error ? 'success' : 'error'}
                      >
                        {error
                          ? `Error: ${error.message}`
                          : `Facebook Id: ${facebookId}`}
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
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </HelmetProvider>
    );
  }
}

export default withStyles(styles, { name: 'FindFacebookIdPage' })(
  FindFacebookIdPage
);
