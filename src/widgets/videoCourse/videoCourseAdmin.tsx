import {Form, Formik} from 'formik';
import {Input} from '../input';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import * as Yup from 'yup';
import {useState} from 'react';

const schema = Yup.object({
  videoCourseText: Yup.string().required('Введите текст для видео-курса'),
});

export function VideoCourseAdmin() {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <div className={'video-course-admin'}>
      <p className={'video-course-admin__text'}>{dynamicStore.videoCourseText}</p>
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
    initialValues={{videoCourseText: dynamicStore.videoCourseText}}
    validationSchema={schema}
    onSubmit={
      function(values): void {
        dynamicStore.patchData((stateDraft) => {
          stateDraft.videoCourseText = values.videoCourseText;
        })

        dynamicStore.saveData().catch(null);
        setIsEditing(false);
      }
    }
  >
    {(formik) => (
      <Form>
        <Input
          label={'Описание'}
          type={'textarea'}
          name={'videoCourseText'}
          errors={formik.errors}
          touched={formik.touched}
        />
        <button
          className={'btn btn__full btn__small'}
          style={{ margin: '1rem 0'}}
          type="submit">
          <small>{'Изменить текст'}</small>
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
  </Formik>;
}