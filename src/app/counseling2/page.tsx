"use client";
import React, { Suspense } from 'react';
import CounselingFinish from '../components/CounselingFinish/CounselingFinish';

export default function Counseling2() {
  return (
      <main>
        <div className="mx-auto sm:max-w-[375px]">
        <Suspense>
          <CounselingFinish/>
        </Suspense>
        </div>
      </main>
  );
}
