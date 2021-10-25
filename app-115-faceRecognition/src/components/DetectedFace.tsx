import {DetectFacesCommandOutput} from '@aws-sdk/client-rekognition';


const DetectedFace = (props : {faceData: DetectFacesCommandOutput}) => {
  const {faceData} = props;
  const {FaceDetails} = faceData;

  const mainFace = FaceDetails ? FaceDetails[0] : null;

  if (!mainFace) return <div>顔が認識出来ませんでした。</div>;

  const {AgeRange, Emotions} = mainFace;

  const age = AgeRange?.High?.toString();
  const emotion = Emotions ? `${Emotions[0].Type}な顔してますね。` : '';


  const caption = `あなたは多分${age}歳ぐらいでしょう。${emotion}`;
  return (<div>{caption}</div>);
};

export default DetectedFace;