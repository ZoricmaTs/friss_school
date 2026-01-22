import * as Yup from 'yup';
import type {RunningLineType} from '../../../common/types.ts';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {useState} from 'react';
import {Form, Formik} from 'formik';
import {Input} from '../input';
import './style.scss';

type RunningLineProps = {
  line: RunningLineType
}

const schema = Yup.object({
  text: Yup.string().required('Введите текст бегущей строки'),
});

export function RunningLinesAdmin() {
  const dynamicStore = useDynamicStoreStore();

  return <div className={'lines__wrapper'}>
    {dynamicStore.runningLines.map((line) => <RunningLineCardAdmin line={line} key={line.id}/>)}
  </div>;
}

export function RunningLineCardAdmin(props: RunningLineProps) {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <div className={'lines__item'}>
      <p className={'lines__item_text'}>{props.line.text}</p>
      <button
        className={'btn btn__full btn__small'}
        onClick={() => setIsEditing(true)}
      >
        <small>{'Редактировать'}</small>
      </button>
    </div>;
  }

  return <Formik

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
      return <Form className={'lines__item-form'}>
        <h3>{'Редактирование'}</h3>
        <div className={'lines__item-form_container'}>
          <Input
            type={'text'}
            name={'text'}
            label={'Текст'}
            errors={props.errors}
            touched={props.touched}
          />
          <button
            type={'submit'}
            className={'btn btn__full btn__small lines__item-form_btn'}
          >
            <small>{'Сохранить'}</small>
          </button>
        </div>
      </Form>
    }}
  >
  </Formik>;
}