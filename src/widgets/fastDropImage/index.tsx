import {useDropzone} from 'react-dropzone'
import {useCallback, useState} from 'react';
import {SpinnerIcon, UploadSimpleIcon, WarningCircleIcon} from '@phosphor-icons/react';

export type FastDropImageProps = {
  selectedImageId?: string; onImageChange?: (imageId: string) => void;
}

export default function FastDropImage(props: FastDropImageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('http://localhost:3000/add-image', {
        method: 'POST', body: formData,
      });

      setIsLoading(false);

      const data = await res.json();
      props.onImageChange?.(data.filename);
    } catch (err: unknown) {
      setError(err);
      setIsLoading(false);
    }

  }, [props]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  // eslint-disable-next-line react-hooks/purity
  const timestamp = Date.now();

  return (<div style={{
    position: 'relative',
    width: 200,
    height: 200,
    // borderRadius: 12,
    backgroundColor: '#DCDCDC80',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
  }} {...getRootProps()}>
    <input {...getInputProps()}/>
    {!error && !isLoading && <UploadSimpleIcon size={50} fill={'#A97AB7'}/>}
    {isLoading && <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <SpinnerIcon fill={'#A97AB7'} size={50}/></div>}
    {!!props.selectedImageId &&
      <img src={`/dynamic/images/${props.selectedImageId}?${timestamp}`} alt={'Image preview'} style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%',
      }}
      />}
    {isDragActive &&
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}/>}
    {!!error && <div title={error.toString()}
                     style={{
                       position: 'absolute',
                       top: 0,
                       left: 0,
                       right: 0,
                       bottom: 0,
                       backgroundColor: 'rgba(255,0,0,0.5)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       overflow: 'hidden',
                     }}>
      <WarningCircleIcon fill={'red'} size={50}/>

    </div>}
  </div>);
}