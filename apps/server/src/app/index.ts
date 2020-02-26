import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';
const fetch = require('node-fetch');
const request = require('request');
const querystring = require('querystring');
const path = require('path');
const cors = require('cors');
const {google} = require('googleapis');


export default class App {
  public app: express.Application;
  private oauth2Client:any;
  private calendarEvents: any;
  private scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];

  constructor() {
    this.app = express();

    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );

    this.initializeMiddleWares();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`calendar-api - ${process.env.PORT}`);
    });

    //OAUTH REDIRECT
    this.app.get('/api/login', (req, res) => {
      const url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.scopes
      });

      res.redirect(url);
    });

    this.app.get('/api/auth-callback', async (req, res) => {
      const {tokens} = await this.oauth2Client.getToken(req.query.code);

      this.oauth2Client.setCredentials(tokens);

      res.redirect('/#' + querystring.stringify(tokens));
    });

    this.app.get('/api/me', async(req, res) => {
      const user = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        method: 'get',
        headers: { 'Authorization': `Bearer ${this.oauth2Client.credentials['access_token']}`},
      });
      res.send(await user.json());
    });

    this.app.get('/api/me/calendars', async(req, res) => {

      const calendarApi = google.calendar({version: 'v3', auth: this.oauth2Client});
      const list = calendarApi.calendarList.list({
        maxResults: 100,
      });

      await list.then(({data}) => {
        res.send(data);
      })
    });


    //EVENTS
    this.app.get('/api/me/calendars/:calendarId/events', async(req, res) => {
      const calendarApi = google.calendar({version: 'v3', auth: this.oauth2Client});
      const list = calendarApi.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime',
      });

      await list.then(({data}) => res.send(data));
      // res.send(await user.json());
    });
    this.app.post('/api/me/calendars/:calendarId/events', async(req, res) => {
      console.log(req.body);

      const calendarApi = google.calendar({version: 'v3', auth: this.oauth2Client});
      const result = await calendarApi.events.insert({
        "calendarId": req.params.calendarId,
        "resource": {...req.body}
      });

      res.send(result.data);
      // await result.then(({data}) =>
      //   res.send(data)
      // );
    });
    this.app.put('/api/me/calendars/:calendarId/events/:id', async(req, res) => {

      const calendarApi = google.calendar({version: 'v3', auth: this.oauth2Client});
      const result = calendarApi.events.patch({
        calendarId: req.params.calendarId || 'primary',
        eventId: req.params.id,
        resource: {
          ...req.body
        }
      });

      await result.then(({data}) =>
        res.send(data)
      );
    });
    this.app.delete('/api/me/calendars/:calendarId/events/:id', async(req, res) => {

      const calendarApi = google.calendar({version: 'v3', auth: this.oauth2Client});
      const result = calendarApi.events.delete({
        calendarId: req.params.calendarId || 'primary',
        eventId: req.params.id
      });

      await result.then(({data}) =>
        res.send(data)
      );
    });


    this.app.use(express.static(path.join(__dirname, '../../../dist/apps/dashboard')));
    this.app.use('/*', express.static(path.join(__dirname, '../../../dist/apps/dashboard/index.html')))
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleWares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use('/', morgan('dev'));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
