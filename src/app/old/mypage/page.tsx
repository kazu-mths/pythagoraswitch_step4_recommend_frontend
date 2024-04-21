"use client";
import React, { Suspense } from 'react';
import Homepage from './../components/Home/Homepage';

export default function Load_Homepage() {
  return (
      <main>
        <Suspense>
          <Homepage />
          </Suspense>
      </main>
  );
}
