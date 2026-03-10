import {Form, Formik} from 'formik';
import {Input} from '../input';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import * as Yup from 'yup';
import {useState} from 'react';
import './style.scss';

const schema = Yup.object({
  videoTitle: Yup.string().required('Введите заголовок для видео-блока'),
  videoText: Yup.string().required('Введите описание для видео-блока'),
});

export function VideoAdmin() {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <div className={'video-admin'}>
      <h4>{'Заголовок'}</h4>
      <p className={'video-admin__text'}>{dynamicStore.header.title}</p>
      <h4 style={{marginTop: '2rem'}}>{'Описание'}</h4>
      <p className={'video-admin__text'}>{dynamicStore.header.description}</p>
      <button
        className={'btn btn__full btn__small'}
        onClick={() => setIsEditing(true)}
        style={{marginTop: '1.5rem'}}
      >
        <small>{'Редактировать'}</small>
      </button>
    </div>;
  }

  return <Formik
    initialValues={{videoTitle: dynamicStore.header.title, videoText: dynamicStore.header.description}}
    validationSchema={schema}
    onSubmit={
      function(values): void {
        dynamicStore.patchData((stateDraft) => {
          stateDraft.header.title = values.videoTitle;
          stateDraft.header.description = values.videoText;
        })

        dynamicStore.saveData().catch(null);
        setIsEditing(false);
      }
    }
  >
    {(formik) => (
      <Form>
        <Input
          label={'Заголовок'}
          type={'text'}
          name={'videoTitle'}
          errors={formik.errors}
          touched={formik.touched}
        />
        <Input
          label={'Описание'}
          type={'textarea'}
          name={'videoText'}
          errors={formik.errors}
          touched={formik.touched}
        />
        <button
          className={'btn btn__full btn__small'}
          style={{ margin: '1rem 0'}}
          type="submit"
        >
          <small>{'Сохранить изменения'}</small>
        </button>
        <button
          type="button"
          className={'btn btn__transparent btn__small'}
          onClick={() => {
            formik.resetForm();
            setIsEditing(false);
          }}
          style={{marginLeft: '1rem'}}
        >
          <small>{'Отмена'}</small>
        </button>
      </Form>
    )}
  </Formik>

}