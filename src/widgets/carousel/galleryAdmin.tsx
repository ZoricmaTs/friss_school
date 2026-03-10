import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import './style.scss';
import FastDropImage from '../fastDropImage';
import {useState} from 'react';
import {XCircleIcon} from '@phosphor-icons/react';

export function GalleryAdmin() {
  const dynamicStore = useDynamicStoreStore();
  const [imageId, setImageId] = useState<string | undefined>();

  return <div className={'gallery'}>
    <div>
      <FastDropImage
        onImageChange={imageId => setImageId(imageId)}
        selectedImageId={imageId}
      />
      <button
        className={'btn btn__full btn__small'}
        type="button"
        disabled={!imageId}
        style={{marginTop: '1rem', marginBottom: '2rem'}}
        onClick={() => {
          dynamicStore.patchData(stateDraft => {
            stateDraft.galleryImages.push(imageId!);
          });

          dynamicStore.saveData().catch(null);

          setImageId(undefined);
        }}
      >
        <small>{'Добавить фото'}</small>
      </button>
    </div>
    <div className={'gallery__wrapper'}>
      {dynamicStore.galleryImages.map((image) => {
        return <div
          className={'gallery__image-wrapper'}
          key={image}
        >
          <button
            className={'gallery__image-delete-btn'}
            style={{}} type="button" onClick={() => {
            dynamicStore.patchData(stateDraft => {
              stateDraft.galleryImages = stateDraft.galleryImages.filter(img => img !== image);
            });

            dynamicStore.saveData().catch(null);
          }}>
            <XCircleIcon size={64} weight="fill" />
          </button>
          <img className={'gallery__image'} src={`/dynamic/images/${image}`} alt={'image of gallery'} />
        </div>
      })}
    </div>
  </div>;
}