import { Injectable } from '@angular/core';
import * as beautify from 'js-beautify';

@Injectable()
export class StringifyService {

  // See https://github.com/beautify-web/js-beautify/blob/master/js/config/defaults.json
  options = {
    indent_size: 2
  };

  constructor() { }

  getPrettyCompact(obj: any): string {
    const stringified = JSON.stringify(obj);
    return beautify(stringified, this.options);
  }
}
