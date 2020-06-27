# Cappy

Check your glucose with Cappy. A simplified view of your Nightscout CGM data.

Very much a work in progress. The basic data is present, but no styling to speak off.

- Currently the build process is very messy. Experimenting with esbuild, eschewing webpack.
- ~~Wrote a simple fsevents watch bash script to rebuild the client.~~
    - ~~Requires `fswatch` (`brew install fswatch`).~~
- Netlify-lambda handles the serverless functions locally.
- Attempted parcel v2 beta, but fell back to v1 over proxy/cors issues.
- Used simple parcel-bundler server instead, obtained from comments in Parcel github issues.
- Still use esbuild for the netlify functions.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/colw/cappy)

You will need the following environment variables defined in Netlify:

```
NS_TOKEN=<subject token from nightscout>
NS_URI=<https://yourinstance.herokuapp.com/api/v3>
```

- You can create the token in Nightscout by clicking Admin Tools > Add new Subject.
- Be sure to include your full Nightscout url starting with `https:` and ending with `/api/v3`.
