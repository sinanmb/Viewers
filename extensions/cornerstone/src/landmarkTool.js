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

  // TODO Sinan: Import / Copy the required methods from Cornerstone tools
  // Hide current text data. Just show a dot to mark the location.
  // Show different color for Nerve vs Stenosis
  // Show index in the measurement table list if that data is available

  // renderToolData(evt) {
  //   console.log('renderToolData');
  //   console.log(evt);

  //   const eventData = evt.detail;
  //   const { handleRadius } = this.configuration;
  //   const toolData = csTools.getToolState(evt.currentTarget, this.name);

  //   if (!toolData) {
  //     return;
  //   }

  //   // We have tool data for this element - iterate over each one and draw it
  //   const context = getNewContext(eventData.canvasContext.canvas);
  //   const { image, element } = eventData;
  //   const fontHeight = csTools.textStyle.getFontSize();

  //   for (let i = 0; i < toolData.data.length; i++) {
  //     const data = toolData.data[i];

  //     if (data.visible === false) {
  //       continue;
  //     }

  //     draw(context, context => {
  //       const color = csTools.toolColors.getColorIfActive(data);
  //       console.log('draw color');
  //       console.log(color);

  //       if (this.configuration.drawHandles) {
  //         // Draw the handles
  //         csTools.drawHandles(context, eventData, data.handles, {
  //           handleRadius,
  //           color,
  //         });
  //       }

  // // Update textbox stats
  // if (data.invalidated === true) {
  //   if (data.cachedStats) {
  //     this.throttledUpdateCachedStats(image, element, data);
  //   } else {
  //     this.updateCachedStats(image, element, data);
  //   }
  // }

  // let text, str;

  // const { x, y, storedPixels, sp, mo, suv } = data.cachedStats;

  // if (x >= 0 && y >= 0 && x < image.columns && y < image.rows) {
  //   text = `${x}, ${y}`;

  //   if (image.color) {
  //     str = `R: ${storedPixels[0]} G: ${storedPixels[1]} B: ${
  //       storedPixels[2]
  //     }`;
  //   } else {
  //     // Draw text
  //     str = `SP: ${sp} MO: ${parseFloat(mo.toFixed(3))}`;
  //     if (suv) {
  //       str += ` SUV: ${parseFloat(suv.toFixed(3))}`;
  //     }
  //   }

  //   // Coords for text
  //   const coords = {
  //     // Translate the x/y away from the cursor
  //     x: data.handles.end.x + 3,
  //     y: data.handles.end.y - 3,
  //   };
  //   const textCoords = external.cornerstone.pixelToCanvas(
  //     eventData.element,
  //     coords
  //   );

  //   drawTextBox(
  //     context,
  //     "",
  //     textCoords.x,
  //     textCoords.y + fontHeight + 5,
  //     color
  //   );
  //   drawTextBox(context, text, textCoords.x, textCoords.y, color);
  // }

  //     });
  //   }
  // }

  // /**
  //  *
  //  *
  //  * @param {*} element
  //  * @param {*} data
  //  * @param {*} coords
  //  * @returns {Boolean}
  //  */
  // pointNearTool(element, data, coords) {
  //   const hasEndHandle = data && data.handles && data.handles.end;
  //   const validParameters = hasEndHandle;

  //   if (!validParameters) {
  //     logger.warn(
  //       `invalid parameters supplied to tool ${this.name}'s pointNearTool`
  //     );
  //   }

  //   if (!validParameters || data.visible === false) {
  //     return false;
  //   }

  //   console.log('point near tool data');
  //   console.log(data);

  //   const probeCoords = csTools.external.cornerstone.pixelToCanvas(
  //     element,
  //     data.handles.end
  //   );

  //   return (
  //     csTools.external.cornerstoneMath.point.distance(probeCoords, coords) < 5
  //   );
  // }

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
      // console.log('_doneChangingTextCallback');
      // console.log(measurementData);
      // console.log(updatedData);
      // console.log(element);
      measurementData.displayText = updatedData.type;
      measurementData.location = updatedData.label;
      measurementData.description = updatedData.position;
    }

    measurementData.active = false;
    csTools.external.cornerstone.updateImage(element);

    triggerEvent(element, csTools.EVENTS.MEASUREMENT_MODIFIED, {
      toolType: this.name,
      element,
      measurementData,
    });
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

/**
 * Create a new {@link CanvasRenderingContext2D|context} object for the given {@link HTMLCanvasElement|canvas}
 * and set the transform to the {@link https://www.w3.org/TR/2dcontext/#transformations|identity transform}.
 *
 * @public
 * @function getNewContext
 * @memberof Drawing
 *
 * @param {HTMLCanvasElement} canvas - Canvas you would like the context for
 * @returns {CanvasRenderingContext2D} - The provided canvas's 2d context
 */
function getNewContext(canvas) {
  const context = canvas.getContext('2d');

  context.setTransform(1, 0, 0, 1, 0, 0);

  return context;
}

/**
 * This function manages the {@link https://www.w3.org/TR/2dcontext/#the-canvas-state|save/restore}
 * pattern for working in a new context state stack. The parameter `fn` is passed the `context` and can
 * execute any API calls in a clean stack.
 * @public
 * @method draw
 * @memberof Drawing
 *
 * @param {CanvasRenderingContext2D} context - Target Canvas
 * @param {ContextFn} fn - A function which performs drawing operations within the given context.
 * @returns {undefined}
 */
function draw(context, fn) {
  context.save();
  fn(context);
  context.restore();
}
