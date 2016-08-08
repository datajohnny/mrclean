import fs from 'fs';
import Lab from 'lab';
import { expect } from 'code';
import cleaner from "../cleaner";

const lab = exports.lab = Lab.script();
let { describe, it } = lab;

describe('Cleaner', () => {

  it('clean up html', (done) => {
    let rawHtml = fs.readFileSync('./test/fixtures/example.html').toString();
    let cleanHtml = fs.readFileSync('./test/fixtures/example-clean.html').toString();
    let html = cleaner(rawHtml);
    expect(html).to.equal(cleanHtml);
    done();
  });

});
