import './generator.scss';

class GeneratorController {
  constructor ($scope) {
    this.model = {
      manifest_version: 1,
      template_version: 1,
      private: 'false',
      orientation: 'horizontal',
      meta: {
        name: '',
        description: ''
      },
      theme: {},
      compatibility: {
        services: []
      }
    };

    $scope.$watch(() => this.model, () => {
      console.log('model change');
      this.copyText = JSON.stringify(this.model);
    }, true);
  }
}

export const generator = {
  controller: GeneratorController,
  template: `
    <header class="hero">
        <div class="hero-inner">
            <h1>Manifest Generator</h1>
            <h2>Generate a template manifest for the IWEA in seconds</h2>
        </div>
    </header>
    <div class="generator">
        <div class="container">
            <div class="card">
                <div class="row">
                    <div class="column">
                        <div class="input-block">
                            <h5 class="section-heading">General information about your template</h5>
                            <div class="form-control">
                                <label>
                                    Manifest Version
                                    <input type="text" name="manifest_version" ng-model="$ctrl.model.manifest_version" disabled>
                                </label>
                            </div>
                            
                            <div class="form-control">
                                <label>
                                    Template Version
                                    <input type="number" placeholder="1" name="template_version" ng-model="$ctrl.model.template_version">
                                </label>
                            </div>

                            <div class="form-control">
                                <label>
                                    Template Name
                                    <input type="text" name="name" placeholder="Template Name" ng-model="$ctrl.model.meta.name">
                                </label>
                            </div>
                            
                            <div class="form-control">
                                <label>
                                    Template Description
                                    <input type="text" name="description" placeholder="Template Description" ng-model="$ctrl.model.meta.description">
                                </label>
                            </div>      

                            <div class="form-control checkboxes">
                                <label>
                                    Private Template
                                    <ul>
                                        <li>
                                            <input type="radio" id="false" name="private" value="false" ng-model="$ctrl.model.private" checked>
                                            <label for="false">False</label>
                                        </li>
                                         <li>
                                            <input type="radio" id="true" name="private" value="true" ng-model="$ctrl.model.private">
                                            <label for="true">True</label>
                                        </li>
                                    </ul>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="codeblock" sticky>
                            <span class="heading">Your manifest will update as you type your information</span>
                            <div class="codeblock-code">
                            <pre>
                                <code ng-bind-html="$ctrl.model | json | highlight: 'json' | unsafe">
                                </code>
                            </pre>
                            </div>
                            <button
                            clipboard
                            text="$ctrl.copyText"
                            on-copied="$ctrl.success()"
                            on-error="$ctrl.fail(err)"
                            >Copy</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="row">
                    <div class="column">
                        <div class="input-block">
                            <h5 class="section-heading">Template Theme</h5>           
                            <div class="form-control checkboxes">
                                <label>
                                    Orientation
                                    <ul>
                                        <li>
                                            <input type="radio" id="horizontal" name="orientation" value="horizontal" ng-model="$ctrl.model.orientation" checked>
                                            <label for="horizontal">Horizontal</label>
                                        </li>
                                         <li>
                                            <input type="radio" id="vertical" name="orientation" value="vertical" ng-model="$ctrl.model.orientation">
                                            <label for="vertical">Vertical</label>
                                        </li>
                                    </ul>
                                </label>
                            </div>
                            
                            <div class="form-control">
                                <label>
                                    Background Overlay Color
                                    <input type="text" name="theme.bgColor" ng-model="$ctrl.model.theme.bgColor" placeholder="rgba(0,0,0,0.2)">
                                </label>
                            </div>

                            <div class="form-control">
                                <label>
                                    Color 1
                                    <input type="text" name="theme.color1" ng-model="$ctrl.model.theme.color1" placeholder="rgba(255,0,0,1)">
                                </label>
                            </div>
                            
                            <div class="form-control">
                                <label>
                                    Color 2
                                    <input type="text" name="theme.color2" ng-model="$ctrl.model.theme.color2" placeholder="rgba(0,0,0,1)">
                                </label>
                            </div>      

                            <div class="form-control">
                                <label>
                                    Color 3
                                    <input type="text" name="theme.color3" ng-model="$ctrl.model.theme.color3" placeholder="rgba(0,0,0,1)">
                                </label>
                            </div>

                            <div class="form-control">
                                <label>
                                    Color 4
                                    <input type="text" name="theme.color4" ng-model="$ctrl.model.theme.color4" placeholder="rgba(0,0,0,1)">
                                </label>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="row">
                    <div class="column">
                        <div class="input-block">
                            <h5 class="section-heading">Compatibility</h5>
                            <h6 class="section-subheading">Services</h6>
                            <div class="form-control">
                                <label class="checklist-item">
                                    Exchange Web Services
                                     <input type="checkbox" value="3" checklist-value="2" checklist-model="$ctrl.model.compatbility.services"/>
                                     <i></i>
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="checklist-item">
                                    iCalendar
                                     <input type="checkbox" value="2" checklist-value="3" checklist-model="$ctrl.model.compatbility.services"/>
                                     <i></i>
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="checklist-item">
                                    Excel
                                     <input type="checkbox" value="4" checklist-value="4" checklist-model="$ctrl.model.compatbility.services"/>
                                     <i></i>
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="checklist-item">
                                    Blackbaud
                                     <input type="checkbox" value="1" checklist-value="1" checklist-model="$ctrl.model.compatbility.services"/>
                                     <i></i>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer> Save the copied json as <span class="code">manifest.json</span> inside your template's <span class="code">dist/</span> folder.</footer>
        </div>
    </div>

  `
};
