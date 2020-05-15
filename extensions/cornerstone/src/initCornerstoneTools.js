import Hammer from 'hammerjs';
import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';

export default function(configuration = {}) {
  // For debugging
  window.cornerstoneTools = cornerstoneTools;

  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.init(configuration);
  console.log('configuration')
  console.log(configuration)

  // Set the tool font and font size
  // context.font = "[style] [variant] [weight] [size]/[line height] [font family]";
  const fontFamily =
    'Roboto, OpenSans, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif';
  cornerstoneTools.textStyle.setFont(`16px ${fontFamily}`);

  // Tool styles/colors
  cornerstoneTools.toolStyle.setToolWidth(2);
  cornerstoneTools.toolColors.setToolColor('rgb(255, 255, 0)');

  const defaultColor = { r: 0, g: 255, b: 0 };
  const color =
    JSON.parse(localStorage.getItem('coveraViewerViewportCursorColor')) ||
    defaultColor;

  const formattedColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

  cornerstoneTools.toolColors.setActiveColor(formattedColor);
  cornerstoneTools.store.state.touchProximity = 40;

  console.log('colorLutTables');
  console.log(cornerstoneTools.store.modules.segmentation.state.colorLutTables);


  // const newArray = [[0, 255, 226, 255], [0, 255, 0, 255], [255, 255, 0, 255], [255, 0, 0, 255]].concat(cornerstoneTools.store.modules.segmentation.state.colorLutTables);

  // cornerstoneTools.store.modules.segmentation.state.colorLutTables = [[0, 255, 226, 255], [0, 255, 0, 255], [255, 255, 0, 255], [255, 0, 0, 255], ...cornerstoneTools.store.modules.segmentation.state.colorLutTables];
  cornerstoneTools.store.modules.segmentation.state.colorLutTables = [[[0, 255, 226, 255], [0, 255, 0, 255], [255, 255, 0, 255], [255, 0, 0, 255], ...cornerstoneTools.store.modules.segmentation.state.colorLutTables[0]]];

  console.log('cornerstoneTools');
  console.log(cornerstoneTools);

  // const segmentationModule = cornerstoneTools.getModule('segmentation')
  // segmentationModule.state.colorLutTables = [[0, 255, 226, 255], [0, 255, 0, 255], [255, 255, 0, 255], [255, 0, 0, 255]
  // cornerstoneTools.setModule('segmentation')

  // cornerstoneTools.getModule('segmentation').state.colorLutTables = [[0, 255, 226, 255], [0, 255, 0, 255], [255, 255, 0, 255], [255, 0, 0, 255], ...cornerstoneTools.getModule('segmentation').state.colorLutTables];

  // console.log('cornetstone tools getModule segmentation')
  // console.log(cornerstoneTools.getModule('segmentation'))
}
