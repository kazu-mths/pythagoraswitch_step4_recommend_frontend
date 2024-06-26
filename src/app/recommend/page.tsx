"use client";
import React, { Suspense } from 'react';
import Vector_search from './../components/Recommend/Vector_search';
import Footer from './../components/Footer/Footer';

export default function Load_Vector_search() {
  return (
      <main>
          <div className="mx-auto max-w-[375px]">
            <Suspense>
            <Vector_search />
            </Suspense>
            <Footer />
        </div>
      </main>
  );
}
