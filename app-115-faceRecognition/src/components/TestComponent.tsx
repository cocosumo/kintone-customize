
import {useEffect, useRef, useState} from 'react';

import Webcam from 'react-webcam';
import {RekognitionClient, DetectFacesCommand, DetectLabelsCommand, DetectFacesCommandOutput} from '@aws-sdk/client-rekognition';
import convertDataURIToBinary from '../helpers/utils';
import AIResult from './DetectedLabels';
import DetectedFace from './DetectedFace';
import {accessKey, secretKey} from '../env';

const TestComponent = () => {

  const [imgSrc, setImgSrc] = useState<string | null>();
  const [result, setResult] = useState<any[] | null>(null);
  const [faceData, setFaceData] = useState<DetectFacesCommandOutput | null>(null);

  const webCamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (imgSrc) {
      const imageBytes = convertDataURIToBinary(imgSrc);
      const command = new DetectLabelsCommand({
        Image: {
          Bytes: imageBytes,
        },
        MaxLabels: 10,
        MinConfidence: 50
      });

      const detectFace = new DetectFacesCommand({
        Image: {Bytes: imageBytes},
        Attributes: ['ALL']
      });

      const client = new RekognitionClient({
        region: 'ap-northeast-1',
        credentials: {
          accessKeyId: accessKey(),
          secretAccessKey: secretKey()
        }});

      client.send(command)
        .then(data => {
          const {Labels} = data;
          if (Labels) {
            setResult(Labels);
          }
        })
        .catch(err => {
          console.log(err, 'ERROR');
        });
      client.send(detectFace).then(data => {
        if (data) {
          setFaceData(data);
        }
      })
        .catch(err => {
          console.log(err, 'ERROR');
        });
    }


  }, [imgSrc]);

  const onCaptureHandler = () => {
    setImgSrc(webCamRef.current?.getScreenshot());
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
        AIテスト
      </h1>

      <div style={{width: '300px', margin: '0px auto', overflow: 'hidden'}}>
        <Webcam
          ref={webCamRef}
          style={{margin: '0px auto'}}
          screenshotFormat="image/jpeg"
          width="300px"
        />

        {faceData && <DetectedFace faceData={faceData} />}
        {result && <AIResult labels={result} />}

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
