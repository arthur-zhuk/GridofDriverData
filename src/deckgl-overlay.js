import React, {Component} from 'react';

import DeckGL, {ScreenGridLayer} from 'deck.gl';

class DeckGLOverlay extends Component {
  static get defaultViewport() {
    return {
      longitude: -121.943184,
      latitude: 37.4926685,
      zoom: 17,
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
