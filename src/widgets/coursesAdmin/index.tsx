import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import type {CourseType} from '../../../common/types.ts';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {v4 as generateUUID} from 'uuid';
import {useState} from 'react';
import FastDropImage from '../fastDropImage';
import {Input} from '../input';
import './style.scss';

const schema = Yup.object({
  title: Yup.string().required('Введите наименование курса'),
  description: Yup.string().required('Введите подробное описание курса'),
  duration: Yup.string().required('Введите длительность курса: 5 недель, 2 месяца и т.д.'),
  preview: Yup.string().required('Введите короткое описание курса'),
  price: Yup.string().required('Введите стоимость курса: 20 000 сом / месяц и т.д.'),
});

export function CoursesAdmin() {
  const dynamicStore = useDynamicStoreStore();

  return <div>
    <NewCourseForm/>
    <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Существующие курсы'}</h3>
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      {dynamicStore.courses.map((course) => <CourseCard course={course} key={course.id}/>)}
    </div>
  </div>;
}

function NewCourseForm() {
  const dynamicStore = useDynamicStoreStore();
  const [imageId, setImageId] = useState<string | undefined>();

  return <Formik
    onSubmit={(values, formikHelpers) => {
      dynamicStore.patchData(stateDraft => {
        const newCourse: CourseType = {
          title: values.title,
          description: values.description,
          duration: values.duration,
          preview: values.preview,
          price: values.price,
          image: imageId!,
          id: generateUUID(),
        }

        stateDraft.courses.push(newCourse)
      })

      formikHelpers.resetForm();
      setImageId(undefined);
    }}
    initialValues={{
      'title': '',
      'description': '',
      'duration': '',
      'preview': '',
      'price': '',
    }}
    validationSchema={schema}
    children={(props) => {
    return <Form>
      <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Добавить новый курс'}</h3>
      <Input
        type={'text'}
        name={'title'}
        label={'Наименование нового курса'}
        errors={props.errors}
        touched={props.touched}
      />
      <Input
        type={'textarea'}
        name={'description'}
        label={'Описание нового курса'}
        errors={props.errors}
        touched={props.touched}
      />
      <Input
        type={'text'}
        name={'duration'}
        label={'Длительность нового курса: 5 недель, 2 месяца и т.д.'}
        errors={props.errors}
        touched={props.touched}
      />
      <Input
        type={'textarea'}
        name={'preview'}
        label={'Короткое описание нового курса'}
        errors={props.errors}
        touched={props.touched}
      />
      <Input
        type={'text'}
        name={'price'}
        label={'Стоимость нового курса: 20 000 сом / месяц и т.д.'}
        errors={props.errors}
        touched={props.touched}
      />

      <FastDropImage
        onImageChange={imageId => setImageId(imageId)}
        selectedImageId={imageId}
      />
      {props.isValid && !!imageId &&<button className={'input__submit'} type="submit"><p>{'Добавить новый курс'}</p></button>}
    </Form>
  }}/>;
}

type CourseCardProps = {
  course: CourseType
}

function CourseCard(props: CourseCardProps) {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!isEditing) {
    return <div className={'course-admin'}>
      <div className="course-admin__image-wrapper">
        {!imageError && <img
          className="course-admin__image"
          src={`/dynamic/images/${props.course.image}`}
          alt="Изображение курса"
          onError={() => setImageError(true)}
        />}
        {imageError && <span className="course-admin__image-fallback">{'Изображение отсутствует'}</span>}
      </div>
      <div className={'course-admin__info-container'}>
        <div>
          <h3 className={'course-admin__title'}>{props.course.title}</h3>
          <p className={'course-admin__preview'}>{props.course.preview}</p>
          <p className={'course-admin__preview'}>{props.course.description}</p>
        </div>
          <div>
            <small className={'course-admin__duration'}>{props.course.duration}</small>
            <h3 className={'course-admin__price'}>{props.course.price}</h3>
          </div>
          <div className={'course-admin__btns'}>
            <button
              className={'course-admin__btn course-admin__btn_full '}
              onClick={() => setIsEditing(true)}
            >
              <p>{'Редактировать'}</p>
            </button>
            <button
              className={'course-admin__btn course-admin__btn_transparent '}
              onClick={event => {
                event.preventDefault();
                dynamicStore.patchData(stateDraft => {
                  stateDraft.courses = stateDraft.courses.filter(value => value.id !== props.course.id);
                });
              }}>
              <p>{'Удалить'}</p>
            </button>
        </div>
      </div>
    </div>;
  }


  return <div className={'course-admin'}>
    <Formik
      onSubmit={(values) => {
        dynamicStore.patchData((stateDraft) => {

          const course = stateDraft.courses.find(value => value.id === props.course.id)!;
          course.title = values.title;
          course.description = values.description;
          course.duration = values.duration;
          course.preview = values.preview;
          course.price = values.price;
          setIsEditing(false);
        })
      }}
      initialValues={{
        'title': props.course.title,
        'description': props.course.description,
        'duration': props.course.duration,
        'preview': props.course.preview,
        'price': props.course.price,
      }}
      validationSchema={schema}
      children={(props) => {
        return <Form>
          <h3>{'Редактирование курса'}</h3>
          <Input
            type={'text'}
            name={'title'}
            label={'Наименование курса'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'textarea'}
            name={'description'}
            label={'Описание курса'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'text'}
            name={'duration'}
            label={'Длительность курса: 5 недель, 2 месяца и т.д.'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'textarea'}
            name={'preview'}
            label={'Короткое описание курса'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'text'}
            name={'price'}
            label={'Стоимость курса: 20 000 сом / месяц и т.д.'}
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