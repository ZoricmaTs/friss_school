import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {Form, Formik} from 'formik';
import {Input} from '../input';
import type {AccordionType} from '../../../common/types.ts';
import * as Yup from 'yup';
import {useState} from 'react';
import {v4 as generateUUID} from 'uuid';
import './style.scss';

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
    <h3 style={{margin: '2rem 0'}}>{'Все вопросы-ответы'}</h3>
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
      });

      dynamicStore.saveData().catch(null);

      formikHelpers.resetForm();
    }}
    initialValues={{
      'answer': '',
      'question': '',
    }}
    validationSchema={schema}
    children={(props) => {
      return <Form className={'accordion-admin__form'}>
        <h3 style={{marginBottom: '1rem'}}>{'Добавить новый вопрос-ответ'}</h3>
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
        <button className={'btn btn__full btn__small'} type="submit"><small>{'Добавить новый вопрос-ответ'}</small></button>
      </Form>
    }}/>;
}

export function AccordionCardAdmin(props: AccordionCardProps) {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <div className={'accordion-admin'}>
      <div>
        <p className={'accordion-admin__title'}>{'Вопрос: '}{props.accordion.question}</p>
        <p className={'accordion-admin__text'}>{'Ответ: '}{props.accordion.answer}</p>
      </div>
      <div className={'accordion-admin__btns'}>
        <button
          className={'btn btn__full btn__small'}
          onClick={() => setIsEditing(true)}
        >
          <small>{'Редактировать'}</small>
        </button>
        <button
          className={'btn btn__transparent btn__small'}
          onClick={event => {
            event.preventDefault();
            dynamicStore.patchData(stateDraft => {
              stateDraft.accordions = stateDraft.accordions.filter(value => value.id !== props.accordion.id);
            });

            dynamicStore.saveData().catch(null);
          }}>
          <small>{'Удалить'}</small>
        </button>
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

        dynamicStore.saveData().catch(null);
      }}
      initialValues={{
        'question': props.accordion.question,
        'answer': props.accordion.answer,
      }}
      validationSchema={schema}
    >
      {(props) => {
        return <Form className={'accordion-admin'}>
          <h4 style={{marginBottom: '1rem'}}>{'Редактирование вопроса-ответа'}</h4>
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
          <div className={'accordion-admin__btns'}>
            <button
              type={'submit'}
              className={'btn btn__full btn__small'}
            >
              <small>{'Сохранить'}</small>
            </button>
            <button
              className={'btn btn__transparent btn__small'}
              onClick={event => {
                event.preventDefault();
                props.resetForm();
                setIsEditing(false);
              }}>
              <small>{'Отмена'}</small>
            </button>
          </div>
        </Form>
    }}
    </Formik>
  </div>;
}