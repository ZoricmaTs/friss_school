import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import type {PatternType} from '../../../common/types.ts';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {v4 as generateUUID} from 'uuid';
import {useState} from 'react';
import FastDropImage from '../fastDropImage';
import {Input} from '../input';
import './style.scss';
import {getLevel} from './index.tsx';

const schema = Yup.object({
  title: Yup.string().required('Введите наименование лекала'),
  price: Yup.number().required('Введите стоимость лекала').min(0,'Значение должно быть не менее 0'),
  salePrice: Yup.number().required('Введите акционную стоимость лекала').min(0,'Значение должно быть не менее 0').default(0),
  level: Yup.number().required('Введите уровень сложности лекала').max(5, 'Значение должно быть не более 5').min(1,'Значение должно быть не менее 1')
});

const schemaText = Yup.object({
  text: Yup.string().required('Введите текст блока'),
});

export function PatternsAdmin() {
  const dynamicStore = useDynamicStoreStore();

  return <div>
    <PatternTextInput/>
    <NewPatternForm/>
    <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Все лекала'}</h3>
    <div style={{display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(3, 1fr)', width: '100%'}}>
      {dynamicStore.patterns.map((pattern, index: number) => <PatternCard pattern={pattern} key={index}/>)}
    </div>
  </div>;
}

function PatternTextInput() {
  const dynamicStore = useDynamicStoreStore();

  return  <Formik
      onSubmit={(values) => {
        dynamicStore.patchData(stateDraft => {
          stateDraft.patternsText = values.text;
        })
        dynamicStore.saveData().catch(null);
      }}
      initialValues={{text: dynamicStore.patternsText}}
      validationSchema={schemaText}
      >
    {({ errors, touched }) => (
      <Form>
      <Input
        type={'textarea'}
        name={'text'}
        label={'Общий текст блока с лекалами'}
        errors={errors}
        touched={touched}
      />
      <button className={'btn btn__full'} type="submit"><p>{'Изменить текст'}</p></button>
      </Form>
    )}
  </Formik>;
}

function NewPatternForm() {
  const dynamicStore = useDynamicStoreStore();
  const [imageId, setImageId] = useState<string | undefined>();

  return <Formik
    onSubmit={(values, formikHelpers) => {
      dynamicStore.patchData(stateDraft => {
        const newPattern: PatternType = {
          title: values.title,
          level: values.level,
          salePrice: values.salePrice,
          price: values.price,
          image: imageId!,
          id: generateUUID(),
        }

        stateDraft.patterns.push(newPattern)
      })

      formikHelpers.resetForm();
      setImageId(undefined);
    }}
    initialValues={{
      'title': '',
      'level': 1,
      'salePrice': 0,
      'price': 0,
    }}
    validationSchema={schema}
    children={(props) => {
      return <Form>
        <h3 style={{marginTop: '4rem', marginBottom: '2rem'}}>{'Добавить'}</h3>
        <Input
          type={'text'}
          name={'title'}
          label={'Наименование лекала'}
          errors={props.errors}
          touched={props.touched}
        />
        <Input
          type={'number'}
          name={'level'}
          label={'Уровень сложности лекала: от 1 до 5'}
          errors={props.errors}
          touched={props.touched}
        />
        <Input
          type={'number'}
          name={'price'}
          label={'Стоимость лекала'}
          errors={props.errors}
          touched={props.touched}
        />
        <Input
          type={'number'}
          name={'salePrice'}
          label={'Акционная стоимость лекала'}
          errors={props.errors}
          touched={props.touched}
        />
        <FastDropImage
          onImageChange={imageId => setImageId(imageId)}
          selectedImageId={imageId}
        />
        {props.isValid && !!imageId &&<button className={'btn btn__full'} type="submit"><p>{'Добавить'}</p></button>}
      </Form>
    }}/>;
}

type PatternCardProps = {
  pattern: PatternType
}

function PatternCard(props: PatternCardProps) {
  const dynamicStore = useDynamicStoreStore();
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!isEditing) {
    return <div className={'pattern-admin'}>
      <div className="pattern-admin__image-wrapper">
        {!imageError && <img
          className="pattern-admin__image"
          src={`/dynamic/images/${props.pattern.image}`}
          alt="Изображение курса"
          onError={() => setImageError(true)}
        />}
        {imageError && <span className="pattern-admin__image-fallback">{'Изображение отсутствует'}</span>}
      </div>
      <div className={'pattern-admin__info-container'}>
        <div>
          <h4 className={'pattern-admin__text'}>{'Наименование: '}{props.pattern.title}</h4>
          <p className={'pattern-admin__text'}>{'Уровень сложности: '}</p>{getLevel(props.pattern.level)}
          <p className={'pattern-admin__text'}>{'Цена: '}{props.pattern.price}{' сом'}</p>
          <p className={'pattern-admin__text'}>{'Цена с учетом скидки: '}{(!props.pattern.salePrice || props.pattern.salePrice === 0) ? 'без скидки': props.pattern.salePrice}{' сом'}</p>
        </div>
        <div className={'pattern-admin__btns'}>
          <button
            className={'btn btn__full'}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <p>{'Редактировать'}</p>
          </button>
          <button
            className={'btn btn__transparent'}
            onClick={event => {
              event.preventDefault();
              dynamicStore.patchData(stateDraft => {
                stateDraft.patterns = stateDraft.patterns.filter(value => value.id !== props.pattern.id);
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

          const pattern = stateDraft.patterns.find(value => value.id === props.pattern.id)!;
          pattern.title = values.title;
          pattern.level = values.level;
          pattern.price = values.price;
          pattern.salePrice = values.salePrice;
          setIsEditing(false);
        })

        dynamicStore.saveData().catch((error) => {
          console.error('Ошибка сохранения:', error);
        });
      }}
      initialValues={{
        'title': props.pattern.title,
        'level': props.pattern.level,
        'price': props.pattern.price,
        'salePrice': props.pattern.salePrice,
      }}
      validationSchema={schema}
      children={(props) => {
        return <Form style={{width: '100%'}}>
          <h3>{'Редактирование данных лекала'}</h3>
          <Input
            type={'text'}
            name={'title'}
            label={'Наименование лекала'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'number'}
            name={'level'}
            label={'Уровень сложности лекала: от 1 до 5'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'number'}
            name={'price'}
            label={'Стоимость лекала'}
            errors={props.errors}
            touched={props.touched}
          />
          <Input
            type={'number'}
            name={'salePrice'}
            label={'Акционная стоимость лекала'}
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