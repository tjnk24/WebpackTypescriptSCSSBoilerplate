import $ from 'jquery';

import './scss';
import {testFunc} from './scripts/test';
import {foo} from './scripts/foo';
import {test} from './scripts/bar';

console.log(test);

testFunc('ку');

foo.log('test');

$('#jqueryDiv').css('color', 'green');
