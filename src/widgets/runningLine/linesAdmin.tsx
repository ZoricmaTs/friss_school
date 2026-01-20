import * as Yup from 'yup';
import type {RunningLineType} from '../../../common/types.ts';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {useState} from 'react';
import {Form, Formik} from 'formik';
import {Input} from '../input';

type RunningLineProps = {
  line: RunningLineType
}

const schema = Yup.object({
  text: Yup.string().required('Введите текст бегущей строки'),
});

export function RunningLinesAdmin() {
  const dynamicStore = useDynamicStoreStore();

  return <div>
    <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Бегущая строка'}</h3>
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      {dynamicStore.runningLines.map((line) => <RunningLineCardAdmin line={line} key={line.id}/>)}
    </div>

  </div>
}

export function RunningLineCardAdmin(props: RunningLineProps) {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <div className={'course-admin'}>

      <div className={'course-admin__info-container'}>
        <p className={'course-admin__preview'}>{props.line.text}</p>
        <button
          className={'course-admin__btn course-admin__btn_full '}
          onClick={() => setIsEditing(true)}
        >
          <p>{'Редактировать'}</p>
        </button>
      </div>
    </div>;
  }

  return <div>
    <Formik
      onSubmit={(values) => {
        dynamicStore.patchData((stateDraft) => {
          const line = stateDraft.runningLines.find(value => value.id === props.line.id)!;
          line.text = values.text;
          setIsEditing(false);
        });
      }}
      initialValues={{'text': props.line.text}}
      validationSchema={schema}
      children={(props) => {
        return <Form style={{width: '100%'}}>
          <h3>{'Редактирование'}</h3>
            <Input
              type={'text'}
              name={'line'}
              label={'Текст'}
              errors={props.errors}
              touched={props.touched}
            />
            <button
              type={'submit'}
              className={'btn btn__full'}
            >
              <p>{'Сохранить'}</p>
            </button>
        </Form>
      }}
    >
    </Formik>
  </div>;
}