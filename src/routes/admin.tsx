import { createFileRoute } from '@tanstack/react-router'
import FastDropImage from '../widgets/fastDropImage';
import {useState} from 'react';
import {useDynamicStoreStore} from '../providers/dynamicStore.ts';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const dynamicStore = useDynamicStoreStore();
  const [imageId, setImageId] = useState<string | undefined>();

  return <div>
    <p>Hello "/admin"!</p>

    <button onClick={() => {
      dynamicStore.saveData().catch(null);
    }}>
      save data to json
    </button>

    <input onInput={e => {
      dynamicStore.patchData((stateDraft) => {
        stateDraft.header.title = (e.target as HTMLInputElement).value;
      })
    }} value={dynamicStore.header.title}/>

    <FastDropImage
      onImageChange={imageId => setImageId(imageId)}
      selectedImageId={imageId}
    />
  </div>
}
