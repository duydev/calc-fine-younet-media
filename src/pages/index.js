import Link from 'next/link';
import {
  withStyles,
  Paper,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea
} from '@material-ui/core';
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
  },
  cardGroup: {
    marginTop: theme.spacing(4)
  },
  card: {
    height: '100%'
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
            <Grid className={classes.cardGroup} container spacing={2}>
              <Grid item xs={6}>
                <Link href="/calc-fine">
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardHeader title="Tính tiền đi trễ YouNet Media" />
                      <CardContent>Một chiếc tool hay hay. :)))</CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="/find-facebook-id">
                  <Card className={classes.card}>
                    <CardActionArea style={{ height: '100%' }}>
                      <CardHeader title="Lấy Facebook id" />
                      <CardContent>Một chiếc tool hay hay. :)))</CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="/get-facebook-token">
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardHeader title="Lấy Facebook token full quyền" />
                      <CardContent>Một chiếc tool hay hay. :)))</CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            </Grid>
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
