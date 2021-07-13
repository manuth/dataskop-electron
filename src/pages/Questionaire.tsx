import { Field, Form, Formik } from 'formik';
import React from 'react';
import Button from '../components/Button';

export default function Questionaire(): JSX.Element {
  const categories = [
    'Film & Animation',
    'Autos & Fahrzeuge',
    'Musik, Tiere, Sport',
    'Reisen & Events',
    'Gaming',
    'Menschen & Blogs',
    'Comedy',
    'Unterhaltung',
    'Nachrichten & Politik',
    'Praktische Tipps & Styling',
    'Bildung',
    'Wissenschaft & Technik',
    'Soziales',
    'Engagement',
  ];

  const usage = {
    vpn: 'Ich nutze YouTube über ein VPN.',
    shared: 'Ich teile meinen YouTube Account mit mind. einer weiteren Person.',
    multiple: 'Ich nutze YouTube über verschiedene Accounts.',
    anon: 'Ich nutze YouTube überwiegend ohne eingeloggt zu sein.',
    local: 'Ich nutze YouTube überwiegend im oben angegebenen PLZ',
  };

  const onSubmit = (values) => {
    console.log('onSubmit', values);
  };

  return (
    <>
      <div className="mx-auto max-w-4xl flex flex-col justify-center w-full">
        <div className="hl-4xl mb-6">Fragebogen</div>
        <div className="max-w-2xl mb-6">
          <p>
            Um Deine Datenspende nützlich auswerten zu können, bitten wir Dich,
            folgende Fragen zu beantworten. Du kannst auch nur einige oder keine
            Fragen beantworten.
          </p>
        </div>
        <div className="">
          <Formik initialValues={{}} onSubmit={onSubmit}>
            <Form>
              <div className="divide-y divide-yellow-600 divide-dashed">
                <div className="p-3">
                  <label className="font-medium">
                    <Field
                      type="checkbox"
                      name="contact"
                      className="mr-2 semibold"
                    />
                    <span>
                      Dürfen Dich die beteiligten Forscher*innen oder
                      Journalist*innen mit Nachfragen kontaktieren
                    </span>
                  </label>
                </div>
                <div className="p-3">
                  <label
                    htmlFor="sex"
                    className="w-28 inline-block font-medium"
                  >
                    Geschlecht
                  </label>
                  <div
                    role="group"
                    aria-labelledby="sex"
                    className="ml-3 inline"
                  >
                    <label className="mr-3">
                      <Field
                        type="radio"
                        name="sex"
                        value="Frau"
                        className="mr-2"
                      />
                      Frau
                    </label>
                    <label className="mr-3">
                      <Field
                        type="radio"
                        name="sex"
                        value="Mann"
                        className="mr-2"
                      />
                      Mann
                    </label>
                    <label className="">
                      <Field
                        type="radio"
                        name="sex"
                        value="Divers"
                        className="mr-2"
                      />
                      Divers
                    </label>
                  </div>
                </div>
                <div className="p-3">
                  <label
                    htmlFor="age"
                    className="w-28 inline-block font-medium"
                  >
                    Alter
                  </label>
                  <Field
                    type="text"
                    name="age"
                    // pattern="[1-9][1-9]"
                    maxLength="2"
                    min="1"
                    max="99"
                    step="1"
                    className="ml-2 p-1 w-20 text-center border rounded "
                  />
                </div>
                <div className="p-3">
                  <label
                    htmlFor="zip"
                    className="w-28 inline-block font-medium"
                  >
                    Wohnort
                  </label>
                  <Field
                    type="text"
                    min="0"
                    max="99"
                    step="1"
                    name="zip"
                    maxLength="2"
                    placeholder="PLZ"
                    className="ml-2 p-1 w-20 text-center border rounded  appearance-none hover:appearance-none focus:appearance-none"
                  />
                  <span className="text-xs ml-2">(ersten zwei Stellen)</span>
                </div>
                <div className="p-3">
                  <label htmlFor="categories" className="font-medium">
                    Nach Gefühl: Welche drei Kategorien schaust Du am meisten
                    auf YouTube?
                  </label>
                  <div
                    role="group"
                    aria-labelledby="categories"
                    className="grid grid-cols-2 mt-2"
                  >
                    {categories.map((c) => (
                      <label key={c}>
                        <Field
                          type="checkbox"
                          name="categories"
                          value={c}
                          className="mr-2"
                        />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-3">
                  <label htmlFor="using" className="font-medium">
                    Bitte zutreffendes ankreuzen
                  </label>
                  <div role="group" aria-labelledby="using" className="mt-2">
                    {Object.entries(usage).map(([value, label]) => (
                      <label key={value} className="block">
                        <Field
                          type="checkbox"
                          name="using"
                          value={value}
                          className="mr-2"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Button size="small" theme="blue" type="submit">
                  Abschicken
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
