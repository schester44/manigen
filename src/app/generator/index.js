import { loadNg1Module, ngmodule } from '../bootstrap/ngmodule';
import { generatorState } from './generator.states';
import { generator } from './generator.component';

const mainAppModule = {
  components: {generator},
  states: [generatorState]
};

loadNg1Module(ngmodule, mainAppModule);
