import './app.scss';

class AppController {}

export const app = {
  controller: AppController,
  template: `
  <div class="main-container">
    <div class="content-container">
      <ui-view></ui-view>
    </div>
  </div>
`
};
