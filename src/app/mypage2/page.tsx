"use client";
import React, { Suspense } from 'react';
import Homepage2 from '../components/Home/Homepage2';

export default function Load_Homepage2() {
  return (
      <main>
        <Suspense>
          <Homepage2 />
        </Suspense>
      </main>
  );
}
