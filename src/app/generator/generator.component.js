import './generator.scss';

class GeneratorController {
  constructor ($scope) {

    this.colorPickerOptions = {
        placeholder: 'Value',
        restrictToFormat: true,
        format: 'rgb',
        close: {
            show: true
        },
        reset: {
            show: true
        }
    };

    this.model = {
      manifest_version: 1,
      template_version: 1,
      private: false,
      meta: {
        name: '',
        description: ''
      },
      theme: {
        orientation: 'horizontal',
        colors: {
            bgColor: {
                name: "Background Overlay",
                value: ""
            },
            color1: {
                name: "",
                value: ""
            },
            color2: {
                name: "",
                value: ""
            },
            color3: {
                name: "",
                value: ""
            },
            color4: {
                name: "",
                value: ""
            }
        }
      },
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

                            <div class="form-control">
                                <label>Private Template</label>
                                <label class="checklist-item">
                                     <input type="checkbox" value="true" ng-model="$ctrl.model.private"/>
                                     <i></i>
                                </label>
                            </div>

                            <div class="form-control checkboxes">
                                <label>
                                    Orientation
                                    <ul>
                                        <li>
                                            <input type="radio" id="horizontal" name="orientation" value="horizontal" ng-model="$ctrl.model.theme.orientation" checked>
                                            <label for="horizontal">Horizontal</label>
                                        </li>
                                         <li>
                                            <input type="radio" id="vertical" name="orientation" value="vertical" ng-model="$ctrl.model.theme.orientation">
                                            <label for="vertical">Vertical</label>
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
                            class="copy"
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
                            <div class="form-control">
                                <label>
                                    Background Overlay Color
                                    <input type="text" name="theme.colors.bgColor" ng-model="$ctrl.model.theme.colors.bgColor.name" placeholder="rgba(0,0,0,0.2)">
                                    <color-picker options="$ctrl.colorPickerOptions" ng-model="$ctrl.model.theme.colors.bgColor.value"></color-picker>
                                </label>
                            </div>

                            <div class="form-control">
                                <label>
                                    Color 1
                                    <input type="text" name="theme.colors.color1.name" ng-model="$ctrl.model.theme.colors.color1.name" placeholder="Name">
                                    <color-picker options="$ctrl.colorPickerOptions" ng-model="$ctrl.model.theme.colors.color1.value"></color-picker>
                                </label>
                            </div>
                            
                            <div class="form-control">
                                <label>
                                    Color 2
                                    <input type="text" name="theme.colors.color2.name" ng-model="$ctrl.model.theme.colors.color2.name" placeholder="Name">
                                    <color-picker options="$ctrl.colorPickerOptions" ng-model="$ctrl.model.theme.colors.color2.value"></color-picker>
                                </label>
                            </div>      

                            <div class="form-control">
                                <label>
                                    Color 3
                                    <input type="text" name="theme.colors.color3.name" ng-model="$ctrl.model.theme.colors.color3.name" placeholder="Name">
                                    <color-picker options="$ctrl.colorPickerOptions" ng-model="$ctrl.model.theme.colors.color3.value"></color-picker>
                                </label>
                            </div>

                            <div class="form-control">
                                <label>
                                    Color 4
                                    <input type="text" name="theme.colors.color4.name" ng-model="$ctrl.model.theme.colors.color4.name" placeholder="Name">
                                    <color-picker options="$ctrl.colorPickerOptions" ng-model="$ctrl.model.theme.colors.color4.value"></color-picker>
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
                                    Exchange/Outlook
                                     <input type="checkbox" value="ews" checklist-model="$ctrl.model.compatbility.services"/>
                                     <i></i>
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="checklist-item">
                                    iCalendar
                                     <input type="checkbox" value="icalendar" checklist-model="$ctrl.model.compatbility.services"/>
                                     <i></i>
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="checklist-item">
                                    Excel
                                     <input type="checkbox" value="excel" checklist-model="$ctrl.model.compatbility.services"/>
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
