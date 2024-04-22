"use client";
import React, { Suspense } from 'react';
import LoginBonus from '../components/LoginBonus/LoginBonus';

export default function Login_Bonus() {
  return (
      <main>
        <div className='mx-auto max-w-[375px]'>
        <Suspense>
          <LoginBonus/>
        </Suspense>
        </div>
      </main>
  );
}
