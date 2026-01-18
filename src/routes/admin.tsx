import { createFileRoute } from '@tanstack/react-router'
import FastDropImage from '../widgets/fastDropImage';
import {useState} from 'react';
import {CoursesAdmin} from '../widgets/coursesAdmin';
import {VideoAdmin} from '../widgets/video/videoAdmin.tsx';
import {Separator} from '../widgets/separator';
import {ReviewsAdmin} from '../widgets/carousel/reviewsAdmin.tsx';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})


function RouteComponent() {
  const [imageId, setImageId] = useState<string | undefined>();


  // const onSubmit = () => {
  //   dynamicStore.saveData().catch(null);
  // }



  return <div style={{minHeight: '100vh',   width: '100%', padding: '0 2.5rem', maxWidth: '1440px', margin: '0 auto'}}>
    <VideoAdmin/>
    <FastDropImage
      onImageChange={imageId => setImageId(imageId)}
      selectedImageId={imageId}
    />

    <hr style={{margin: '5rem 0'}} />
    <Separator title={'Оффлайн курсы'}/>
    <CoursesAdmin/>
    <Separator title={'Отзывы'}/>
    <ReviewsAdmin/>
  </div>
}
