// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import Welcome from '../_modules/welcome/welcome';
import {log} from './utils';

let welcome = new Welcome();
    welcome.init();

// Console MSG
log("Welcome to Scffld!");
