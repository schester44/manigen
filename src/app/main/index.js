import { loadNg1Module, ngmodule } from '../bootstrap/ngmodule';

import { appState } from './app.states';

import { app } from './app.component';
import { otherwiseConfigBlock } from './app.config';

const mainAppModule = {
  components: { app },
  states: [appState],
  configBlocks: [otherwiseConfigBlock],
  runBlocks: []
};

loadNg1Module(ngmodule, mainAppModule);
