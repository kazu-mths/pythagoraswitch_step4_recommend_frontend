'use client';
import React, { Suspense } from 'react';
import Form from './../components/SurveyForm/Form';

export default function Survey() {
  return (
      <main>
        <Suspense>
          <Form />
        </Suspense>
      </main>
  );
}