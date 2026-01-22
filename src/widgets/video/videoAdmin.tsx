import {Form, Formik} from 'formik';
import {Input} from '../input';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import * as Yup from 'yup';

const schema = Yup.object({
  videoTitle: Yup.string().required('Введите заголовок для видео-блока'),
  videoText: Yup.string().required('Введите описание для видео-блока'),
});

export function VideoAdmin() {
  const dynamicStore = useDynamicStoreStore();

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
      }
    }
  >
    {({ errors, touched }) => (
      <Form>
        <Input
          label={'Заголовок'}
          type={'text'}
          name={'videoTitle'}
          errors={errors}
          touched={touched}
        />
        <Input
          label={'Описание'}
          type={'textarea'}
          name={'videoText'}
          errors={errors}
          touched={touched}
        />
        <button className={'btn btn__full'} style={{ margin: '1rem 0'}} type="submit"><p>{'Изменить видео-блок '}</p></button>
      </Form>
    )}
  </Formik>

}