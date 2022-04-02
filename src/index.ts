import $ from 'jquery';

import './scss';
import {testFunc} from './scripts/test';
import {foo} from './scripts/foo';

testFunc('ку');

foo.log('test');

$('#jqueryDiv').css('color', 'green');
