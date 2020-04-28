import csTools from 'cornerstone-tools';
const getNewContext = csTools.importInternal('drawing/getNewContext');
const draw = csTools.importInternal('drawing/draw');
const drawHandles = csTools.importInternal('drawing/drawHandles');
const drawTextBox = csTools.importInternal('drawing/drawTextBox');
const throttle = csTools.importInternal('util/throttle');
const cursors = csTools.importInternal('tools/cursors');
const BaseAnnotationTool = csTools.importInternal('base/BaseAnnotationTool');
const triggerEvent = csTools.importInternal('util/triggerEvent');

/**
 * @public
 * @class LandmarkTool
 * @memberof Tools.Annotation
 * @classdesc Tool which provides a probe of the image data at the
 * desired position and has a callback to display a popup
 * @extends csTools.BaseAnnotationTool
 */
export default class LandmarkTool extends BaseAnnotationTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'Landmark',
      supportedInteractionTypes: ['Mouse', 'Touch'],
      svgCursor: cursors.probeCursor,
      configuration: {
        drawHandles: true,
        handleRadius: 1,
      },
    };
    super(defaultProps, props);

    this.throttledUpdateCachedStats = throttle(this.updateCachedStats, 110);
  }

  createNewMeasurement(eventData) {
    const goodEventData =
      eventData && eventData.currentPoints && eventData.currentPoints.image;

    if (!goodEventData) {
      logger.error(
        `required eventData not supplied to tool ${this.name}'s createNewMeasurement`
      );

      return;
    }

    const measurementData = {
      visible: true,
      active: true,
      color: undefined,
      invalidated: true,
      handles: {
        end: {
          x: eventData.currentPoints.image.x,
          y: eventData.currentPoints.image.y,
          highlight: true,
          active: true,
        },
      },
      aiViewerVersion: process.env.VERSION_NUMBER,
    };

    csTools.addToolState(eventData.element, this.name, measurementData);
    // Allow relabelling via a callback
    this._updateTextForNearbyAnnotation(eventData);
  }

  /**
   *
   *
   * @param {*} element
   * @param {*} data
   * @param {*} coords
   * @returns {Boolean}
   */
  pointNearTool(element, data, coords) {
    const hasEndHandle = data && data.handles && data.handles.end;
    const validParameters = hasEndHandle;

    if (!validParameters) {
      logger.warn(
        `invalid parameters supplied to tool ${this.name}'s pointNearTool`
      );
    }

    if (!validParameters || data.visible === false) {
      return false;
    }

    const probeCoords = csTools.external.cornerstone.pixelToCanvas(
      element,
      data.handles.end
    );

    return (
      csTools.external.cornerstoneMath.point.distance(probeCoords, coords) < 5
    );
  }

  updateCachedStats(image, element, data) {
    data.cachedStats = {};
    data.invalidated = false;
  }

  renderToolData(evt) {
    const eventData = evt.detail;
    const { handleRadius } = this.configuration;
    const toolData = csTools.getToolState(evt.currentTarget, this.name);

    if (!toolData) {
      return;
    }

    // We have tool data for this element - iterate over each one and draw it
    const context = getNewContext(eventData.canvasContext.canvas);
    const { image, element } = eventData;

    for (let i = 0; i < toolData.data.length; i++) {
      const data = toolData.data[i];

      if (data.visible === false) {
        continue;
      }

      draw(context, context => {
        const color = csTools.toolColors.getColorIfActive(data);

        if (this.configuration.drawHandles) {
          // Draw the handles
          drawHandles(context, eventData, data.handles, {
            handleRadius,
            color,
          });
        }

        // Update textbox stats
        if (data.invalidated === true) {
          if (data.cachedStats) {
            this.throttledUpdateCachedStats(image, element, data);
          } else {
            this.updateCachedStats(image, element, data);
          }
        }

        // Coords for text
        const coords = {
          // Translate the x/y away from the cursor
          x: data.handles.end.x + 3,
          y: data.handles.end.y - 3,
        };
        const textCoords = csTools.external.cornerstone.pixelToCanvas(
          eventData.element,
          coords
        );

        const text =
          data.annotation !== undefined
            ? data.measurementNumber + '-' + data.annotation.label.charAt(0)
            : '';

        drawTextBox(context, text, textCoords.x, textCoords.y, color);
      });
    }
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

      if (this.pointNearTool(element, data, coords)) {
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
}
