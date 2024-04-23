"use client";
import React, { Suspense } from 'react';
import Vector_search2 from '../components/Recommend/Vector_search2';
import Footer from '../components/Footer/Footer';

export default function Load_Vector_search() {
  return (
      <main>
          <div className="mx-auto max-w-[375px]">
            <Suspense>
            <Vector_search2 />
            </Suspense>
            <Footer />
        </div>
      </main>
  );
}
