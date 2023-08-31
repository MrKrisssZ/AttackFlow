import React, { Component } from 'react';

const FileUpload = () => {
    return (
        <>
            <div>
                <form>
                    <h3>Incident Report Upload</h3>
                    <div>
                        <input type='file' />
                    </div>
                    <div>
                        <button className='btn btn-submit' type='submit'>Upload</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FileUpload