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

class HomePage extends React.Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }

    logPageView();
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.root} container justify="center">
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              DuyDev's Tools
            </Typography>
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
    );
  }
}

export default withStyles(styles, { name: 'HomePage' })(HomePage);
