import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {Form, Formik} from 'formik';
import {Input} from '../input';
import type {AccordionType} from '../../../common/types.ts';
import * as Yup from 'yup';
import {useState} from 'react';
import {v4 as generateUUID} from 'uuid';

type AccordionCardProps = {
  accordion: AccordionType
}

const schema = Yup.object({
  question: Yup.string().required('Введите вопрос'),
  answer: Yup.string().required('Введите ответ'),
});

export function AccordionsAdmin() {
  const dynamicStore = useDynamicStoreStore();

  return <div>
    <NewAccordionForm/>
    <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Все вопросы-ответы'}</h3>
    <div style={{display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(3, 1fr)'}}>
      {dynamicStore.accordions.map((accordion, index: number) => <AccordionCardAdmin accordion={accordion} key={index}/>)}
    </div>
  </div>
}

function NewAccordionForm() {
  const dynamicStore = useDynamicStoreStore();

  return <Formik
    onSubmit={(values, formikHelpers) => {
      dynamicStore.patchData(stateDraft => {
        const newAccordion: AccordionType = {
          answer: values.answer,
          question: values.question,
          id: generateUUID(),
        }

        stateDraft.accordions.push(newAccordion)
      })

      formikHelpers.resetForm();
    }}
    initialValues={{
      'answer': '',
      'question': '',
    }}
    validationSchema={schema}
    children={(props) => {
      return <Form>
        <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Добавить новый вопрос-ответ'}</h3>
        <Input
          type={'text'}
          name={'question'}
          label={'Вопрос нового отзыва'}
          errors={props.errors}
          touched={props.touched}
        />
        <Input
          type={'textarea'}
          name={'answer'}
          label={'Ответ на новый вопрос'}
          errors={props.errors}
          touched={props.touched}
        />
        <button className={'btn btn__full'} type="submit"><p>{'Добавить новый вопрос-ответ'}</p></button>
      </Form>
    }}/>;
}

export function AccordionCardAdmin(props: AccordionCardProps) {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <div className={'course-admin'}>

      <div className={'course-admin__info-container'}>
        <div>
          <h3 className={'course-admin__title'}>{props.accordion.question}</h3>
          <p className={'course-admin__preview'}>{props.accordion.answer}</p>
        </div>
        <div className={'course-admin__btns'}>
          <button
            className={'btn btn__full '}
            onClick={() => setIsEditing(true)}
          >
            <p>{'Редактировать'}</p>
          </button>
          <button
            className={'btn btn__transparent'}
            onClick={event => {
              event.preventDefault();
              dynamicStore.patchData(stateDraft => {
                stateDraft.accordions = stateDraft.accordions.filter(value => value.id !== props.accordion.id);
              });
            }}>
            <p>{'Удалить'}</p>
          </button>
        </div>
      </div>
    </div>;
  }

  return <div>
    <Formik
      onSubmit={(values) => {
        dynamicStore.patchData((stateDraft) => {

          const accordion = stateDraft.accordions.find(value => value.id === props.accordion.id)!;
          accordion.question = values.question;
          accordion.answer = values.answer;
          setIsEditing(false);
        })
      }}
      initialValues={{
        'question': props.accordion.question,
        'answer': props.accordion.answer,
      }}
      validationSchema={schema}
      children={(props) => {
        return <Form>
          <h3>{'Редактирование вопроса-ответа'}</h3>
          <Input
            type={'text'}
            name={'question'}
            label={'Вопрос'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'textarea'}
            name={'answer'}
            label={'Ответ'}
            errors={props.errors}
            touched={props.touched}
          />
          <button
            type={'submit'}
            className={'course-admin__btn course-admin__btn_full'}
          >
            <p>{'Сохранить'}</p>
          </button>
        </Form>
      }}
    >
    </Formik>
  </div>;
}