"use client";
import React, { Suspense } from 'react';
import AttentionPopUp from '../components/Attention/AttentionPopUp';

export default function Attention() {
  return (
      <main>
        <div className="mx-auto max-w-[375px]">
        <Suspense>
          <AttentionPopUp/>
        </Suspense>
        </div>
      </main>
  );
}
