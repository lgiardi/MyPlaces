import React from 'react'

const readFileAsDataURL = (file) =>
  new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result)
    }

    reader.readAsDataURL(file)
  })

const resizeImage = (imageURL, canvas, maxHeight) =>
  new Promise(res => {
    const image = new Image()

    image.onload = () => {
      const context = canvas.getContext('2d')

      if (image.height > maxHeight) {
        image.width *= maxHeight / image.height
        image.height = maxHeight
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = image.width
      canvas.height = image.height

      context.drawImage(image, 0, 0, image.width, image.height)

      res(canvas.toDataURL('image/jpeg'))
    }

    image.src = imageURL
  })


class ImageIn extends React.Component {

  state = {
    value: ''
  }

  handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file && file.type.match(/^image\//)) {
      readFileAsDataURL(file).then(originalURL => {
        resizeImage(originalURL, this.canvas, this.props.maxHeight).then(url => {
          this.setState({ value: url })
        })
      })
    } else {
      this.setState({ value: '' })
    }
  }

  handleCleanForm = () => {
    this.setState({ value: '' })
  }

  componentDidMount() {
    this.canvas = document.createElement('canvas')
    this.fileInput.form.addEventListener('reset', this.handleCleanForm)
  }

  componentWillUnmount() {
    this.fileInput.form.removeEventListener('reset', this.handleCleanForm)
  }

  render() {
    const { className, name } = this.props
    const { value } = this.state

    const style = {
      position: 'relative'
    }

    if (value) {
      style.backgroundImage = `url("${value}")`
      style.backgroundPosition = 'center'
      style.backgroundSize = 'cover'
    }

    return (
      <div className={className} style={style}>
        <input type="hidden" name={name} value={value} />
        <input
          ref={node => this.fileInput = node}
          type="file"
          onChange={this.handleFileChange}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0
          }}
        />
      </div>
    )
  }
}

export default ImageIn
