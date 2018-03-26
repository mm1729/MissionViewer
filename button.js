function createEl (tagName, className, container) {
    const el = window.document.createElement(tagName)
    if (className) el.className = className
    if (container) container.appendChild(el)
    return el
  }
  
  function Toggle (contents, contentColors, mapDraw) {
    if (!(this instanceof Toggle)) return new Toggle(el, contents)
    this._map = null // mapbox-gl Map
    this._mapContainer = null // HTMLElement
    this._className = 'mapboxgl-ctrl' // string
    this._contents = contents || []
    this._contentColors = contentColors || []
    this._mapDraw = mapDraw
    this._contentIdx = 0
    this._container = null // HTMLelement
    this._toggleButton = null // HTMLElement
    this.toggle = this.toggle.bind(this)
  }
  
  Toggle.prototype.onAdd = function (map) {
    this._map = map
    this._mapContainer = this._map.getContainer()
    this._container = createEl('div', `${this._className} mapboxgl-ctrl-group`)
    const button = this._toggleButton = createEl('button', (`${this._className}-icon ${this._className}-toggle`), this._container)
    button.innerHTML = this._contents[this._contentIdx]
    this.changeLineColor(this._contentColors[this._contentIdx])
    button.type = 'button'
    this._toggleButton.addEventListener('click', this.toggle)
    return this._container
  }
  
  Toggle.prototype.onRemove = function () {
    var node = this._container
    if (node.parentNode) {
       node.parentNode.removeChild(node);
    }
    this._map = null
  }
  
  Toggle.prototype.toggle = function () {
    const button = this._toggleButton
    let nextIdx = (this._contentIdx == this._contents.length - 1) ? 0 : this._contentIdx + 1
    button.innerHTML = this._contents[nextIdx]
    this._contentIdx = nextIdx
    this.changeLineColor(this._contentColors[this._contentIdx])
  }

  Toggle.prototype.changeLineColor = function(color) {
    var lineStyleFilter = function(value) {
        return (value.id === 'gl-draw-line-active.cold') ?
            true : false;
    }
    var styles = draw.options.styles;
    var lineStyleIdx = styles.findIndex(lineStyleFilter)
    
    
    console.log(lineStyleIdx)
    console.log(styles[lineStyleIdx])
    draw.options.styles[lineStyleIdx].paint['line-color'] = color;
  }
  
  module.exports = Toggle