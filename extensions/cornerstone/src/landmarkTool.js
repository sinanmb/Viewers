import csTools from 'cornerstone-tools';

/**
 * @public
 * @class LandmarkTool
 * @memberof Tools.Annotation
 * @classdesc Tool which provides a probe of the image data at the
 * desired position and has a callback to display a popup
 * @extends csTools.ProbeTool
 */
export default class LandmarkTool extends csTools.ProbeTool {
  constructor(configuration = {}) {
    const defaultConfig = {
      name: 'Landmark',
      getTextCallback,
      changeTextCallback,
    };
    const initialConfiguration = Object.assign(defaultConfig, configuration);

    super(initialConfiguration);
  }

  createNewMeasurement(eventData) {
    const measurementData = super.createNewMeasurement(eventData);
    // Associate this data with this imageId so we can render it and manipulate it

    csTools.addToolState(eventData.element, this.name, measurementData);
    // Allow relabelling via a callback
    this._updateTextForNearbyAnnotation(eventData);
  }

  _updateTextForNearbyAnnotation(evt) {
    const element = evt.element;
    const coords = evt.currentPoints.canvas;
    const toolState = csTools.getToolState(element, this.name);

    if (!toolState) {
      return false;
    }

    for (let i = 0; i < toolState.data.length; i++) {
      const data = toolState.data[i];

      if (super.pointNearTool(element, data, coords)) {
        data.active = true;
        csTools.external.cornerstone.updateImage(element);

        // Allow relabelling via a callback
        this.configuration.changeTextCallback(
          data,
          evt.detail,
          this._doneChangingTextCallback.bind(this, element, data)
        );

        evt.event.stopImmediatePropagation();
        evt.event.preventDefault();
        evt.event.stopPropagation();

        return true;
      }
    }
  }

  _doneChangingTextCallback(element, measurementData, updatedData, deleteTool) {
    if (deleteTool === true) {
      csTools.removeToolState(element, this.name, measurementData);
    } else {
      measurementData.location = updatedData.label;
      measurementData.description =
        updatedData.position ||
        (updatedData.severeCentralCanalStenosis ? 'Severe' : null);

      measurementData.annotation = updatedData;
    }

    measurementData.active = false;
    csTools.external.cornerstone.updateImage(element);

    triggerEvent(element, csTools.EVENTS.MEASUREMENT_MODIFIED, {
      toolType: this.name,
      element,
      measurementData,
    });
  }

  updateCachedStats(image, element, data) {
    // Hide data on the viewport
    data.cachedStats = {};
    data.invalidated = false;
  }
}

function getTextCallback(doneChangingTextCallback) {
  doneChangingTextCallback(prompt('Enter your annotation:'));
}

function changeTextCallback(data, eventData, doneChangingTextCallback) {
  doneChangingTextCallback(prompt('Change your annotation:'));
}

/**
 * Triggers a CustomEvent. Copied from Cornerstone-tools
 * @public
 * @method triggerEvent
 *
 * @param {EventTarget} el The element or EventTarget to trigger the event upon.
 * @param {String} type    The event type name.
 * @param {Object|null} [detail=null] The event data to be sent.
 * @returns {Boolean} The return value is false if at least one event listener called preventDefault(). Otherwise it returns true.
 */
function triggerEvent(el, type, detail = null) {
  let event;

  // This check is needed to polyfill CustomEvent on IE11-
  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(type, {
      detail,
      cancelable: true,
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, detail);
  }

  return el.dispatchEvent(event);
}
