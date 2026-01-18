import { createFileRoute } from '@tanstack/react-router'
import FastDropImage from '../widgets/fastDropImage';
import {useState} from 'react';
import {CoursesAdmin} from '../widgets/coursesAdmin';
import {VideoAdmin} from '../widgets/video/videoAdmin.tsx';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})


function RouteComponent() {
  const [imageId, setImageId] = useState<string | undefined>();


  // const onSubmit = () => {
  //   dynamicStore.saveData().catch(null);
  // }



  return <div style={{minHeight: '100vh'}}>
    <VideoAdmin/>
    <FastDropImage
      onImageChange={imageId => setImageId(imageId)}
      selectedImageId={imageId}
    />

    <hr style={{margin: '5rem 0'}} />
    <CoursesAdmin/>
  </div>
}
