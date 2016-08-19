import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import apiRouter from "./api/index.js";
import bodyParse from 'body-parser';
import db from './mongodb/db';
const app = express();
const compiler = webpack(webpackConfig);
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(express.static('./public'));
console.log("------server------");
app.use("/api", apiRouter);
if(require.main === module) {
  app.listen(3000, function () {
    db.connect((err) => {
      if(err) return console.error('db connection failed');
      console.log('Listening on 3000');
    });
  });
}

export default app;
