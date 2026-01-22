import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {Form, Formik} from 'formik';
import {Input} from '../input';
import * as Yup from 'yup';

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
      {({ errors, touched }) => (
      <Form >
        <h3>{'Редактирование контактных данных'}</h3>
        <Input
          type={'text'}
          name={'phone'}
          label={'Телефон'}
          errors={errors}
          touched={touched}
          value={dynamicStore.contacts.phone}
        />
        <Input
          type={'text'}
          name={'schedule'}
          label={'График работы'}
          errors={errors}
          touched={touched}
          value={dynamicStore.contacts.schedule}
        />
        <Input
          type={'text'}
          name={'treads'}
          label={'Treads'}
          errors={errors}
          touched={touched}
          value={dynamicStore.contacts.socials.treads}
        />
        <Input
          type={'text'}
          name={'instagram'}
          label={'Instagram'}
          errors={errors}
          touched={touched}
          value={dynamicStore.contacts.socials.instagram}
        />
        <Input
          type={'text'}
          name={'whatsapp'}
          label={'WhatsApp'}
          errors={errors}
          touched={touched}
          value={dynamicStore.contacts.socials.whatsapp}
        />
        <Input
          type={'text'}
          name={'facebook'}
          label={'Facebook'}
          errors={errors}
          touched={touched}
          value={dynamicStore.contacts.socials.facebook}
        />
        <button
          type={'submit'}
          className={'course-admin__btn course-admin__btn_full'}
        >
          <p>{'Изменить'}</p>
        </button>
      </Form>
      )}
    </Formik>
  </div>;
}