import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {Form, Formik} from 'formik';
import {Input} from '../input';
import * as Yup from 'yup';
import {useState} from 'react';
import './style.scss';

const schema = Yup.object({
  phone: Yup.string().required('Введите номер телефона'),
  schedule: Yup.string().required('Введите график работы'),
  treads: Yup.string().required('Введите aдрес в Treads'),
  instagram: Yup.string().required('Введите aдрес в Instagram'),
  facebook: Yup.string().required('Введите aдрес в Facebook'),
  whatsapp: Yup.string().required('Введите aдрес в WhatsApp'),
});


export function ContactsAdmin() {
  const dynamicStore = useDynamicStoreStore();

  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return <div className={'contacts-admin'}>
      <div>
        <p className={'contacts-admin__text'}>{'Телефон: '}{dynamicStore.contacts.phone}</p>
        <p className={'review-admin__text'}>{'Отзыв: '}{dynamicStore.contacts.schedule}</p>
        <h4 style={{margin: '1.5rem 0 1rem'}}>{'Социальные сети'}</h4>
        <p className={'contacts-admin__text'}>{'Treads: '}{dynamicStore.contacts.socials.treads}</p>
        <p className={'contacts-admin__text'}>{'Instagram: '}{dynamicStore.contacts.socials.instagram}</p>
        <p className={'contacts-admin__text'}>{'Facebook: '}{dynamicStore.contacts.socials.facebook}</p>
        <p className={'contacts-admin__text'}>{'WhatsApp: '}{dynamicStore.contacts.socials.whatsapp}</p>
      </div>
      <div className={'review-admin__btns'}>
        <button
          className={'btn btn__full btn__small'}
          onClick={() => setIsEditing(true)}
        >
          <small>{'Редактировать'}</small>
        </button>
      </div>
    </div>;
  }

  return <div>
    <Formik
      onSubmit={(values) => {
        dynamicStore.patchData((stateDraft) => {
          stateDraft.contacts.phone = values.phone;
          stateDraft.contacts.schedule = values.schedule;
          stateDraft.contacts.socials.treads = values.treads;
          stateDraft.contacts.socials.instagram = values.instagram;
          stateDraft.contacts.socials.facebook = values.facebook;
          stateDraft.contacts.socials.whatsapp = values.whatsapp;
          setIsEditing(false);
        })
      }}
      initialValues={{
        'phone': dynamicStore.contacts.phone,
        'schedule': dynamicStore.contacts.schedule,
        'treads': dynamicStore.contacts.socials.treads,
        'instagram': dynamicStore.contacts.socials.instagram,
        'facebook': dynamicStore.contacts.socials.facebook,
        'whatsapp': dynamicStore.contacts.socials.whatsapp,
      }}
      validationSchema={schema}
    >
      {(formik ) => (
      <Form>
        <h3>{'Редактирование контактных данных'}</h3>
        <Input
          type={'text'}
          name={'phone'}
          label={'Телефон'}
          errors={formik.errors}
          touched={formik.touched}
          value={dynamicStore.contacts.phone}
        />
        <Input
          type={'text'}
          name={'schedule'}
          label={'График работы'}
          errors={formik.errors}
          touched={formik.touched}
          value={dynamicStore.contacts.schedule}
        />
        <Input
          type={'text'}
          name={'treads'}
          label={'Treads'}
          errors={formik.errors}
          touched={formik.touched}
          value={dynamicStore.contacts.socials.treads}
        />
        <Input
          type={'text'}
          name={'instagram'}
          label={'Instagram'}
          errors={formik.errors}
          touched={formik.touched}
          value={dynamicStore.contacts.socials.instagram}
        />
        <Input
          type={'text'}
          name={'whatsapp'}
          label={'WhatsApp'}
          errors={formik.errors}
          touched={formik.touched}
          value={dynamicStore.contacts.socials.whatsapp}
        />
        <Input
          type={'text'}
          name={'facebook'}
          label={'Facebook'}
          errors={formik.errors}
          touched={formik.touched}
          value={dynamicStore.contacts.socials.facebook}
        />
        <div className={'contacts-admin__btns'}>
          <button
            type={'submit'}
            className={'btn btn__full btn__small'}
          >
            <small>{'Сохранить изменения'}</small>
          </button>
          <button
            type="button"
            className={'btn btn__transparent btn__small'}
            onClick={() => {
              formik.resetForm();
              setIsEditing(false);
            }}
          >
            <small>{'Отмена'}</small>
          </button>
        </div>
      </Form>
      )}
    </Formik>
  </div>;
}