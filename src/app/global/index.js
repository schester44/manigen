import {loadNg1Module, ngmodule} from '../bootstrap/ngmodule';

const globalAppModule = {
  directives: {},
  services: {},
  runBlocks: []
};

loadNg1Module(ngmodule, globalAppModule);
