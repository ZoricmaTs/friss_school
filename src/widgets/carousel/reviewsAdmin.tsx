import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {Form, Formik} from 'formik';
import {Input} from '../input';
import type {ReviewType} from '../../../common/types.ts';
import * as Yup from 'yup';
import {useState} from 'react';
import {v4 as generateUUID} from 'uuid';

type ReviewCardProps = {
  review: ReviewType
}

const schema = Yup.object({
  name: Yup.string().required('Введите имя автора отзыва'),
  text: Yup.string().required('Введите текст отзыва'),
  date: Yup.string().required('Введите дату отзыва: 11.11.2023'),
});

export function ReviewsAdmin() {
  const dynamicStore = useDynamicStoreStore();

  return <div>
    <NewReviewForm/>
    <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Все отзывы'}</h3>
    <div style={{display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(3, 1fr)'}}>
      {dynamicStore.reviews.map((review, index: number) => <ReviewCardAdmin review={review} key={index}/>)}
    </div>
  </div>
}

function NewReviewForm() {
  const dynamicStore = useDynamicStoreStore();

  return <Formik
    onSubmit={(values, formikHelpers) => {
      dynamicStore.patchData(stateDraft => {
        const newReview: ReviewType = {
          name: values.name,
          text: values.text,
          date: values.date,
          id: generateUUID(),
        }

        stateDraft.reviews.push(newReview)
      })

      formikHelpers.resetForm();
    }}
    initialValues={{
      'name': '',
      'date': '',
      'text': '',
    }}
    validationSchema={schema}
    children={(props) => {
      return <Form>
        <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Добавить новый отзыв'}</h3>
        <Input
          type={'text'}
          name={'name'}
          label={'Имя автора нового отзыва'}
          errors={props.errors}
          touched={props.touched}
        />
        <Input
          type={'text'}
          name={'date'}
          label={'Дата нового отзыва: 11.11.2023'}
          errors={props.errors}
          touched={props.touched}
        />
        <Input
          type={'textarea'}
          name={'text'}
          label={'Текст нового отзыва'}
          errors={props.errors}
          touched={props.touched}
        />
        <button className={'btn btn__full'} type="submit"><p>{'Добавить новый отзыв'}</p></button>
      </Form>
    }}/>;
}

export function ReviewCardAdmin(props: ReviewCardProps) {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <div className={'course-admin'}>

      <div className={'course-admin__info-container'}>
        <div>
          <h3 className={'course-admin__title'}>{props.review.name}</h3>
          <p className={'course-admin__preview'}>{props.review.date}</p>
          <p className={'course-admin__preview'}>{props.review.text}</p>
        </div>
        <div className={'course-admin__btns'}>
          <button
            className={'btn btn__full'}
            onClick={() => setIsEditing(true)}
          >
            <p>{'Редактировать'}</p>
          </button>
          <button
            className={'btn btn__transparent'}
            onClick={event => {
              event.preventDefault();
              dynamicStore.patchData(stateDraft => {
                stateDraft.reviews = stateDraft.reviews.filter(value => value.id !== props.review.id);
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
          const review = stateDraft.reviews.find(value => value.id === props.review.id)!;

          review.name = values.name;
          review.text = values.text;
          review.date = values.date;

          setIsEditing(false);
        })
      }}
      initialValues={{
        'name': props.review.name,
        'text': props.review.text,
        'date': props.review.date,
      }}
      validationSchema={schema}
      children={(props) => {
        return <Form>
          <h3>{'Редактирование отзыва'}</h3>
          <Input
            type={'text'}
            name={'date'}
            label={'дата отзыва: 11.11.2023'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'text'}
            name={'name'}
            label={'Имя автора отзыва'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'textarea'}
            name={'text'}
            label={'Текст отзыва'}
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