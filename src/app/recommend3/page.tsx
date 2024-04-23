"use client";
import React, { Suspense } from 'react';
import Vector_search3 from '../components/Recommend/Vector_search3';
import Footer from '../components/Footer/Footer';

export default function Load_Vector_search() {
  return (
      <main>
          <div className="mx-auto max-w-[375px]">
            <Suspense>
            <Vector_search3 />
            </Suspense>
            <Footer />
        </div>
      </main>
  );
}
