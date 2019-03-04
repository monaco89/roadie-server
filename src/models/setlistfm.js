import setlistfm from 'setlistfm-js';

var setlistfmClient = new setlistfm({
  key: process.env.SETLISTFM_CLIENT_ID,
  format: 'json', // "json" or "xml"
  language: 'en',
});

export default setlistfmClient;
