import Link from 'next/link';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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

import { getFacebookAccessTokenURL } from '../utils/facebook-token';
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
  },
  alert: {
    overflow: 'auto'
  },
  iframe: {
    width: '100%',
    height: '500px'
  }
});

class GetFacebookTokenPage extends React.Component {
  state = {
    email: '',
    password: '',
    accessToken: null,
    url: null,
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

  handleChangeTextField = fieldName => e => {
    const value = e.target.value;

    this.setState({ [fieldName]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    logEvent(`Get Facebook Access Token`, 'Submit Form');

    const { email, password } = this.state;

    this.setState({ url: null }, () => {
      const url = getFacebookAccessTokenURL(email, password);

      this.setState({ url });
    });

    // window.open(url, '_blank');

    // this.setState({ loading: true, accessToken: null, error: null }, () => {
    //   getFacebookAccessToken(email, password)
    //     .then(({ data }) => {
    //       this.setState({ accessToken: data.access_token, loading: false });
    //     })
    //     .catch(error => {
    //       let err = error;

    //       if (error.response) {
    //         err = Error(error.response.data.message);
    //         err.code = error.response.data.code;
    //       }

    //       this.setState({ error: err, loading: false });
    //     });
    // });
  };

  render() {
    const { classes } = this.props;
    const { email, password, accessToken, error, loading, url } = this.state;

    return (
      <HelmetProvider>
        <Helmet>
          <title>Get Facebook Access Token - DuyDev's Tools</title>
        </Helmet>
        <Grid className={classes.root} container justify="center">
          <Grid item md={6} xs={12}>
            <Paper className={classes.paper}>
              <Link href="/">
                <Button> &laquo; Back</Button>
              </Link>
              <Typography variant="h4" align="center">
                Get Facebook Access Token
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type="email"
                      label="Email"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      fullWidth
                      value={email}
                      onChange={this.handleChangeTextField('email')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type="password"
                      label="Password"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      fullWidth
                      value={password}
                      onChange={this.handleChangeTextField('password')}
                    />
                  </Grid>
                  <Grid item xs={12} container justify="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!email || !password || loading}
                    >
                      Get Access Token
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {(!!accessToken || !!error) && (
                      <Alert
                        classes={{
                          root: classes.alert
                        }}
                        variant="filled"
                        severity={!error ? 'success' : 'error'}
                      >
                        {error
                          ? `Error: ${error.message}`
                          : `Access Token: ${accessToken}`}
                      </Alert>
                    )}
                    {!!url && <iframe className={classes.iframe} src={url} />}
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

export default withStyles(styles, { name: 'GetFacebookTokenPage' })(
  GetFacebookTokenPage
);
