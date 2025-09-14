import React, { useRef, useState } from 'react'
import bg from "../assets/dp.jpeg"
// import pic from "../assets/shubham-square.png"
import './dp.css'

const paper = {
    height: 400,
    width: 400,
    margin: '30px auto',
    background: `url(${bg})`,
    backgroundSize: 'cover',
    position: 'relative'
}

const title = {
    position: 'absolute',
    top: 335,
    left: '50%',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'red',
    transform: 'translateX(-50%)',
    borderRadius: '50%'
}

const subTitle = {
    position: 'absolute',
    top: 350,
    left: '50%',
    textAlign: 'center',
    fontSize: 8,
    color: 'red',
    transform: 'translateX(-50%)',
    borderRadius: '50%'
}


const Dp = () => {
    const [name, setName] = useState("")
    const [designation, setDesignation] = useState("")
    const [src, setSrc] = useState("")
    const ref = useRef()

    const changeImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSrc(URL.createObjectURL(file))
        }
    }

    const photo = {
        height: 125,
        width: 125,
        background: `url(${src}) #fff no-repeat center`,
        backgroundSize: '100%',
        position: 'absolute',
        top: 200,
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '50%'
    }

    const download = () => {

        html2canvas(ref.current).then(canvas => {
            // Convert canvas to image data URL
            const imageData = canvas.toDataURL("image/png");

            // Create a download link
            const link = document.createElement("a");
            link.href = imageData;
            link.download = "div-image.png";

            // Trigger download
            link.click();
        });
    }

    return (
        <>
            <div style={paper} ref={ref}>
                <div className='photo' style={photo}></div>
                <p style={title}>{name}</p>
                <span style={subTitle}>{designation}</span>
            </div>
            <div className="inputs">
                <input type="file" placeholder='Photo *' onChange={changeImage} />
                <input type="text" placeholder='Name *' value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder='Title *' value={designation} onChange={e => setDesignation(e.target.value)} />
                <input type="button" value="Download" onClick={download} />
            </div>
        </>
    )
}

export default Dp
