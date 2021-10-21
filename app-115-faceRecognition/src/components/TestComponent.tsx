
import {useRef, useState} from 'react';
import Webcam from 'react-webcam';


const TestComponent = () => {

  const [imgSrc, setImgSrc] = useState(null);
  const webCamRef = useRef<any>(null);

  const onCaptureHandler = () => {
    setImgSrc(webCamRef.current?.getScreenshot());
    console.log(imgSrc);
  };

  return (
    <div style={{width: '100%'}}>
      <h1
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'red',
          fontWeight: 'bold',
        }}
      >
        機械学習
      </h1>

      <div style={{width: '300px', margin: '0px auto', overflow: 'hidden'}}>
        <Webcam
          ref={webCamRef}
          style={{margin: '0px auto'}}
          screenshotFormat="image/jpeg"
          width="300px"
        />
        <button onClick={onCaptureHandler}>画像を取得</button>
        {imgSrc && (
          <img
            src={imgSrc}
            alt="hello"
          />
        )}
      </div>

    </div>
  );
};

export default TestComponent;
