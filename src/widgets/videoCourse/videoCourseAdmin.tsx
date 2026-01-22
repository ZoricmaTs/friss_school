import {Form, Formik} from 'formik';
import {Input} from '../input';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import * as Yup from 'yup';

const schema = Yup.object({
  videoCourseText: Yup.string().required('Введите текст для видео-курса'),
});

export function VideoCourseAdmin() {
  const dynamicStore = useDynamicStoreStore();

  return <Formik
    initialValues={{videoCourseText: dynamicStore.videoCourseText}}
    validationSchema={schema}
    onSubmit={
      function(values): void {
        dynamicStore.patchData((stateDraft) => {
          stateDraft.videoCourseText = values.videoCourseText;
        })

        dynamicStore.saveData().catch(null);
      }
    }
  >
    {({ errors, touched }) => (
      <Form>
        <Input
          label={'Описание'}
          type={'textarea'}
          name={'videoCourseText'}
          errors={errors}
          touched={touched}
        />
        <button className={'btn btn__full'} style={{ margin: '1rem 0'}} type="submit"><p>{'Изменить текст'}</p></button>
      </Form>
    )}
  </Formik>;
}