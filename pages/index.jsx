import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import request from 'superagent';

export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.url = 'http://localhost:3000/api/upload';
    this.state = {
      filesToBeSent: {},
    };
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let filesToBeSent = this.state.filesToBeSent;
    filesToBeSent = acceptedFiles;
    this.setState({ filesToBeSent });
  }

  handleClick(event) {
    if(this.state.filesToBeSent.length > 0) {
      const file = this.state.filesToBeSent[0];
      const uploadRequest = request.post(this.url);
      uploadRequest.attach(file.name, file);
      uploadRequest.end((err, res) => {
        if(err) {
          console.log('error uploading file', file);
        } else {
          alert('File upload completed!');
        }
      });
    } else {
      alert('You need to select some file first!');
    }
  }

  render() {
    const style = {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      margin: 0,
      color: blue500,
      padding:0,
      flexDirection:'column'
    };

    const styleButton = {
      margin:'25px',
      textAlign:'center'

    }

    return (
      <Fragment>
        <div style={style}>
        <Dropzone onDrop={files => this.onDrop(files)}>
          <div style={style}>
            {
              this.state.filesToBeSent[0] ? this.state.filesToBeSent[0].name : 'Drag or click to upload file'
            }
          </div>
        </Dropzone>
        <MuiThemeProvider>
          <RaisedButton label="Upload file" style={styleButton} primary onClick={event => this.handleClick(event)} />
        </MuiThemeProvider>
        </div>
      </Fragment>
    );
  }
}
