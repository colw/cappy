# Cappy

A simplified view of your Nightscout CGM data.

Very much a work in progress. The basic data is present, but no styling to speak off.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/colw/cappy)

You will need the following environment variables defined in Netlify:

```
NS_TOKEN=<subject token from nightscout>
NS_URI=<https://yourinstance.herokuapp.com/api/v3>
```

- You can create the token in Nightscout by clicking Admin Tools > Add new Subject.
- Be sure to include your full Nightscout url starting with `https:` and ending with `/api/v3`.
