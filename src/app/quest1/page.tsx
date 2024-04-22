"use client";
import React, { Suspense } from 'react';
import QuestTop from '../components/Quest/Quest';

export default function Quest1() {
  return (
      <main>
        <Suspense>
          <QuestTop/>
        </Suspense>
      </main>
  );
}
