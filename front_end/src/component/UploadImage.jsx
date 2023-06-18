import React, { Component } from 'react';
import axios from 'axios';

class UploadImage extends Component {
    constructor(props){
        super(props)
            this.state={
                image:""
            }
        
    }

    handleChange=(e)=>{
        this.setState({
            image: e.target.files[0]
        });
    }
    submitForm=(e)=>{
        e.preventDefault();
        const url="http://localhost:8000/api/upload";
        const data = new FormData();
        data.append('image', this.state.image);
          //axios

          axios.post(url, data).then(res=>{
            console.log(res);
          })
    }

  
    render() {
        return (
            <div className='container mt-4' >
                <div className='row justify-content-center'>
                    <div className='col-sm-4'>
                        <div className='card p-4'>
                            Images upload form
                            <form>
                                <input type="file" className='form-control' onChange={this.handleChange} />
                                <button className='btn btn-success nt-3' type="submit">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default UploadImage;