
/**
 * This is the parent state for the entire application.
 * This state's primary purpose is to provide a viewport (ui-view) for a substate to plug into
 */
export const generatorState = {
  parent: 'app',
  name: 'generator',
  url: '/generator',
  component: 'generator'
};
