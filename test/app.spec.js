import fs from "fs";
import Lab from 'lab';
import { expect } from 'code';
import app from "../app";

const lab = exports.lab = Lab.script();
let { describe, it } = lab;

describe('App', () => {

  it('should return ok', (done) => {
    let opts = {
      method: "GET",
      url: "/"
    };

    app.inject(opts, (response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send clean html in email', (done) => {
    let data = {
      html: fs.readFileSync('./test/fixtures/example.html').toString(),
      sender: process.env.SENDER
    };

    let opts = {
      method: "POST",
      url: "/emails",
      payload: JSON.stringify(data)
    };

    app.inject(opts, (response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});
