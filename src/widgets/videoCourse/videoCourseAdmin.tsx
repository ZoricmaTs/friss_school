import {Form, Formik} from 'formik';
import {Input} from '../input';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import * as Yup from 'yup';
import {useState} from 'react';
import './style.scss';

const schema = Yup.object({
  videoCourseText: Yup.string().required('Введите текст для видео-курса'),
  videoCourseNote: Yup.string().required('Введите примечание для видео-курса'),
});

export function VideoCourseAdmin() {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const availableToEdit = dynamicStore.videoCourse.text.length > 0 || dynamicStore.videoCourse.note.length > 0;

  if (dynamicStore.videoCourse.text.length === 0 && dynamicStore.videoCourse.note.length === 0 && !adding && isEditing) {
    return <Formik
      onSubmit={(values, formikHelpers) => {
        dynamicStore.patchData(stateDraft => {
          stateDraft.videoCourse.text = values.videoCourseText;
          stateDraft.videoCourse.note = values.videoCourseNote;
        })

        dynamicStore.saveData().catch(null);
        formikHelpers.resetForm();
        setAdding(true);
        setIsEditing(false);
      }}
      initialValues={{
        'videoCourseText': '',
        'videoCourseNote': '',
      }}
      validationSchema={schema}
    >
      {(props) => {
        return <Form className={'course-admin__form'}>
          <h3 style={{marginBottom: '1rem'}}>{'Добавить текст по видео курсу'}</h3>
          <Input
            label={'Описание'}
            type={'textarea'}
            name={'videoCourseText'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            label={'Примечание'}
            type={'textarea'}
            name={'videoCourseNote'}
            errors={props.errors}
            touched={props.touched}
          />
          <button
            className={'btn btn__full btn__small'}
            type={'submit'}
          >
            <small>{'Сохранить'}</small>
          </button>
        </Form>
      }}
    </Formik>;
  }

  if (!isEditing) {
    return <div className={'video-course-admin'}>
      {
        availableToEdit
        ? <>
            <h4>{'Описание'}</h4>
            <p className={'video-course-admin__text'}>{dynamicStore.videoCourse.text}</p>
            <h4 style={{marginTop: '1rem'}}>{'Примечание'}</h4>
            <p className={'video-course-admin__text'}>{dynamicStore.videoCourse.note}</p>
          </>
        : <p>{'Блок видео-курса не заполнен.'}</p>
      }

      <div className={'video-course-admin__btns'}>
        {availableToEdit && <button
            className={'btn btn__full btn__small'}
            onClick={() => setIsEditing(true)}
          >
            <small>{'Редактировать'}</small>
          </button>
        }

        {availableToEdit && !isEditing
          ?  <button
              className={'btn btn__transparent btn__small'}
              onClick={event => {
                event.preventDefault();
                dynamicStore.patchData(stateDraft => {
                  stateDraft.videoCourse = { text: '', note: '' };
                });

                dynamicStore.saveData().catch(null);
              }}>
              <small>{'Удалить'}</small>
            </button>
          :  <button
              className={'btn btn__transparent btn__small'}
              onClick={event => {
                event.preventDefault();
                dynamicStore.patchData(stateDraft => {
                  stateDraft.videoCourse = { text: '', note: '' };
                });

                dynamicStore.saveData().catch(null);
                setIsEditing(true);
              }}>
              <small>{'Добавить блок'}</small>
            </button>
        }

      </div>

    </div>;
  }

  return <Formik
    initialValues={{
      videoCourseText: dynamicStore.videoCourse.text,
      videoCourseNote: dynamicStore.videoCourse.note,
  }}
    validationSchema={schema}
    onSubmit={
      function(values): void {
        dynamicStore.patchData((stateDraft) => {
          stateDraft.videoCourse.text = values.videoCourseText;
          stateDraft.videoCourse.note = values.videoCourseNote;
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
        <Input
          label={'Примечание'}
          type={'textarea'}
          name={'videoCourseNote'}
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