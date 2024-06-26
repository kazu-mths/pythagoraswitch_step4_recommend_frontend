'use client';
import React, { Suspense } from 'react';
import Form from './../components/SurveyForm/Form';

export default function Survey() {
  return (
      <main>
        <div className="mx-auto max-w-[375px]">
        <Suspense>
          <Form />
        </Suspense>
        </div>
      </main>
  );
}