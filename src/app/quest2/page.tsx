"use client";
import React, { Suspense } from 'react';
import QuestCollection from '../components/QuestCollection/QuestCollection';

export default function Quest2() {
  return (
      <main>
        <Suspense>
          <QuestCollection/>
        </Suspense>
      </main>
  );
}
