"use client";
import React, { Suspense } from 'react';
import Vector_search from './../components/Recommend/Vector_search';

export default function Load_Vector_search() {
  return (
      <main>
        <Suspense>
          <Vector_search />
          </Suspense>
      </main>
  );
}
