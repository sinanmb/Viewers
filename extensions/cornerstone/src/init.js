import OHIF from '@ohif/core';
import { SimpleDialog, LandmarkDialog } from '@ohif/ui';
// TODO Sinan: Use alias and relative path
import { ContextMenuDialog } from '../../../platform/viewer/src/connectedComponents/ContextMenuDialog';
import cornerstone from 'cornerstone-core';
import csTools from 'cornerstone-tools';
import merge from 'lodash.merge';
import initCornerstoneTools from './initCornerstoneTools.js';
import measurementServiceMappingsFactory from './utils/measurementServiceMappings/measurementServiceMappingsFactory';
import LandmarkTool from './landmarkTool';
import enableReferenceLines from './enableReferenceLines';

let isShiftKeyDown = false;

/**
 *
 * @param {Object} servicesManager
 * @param {Object} configuration
 * @param {Object|Array} configuration.csToolsConfig
 */
export default function init({ servicesManager, configuration }) {
  const { UIDialogService, MeasurementService } = servicesManager.services;

  const callInputDialog = (data, event, callback) => {
    if (UIDialogService) {
      let dialogId = UIDialogService.create({
        centralize: true,
        isDraggable: false,
        content: SimpleDialog.InputDialog,
        useLastPosition: false,
        showOverlay: true,
        contentProps: {
          title: 'Enter your annotation',
          label: 'New label',
          measurementData: data ? { description: data.text } : {},
          onClose: () => UIDialogService.dismiss({ id: dialogId }),
          onSubmit: value => {
            callback(value);
            UIDialogService.dismiss({ id: dialogId });
          },
        },
      });
    }
  };

  const callInputDialogLandmark = (data, event, callback) => {
    if (UIDialogService) {
      const { x, y } = _calculateModalCoordinates(event, 304, 508);

      let dialogId = UIDialogService.create({
        defaultPosition: { x, y },
        isDraggable: false,
        content: LandmarkDialog,
        showOverlay: true,
        contentProps: {
          title: 'Enter your annotation',
          measurementData: data ? data : {},
          onClose: () => UIDialogService.dismiss({ id: dialogId }),
          onSubmit: (data, deleteTool = false) => {
            // If change happens here, also update index.js in measurementPanel appExtension
            if (data) {
              data.version = 1.0;
              data.reviewedBy = window.store.getState().oidc.user.profile.email;
            }
            callback(data, deleteTool);
            UIDialogService.dismiss({ id: dialogId });
          },
        },
      });
    }
  };

  // TODO Sinan: Move this to it's own appExtension
  const callInputDialogContextMenu = event => {
    if (UIDialogService) {
      const { x, y } = _calculateModalCoordinates(event, 304, 230);

      let dialogId = UIDialogService.create({
        defaultPosition: { x, y },
        isDraggable: false,
        content: ContextMenuDialog,
        showOverlay: true,
        contentProps: {
          title: 'Menu',
          onClose: () => UIDialogService.dismiss({ id: dialogId }),
        },
      });
    }
  };

  document.addEventListener('keydown', function(e) {
    isShiftKeyDown = e.shiftKey;
  });

  document.addEventListener('keyup', function(e) {
    isShiftKeyDown = e.shiftKey;
  });

  document.addEventListener('contextmenu', function(e) {
    if (isShiftKeyDown) {
      e.stopPropagation();
      callInputDialogContextMenu(e);
    }
  });

  const { csToolsConfig } = configuration;
  const metadataProvider = OHIF.cornerstone.metadataProvider;

  cornerstone.metaData.addProvider(
    metadataProvider.get.bind(metadataProvider),
    9999
  );

  // ~~
  const defaultCsToolsConfig = csToolsConfig || {
    globalToolSyncEnabled: true,
    showSVGCursors: true,
    autoResizeViewports: false,
  };

  initCornerstoneTools(defaultCsToolsConfig);

  const toolsGroupedByType = {
    touch: [csTools.PanMultiTouchTool, csTools.ZoomTouchPinchTool],
    annotations: [
      csTools.ArrowAnnotateTool,
      csTools.BidirectionalTool,
      csTools.LengthTool,
      csTools.AngleTool,
      csTools.FreehandRoiTool,
      csTools.EllipticalRoiTool,
      csTools.DragProbeTool,
      csTools.RectangleRoiTool,
      csTools.ProbeTool,
      LandmarkTool,
    ],
    other: [
      csTools.PanTool,
      csTools.ZoomTool,
      csTools.WwwcTool,
      csTools.WwwcRegionTool,
      csTools.MagnifyTool,
      csTools.StackScrollTool,
      csTools.StackScrollMouseWheelTool,
      csTools.OverlayTool,
    ],
  };

  let tools = [];
  Object.keys(toolsGroupedByType).forEach(toolsGroup =>
    tools.push(...toolsGroupedByType[toolsGroup])
  );

  /* Measurement Service */
  _connectToolsToMeasurementService(MeasurementService);

  enableReferenceLines();

  /* Add extension tools configuration here. */
  const internalToolsConfig = {
    ArrowAnnotate: {
      configuration: {
        getTextCallback: (callback, eventDetails) =>
          callInputDialog(null, eventDetails, callback),
        changeTextCallback: (data, eventDetails, callback) =>
          callInputDialog(data, eventDetails, callback),
      },
    },
    Landmark: {
      configuration: {
        getTextCallback: (callback, eventDetails) =>
          callInputDialogLandmark(null, eventDetails, callback),
        changeTextCallback: (data, eventDetails, callback) =>
          callInputDialogLandmark(data, eventDetails, callback),
      },
    },
  };

  /* Abstract tools configuration using extension configuration. */
  const parseToolProps = (props, tool) => {
    const { annotations } = toolsGroupedByType;
    // An alternative approach would be to remove the `drawHandlesOnHover` config
    // from the supported configuration properties in `cornerstone-tools`
    const toolsWithHideableHandles = annotations.filter(
      tool => !['RectangleRoiTool', 'EllipticalRoiTool'].includes(tool.name)
    );

    let parsedProps = { ...props };

    /**
     * drawHandles - Never/Always show handles
     * drawHandlesOnHover - Only show handles on handle hover (pointNearHandle)
     *
     * Does not apply to tools where handles aren't placed in predictable
     * locations.
     */
    if (
      configuration.hideHandles !== false &&
      toolsWithHideableHandles.includes(tool)
    ) {
      if (props.configuration) {
        parsedProps.configuration.drawHandlesOnHover = true;
      } else {
        parsedProps.configuration = { drawHandlesOnHover: true };
      }
    }

    return parsedProps;
  };

  /* Add tools with its custom props through extension configuration. */
  tools.forEach(tool => {
    const toolName = tool.name.replace('Tool', '');
    const externalToolsConfig = configuration.tools || {};
    const externalToolProps = externalToolsConfig[toolName] || {};
    const internalToolProps = internalToolsConfig[toolName] || {};
    const props = merge(
      internalToolProps,
      parseToolProps(externalToolProps, tool)
    );
    csTools.addTool(tool, props);
  });

  // TODO -> We need a better way to do this with maybe global tool state setting all tools passive.
  const BaseAnnotationTool = csTools.importInternal('base/BaseAnnotationTool');
  tools.forEach(tool => {
    if (tool.prototype instanceof BaseAnnotationTool) {
      // BaseAnnotationTool would likely come from csTools lib exports
      const toolName = new tool().name;
      csTools.setToolPassive(toolName); // there may be a better place to determine name; may not be on uninstantiated class
    }
  });

  csTools.setToolActive('Pan', { mouseButtonMask: 4 });
  csTools.setToolActive('Wwwc', { mouseButtonMask: 2 });
  csTools.setToolActive('Landmark', { mouseButtonMask: 1 });
  csTools.setToolActive('StackScrollMouseWheel', {}); // TODO: Empty options should not be required
  csTools.setToolActive('PanMultiTouch', { pointers: 2 }); // TODO: Better error if no options
  csTools.setToolActive('ZoomTouchPinch', {});
  csTools.setToolEnabled('Overlay', {});
}

const _calculateModalCoordinates = (event, modalWidth, modalHeight) => {
  let x = event.x + 10;
  let y = event.y + 10;

  const { innerWidth, innerHeight } = event.view;

  if (x > innerWidth / 2) {
    x -= modalWidth + 20;
  }
  if (y > innerHeight - modalHeight) {
    y -= modalHeight + 20;
  }
  return { x, y };
};

const _initMeasurementService = measurementService => {
  /* Initialization */
  const { toAnnotation, toMeasurement } = measurementServiceMappingsFactory(
    measurementService
  );
  const csToolsVer4MeasurementSource = measurementService.createSource(
    'CornerstoneTools',
    '4'
  );

  /* Matching Criterias */
  const matchingCriteria = {
    valueType: measurementService.VALUE_TYPES.POLYLINE,
    points: 2,
  };

  /* Mappings */
  measurementService.addMapping(
    csToolsVer4MeasurementSource,
    'Length',
    matchingCriteria,
    toAnnotation,
    toMeasurement
  );

  return csToolsVer4MeasurementSource;
};

const _connectToolsToMeasurementService = measurementService => {
  const csToolsVer4MeasurementSource = _initMeasurementService(
    measurementService
  );
  const {
    id: sourceId,
    addOrUpdate,
    getAnnotation,
  } = csToolsVer4MeasurementSource;

  /* Measurement Service Events */
  cornerstone.events.addEventListener(
    cornerstone.EVENTS.ELEMENT_ENABLED,
    event => {
      const {
        MEASUREMENT_ADDED,
        MEASUREMENT_UPDATED,
      } = measurementService.EVENTS;

      measurementService.subscribe(
        MEASUREMENT_ADDED,
        ({ source, measurement }) => {
          if (![sourceId].includes(source.id)) {
            const annotation = getAnnotation('Length', measurement.id);

            console.log(
              'Measurement Service [Cornerstone]: Measurement added',
              measurement
            );
            console.log('Mapped annotation:', annotation);
          }
        }
      );

      measurementService.subscribe(
        MEASUREMENT_UPDATED,
        ({ source, measurement }) => {
          if (![sourceId].includes(source.id)) {
            const annotation = getAnnotation('Length', measurement.id);

            console.log(
              'Measurement Service [Cornerstone]: Measurement updated',
              measurement
            );
            console.log('Mapped annotation:', annotation);
          }
        }
      );

      const addOrUpdateMeasurement = csToolsAnnotation => {
        try {
          const { toolName, toolType, measurementData } = csToolsAnnotation;
          const csTool = toolName || measurementData.toolType || toolType;
          csToolsAnnotation.id = measurementData._measurementServiceId;
          const measurementServiceId = addOrUpdate(csTool, csToolsAnnotation);

          if (!measurementData._measurementServiceId) {
            addMeasurementServiceId(measurementServiceId, csToolsAnnotation);
          }
        } catch (error) {
          console.warn('Failed to add or update measurement:', error);
        }
      };

      const addMeasurementServiceId = (id, csToolsAnnotation) => {
        const { measurementData } = csToolsAnnotation;
        Object.assign(measurementData, { _measurementServiceId: id });
      };

      [
        csTools.EVENTS.MEASUREMENT_ADDED,
        csTools.EVENTS.MEASUREMENT_MODIFIED,
      ].forEach(csToolsEvtName => {
        event.detail.element.addEventListener(
          csToolsEvtName,
          ({ detail: csToolsAnnotation }) => {
            console.log(`Cornerstone Element Event: ${csToolsEvtName}`);
            addOrUpdateMeasurement(csToolsAnnotation);
          }
        );
      });
    }
  );
};
