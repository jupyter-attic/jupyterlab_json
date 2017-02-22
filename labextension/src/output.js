import { Widget } from 'phosphor/lib/ui/widget';
import React from 'react';
import ReactDOM from 'react-dom';
import JSONComponent from 'jupyterlab_json_react';

/**
 * The class name added to this OutputWidget.
 */
const CLASS_NAME = 'jp-OutputWidgetJSON';

/**
 * A widget for rendering JSON.
 */
export class OutputWidget extends Widget {
  constructor(options) {
    super();
    this.addClass(CLASS_NAME);
    this._source = options.model.data.get(options.mimeType);
  }

  /**
   * A message handler invoked on an `'after-attach'` message.
   */
  onAfterAttach(msg) {
    this._render();
  }

  /**
   * A message handler invoked on an `'before-detach'` message.
   */
  onBeforeDetach(msg) {
    ReactDOM.unmountComponentAtNode(this.node);
  }

  /**
   * A render function given the widget's DOM node.
   */
  _render() {
    let json = this._source;
    ReactDOM.render(<JSONComponent data={json} theme="cm-s-jupyter" />, this.node);
  }
}

export class OutputRenderer {
  /**
   * The mime types this OutputRenderer accepts.
   */
  mimeTypes = [ 'application/json' ];

  /**
   * Whether we can render the request.
   */
  canRender(options) {
    let mime = options.mimeType
    return this.mimeTypes.indexOf(mime) !== -1;
  }

  /**
   * Render the request.
   */
  render(options) {
    return new OutputWidget(options);
  }
}
