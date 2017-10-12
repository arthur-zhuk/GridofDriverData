import React, {Component} from 'react';

import DeckGL, {ScreenGridLayer} from 'deck.gl';

class DeckGLOverlay extends Component {
  static get defaultViewport() {
    return {
      longitude: -122.39242219446099,
      latitude: 37.74977073928103,
      zoom: 10,
      maxZoom: 20,
      pitch: 0,
      bearing: 0,
    }
  }

  render() {
    const {viewport, cellSize, data} = this.props;
    
    if (!data) return null;
    const layer = new ScreenGridLayer({
      id: 'grid',
      data: data,
      minColor: [0,0,0,0],
      getPosition: d => d,
      cellSizePixels: cellSize,
      onHover: info => console.log('Hovered: ', info),
    });
    
    return (
      <DeckGL {...viewport} layers={[layer]} onLayerHover={this.onHover} />
    );
  }
}

export default DeckGLOverlay;
